import BaseController from "../../../controllers/base/base.controller";
import Identity from "../schema/schema.identity";
import {
  jwtSessionToken,
  Cryptography,
  jwt,
} from "../../../certs/jwtSessionToken/jwtSessionToken";
import utils from "../../../controllers/utils";
import { Console } from "node:console";

class ControllerIdentity extends BaseController {
  Entity = Identity;

  login = async (req, res) => {
    var validated = false;
    var unlockedSessionJwt: any = JSON.parse(
      await Cryptography.degraveData(
        jwtSessionToken.jwtSessionTokenLock.lock,
        jwtSessionToken.jwtSessionTokenLock.dataLock,
        req.body.encryptedData,
        jwtSessionToken.jwtSessionTokenLock.password[0]
      )
    );
    req.body.rsaEncryptedAes = Cryptography.str2ab(req.body.rsaEncryptedAes);
    req.body.aesEncrypted = Cryptography.str2ab(req.body.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(
      unlockedSessionJwt.resumeRsaPrivkData
    );
    var decryptedAes = await Cryptography.rsaDecrypt(
      req.body.rsaEncryptedAes,
      jwtRsaKey
    );
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(
      await Cryptography.aesDecrypt(
        req.body.aesEncrypted,
        aesKey,
        unlockedSessionJwt.resumeRsaPubkData
      )
    );
    if (decryptedData.pin === unlockedSessionJwt.identity.pin) {
      if (
        !unlockedSessionJwt.identity.failedPin ||
        (unlockedSessionJwt.identity.failedPin &&
          decryptedData.password === unlockedSessionJwt.identity.password)
      ) {
        validated = true;
      }
    }
    unlockedSessionJwt.identity.failedPin = !validated;
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    var lockedSessionJwtToken = await Cryptography.engraveData(
      jwtSessionToken.jwtSessionTokenLock.lock,
      jwtSessionToken.jwtSessionTokenLock.dataLock,
      jwtSessionToken.jwtSessionTokenLock.password[0],
      JSON.stringify({
        resumeRsaPrivkData: nextRsa.privkData,
        resumeRsaPubkData: nextRsa.pubkData,
        identity: unlockedSessionJwt.identity,
        data: unlockedSessionJwt.data,
      })
    );
    var resp: any = {
      encryptedData: lockedSessionJwtToken,
      resumeToken: {
        failedPin: !validated,
        nextRsa: nextRsa.pubkData,
      },
    };
    if (validated) {
      var sessionJwt = await utils.encryptResponseData(
        {
          sessionJwt: {
            identity: unlockedSessionJwt.identity,
          },
          decryptedData: {
            nextRsa: decryptedData.nextRsa,
          },
        },
        {
          unlockedData: unlockedSessionJwt.data,
          normalResponse: resp,
        }
      );
      res.send({
        valid: true,
        rsaEncryptedAes: sessionJwt.rsaEncryptedAes,
        aesEncrypted: sessionJwt.aesEncrypted,
      });
    } else {
      var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
        decryptedData.nextRsa
      );
      var aesEncrypted = await Cryptography.aesEncrypt(
        JSON.stringify({
          ...resp,
        }),
        rsaEncryptedAes.aesKey,
        decryptedData.nextRsa
      );
      res.send({
        valid: false,
        id: unlockedSessionJwt.identity,
        rsaEncryptedAes: Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
        aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
      });
    }
  };

  encrypt = async (req, res) => {
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    var sessionJwt = JSON.parse(
      req.decryptedData.data.token
        .split(",")
        .map((current) => {
          return String.fromCharCode(current);
        })
        .join("")
    );
    delete req.decryptedData.data.token;
    sessionJwt = await utils.parseJwtSessionToken(
      sessionJwt,
      jwtSessionToken,
      jwt
    );
    var lockedSessionJwtToken = await Cryptography.engraveData(
      jwtSessionToken.jwtSessionTokenLock.lock,
      jwtSessionToken.jwtSessionTokenLock.dataLock,
      jwtSessionToken.jwtSessionTokenLock.password[0],
      JSON.stringify({
        resumeRsaPrivkData: nextRsa.privkData,
        resumeRsaPubkData: nextRsa.pubkData,
        identity: sessionJwt.identity,
        data: req.decryptedData.data,
      })
    );
    const resp = {
      encryptedData: lockedSessionJwtToken,
      resumeToken: {
        nextRsa: nextRsa.pubkData,
      },
    };
    req.send(resp, res);
  };

  getRouter() {
    super.registerRoute("/login").post(this.getSafeMethod(this.login));
    super
      .registerProtectedRoute("/encrypt")
      .post(this.getSafeMethod(this.encrypt));
    return super._getRouter();
  }
}

export default {
  ControllerIdentity,
};
