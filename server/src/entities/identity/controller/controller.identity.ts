import BaseController from "../../../controllers/base/base.controller";
import Identity from "../schema/schema.identity";
import {
  jwtSessionToken,
  Cryptography,
  jwt,
} from "../../../certs/jwtSessionToken/jwtSessionToken";
import utils from "../../../controllers/utils";

class ControllerIdentity extends BaseController {
  Entity = Identity;

  login = async (req, res) => {
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
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    var lockedSessionJwtToken = await Cryptography.engraveData(
      jwtSessionToken.jwtSessionTokenLock.lock,
      jwtSessionToken.jwtSessionTokenLock.dataLock,
      jwtSessionToken.jwtSessionTokenLock.password[0],
      JSON.stringify({
        resumeRsaPrivkData: nextRsa.privkData,
        resumeRsaPubkData: nextRsa.pubkData,
        data: unlockedSessionJwt.data,
      })
    );
    const resp = {
      encryptedData: lockedSessionJwtToken,
      resumeToken: {
        failedPin: true,
        nextRsa: nextRsa.pubkData,
      },
    };
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

    //make sure to enlock data on client first
    //make verifications based off of pin or pass
    //if pin failed set this data on the identity
    res.send({
      rsaEncryptedAes: Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
      aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
    });
  };

  encrypt = async (req, res) => {
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    console.log(req.decryptedData.data);
    var lockedSessionJwtToken = await Cryptography.engraveData(
      jwtSessionToken.jwtSessionTokenLock.lock,
      jwtSessionToken.jwtSessionTokenLock.dataLock,
      jwtSessionToken.jwtSessionTokenLock.password[0],
      JSON.stringify({
        resumeRsaPrivkData: nextRsa.privkData,
        resumeRsaPubkData: nextRsa.pubkData,
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
