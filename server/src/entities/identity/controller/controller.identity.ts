import BaseController from "../../../controllers/base/base.controller";
import Identity from "../service/service.identity";
import {
  jwtSessionToken,
  Cryptography,
  jwt,
} from "../../../modules/module.jwtSessionToken";
import utils from "../../../modules/module.utils";

class ControllerIdentity extends BaseController {
  Service = Identity;

  login = async (req, res) => {
    var validated = false;
    var sessionToken: any = await utils.parseJwtSessionToken(
      req.body.sessionToken.sessionJwt,
      jwtSessionToken,
      jwt
    );
    var identity = await this.Service.findOne({
      _id: sessionToken.identity._id,
      secret: sessionToken.identity.secret,
    });
    if (
      [identity.lastSessionTokenHash].indexOf(
        await Cryptography.getShaHash(
          identity.secret + JSON.stringify(req.body.sessionToken.sessionJwt)
        )
      ) === -1
    ) {
      return res.status(403).send({
        message: "services.deadEnd",
      });
    }
    req.body.rsaEncryptedAes = Cryptography.str2ab(req.body.rsaEncryptedAes);
    req.body.aesEncrypted = Cryptography.str2ab(req.body.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(sessionToken.rsaKeyPriv);
    var decryptedAes = await Cryptography.rsaDecrypt(
      req.body.rsaEncryptedAes,
      jwtRsaKey
    );
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(
      await Cryptography.aesDecrypt(
        req.body.aesEncrypted,
        aesKey,
        sessionToken.rsaKeyPub
      )
    );
    if (
      (decryptedData.pin === sessionToken.identity.pin &&
        !sessionToken.failedPin) ||
      (sessionToken.failedPin &&
        decryptedData.pin === sessionToken.identity.pin &&
        decryptedData.password === sessionToken.identity.password)
    ) {
      validated = true;
    }
    if (!validated) {
      var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
        decryptedData.nextRsa
      );
      var aesEncrypted = await Cryptography.aesEncrypt(
        JSON.stringify({
          failedPin: true,
          message: "services.guards.auth-identity.wrong",
          nextRsa: req.body.sessionToken.nextRsa,
          sessionJwt: req.body.sessionToken.sessionJwt,
        }),
        rsaEncryptedAes.aesKey,
        decryptedData.nextRsa
      );
      return res.send({
        rsaEncryptedAes: Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
        aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
      });
    } else {
      var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
        decryptedData.nextRsa
      );
      const sessionTokenRsa = await Cryptography.generateRsaKeys("jwk");
      const sessionTokenObject = {
        identity: sessionToken.identity,
        statePassword: sessionToken.statePassword,
        rsaKeyPriv: sessionTokenRsa.privkData,
        rsaKeyPub: sessionTokenRsa.pubkData,
      };
      sessionToken = await utils.signJwtSessionToken(
        sessionTokenObject,
        jwtSessionToken,
        jwt,
        false
      );
      const socketTokenRsa = await Cryptography.generateRsaKeys("jwk");
      const socketToken = await utils.signJwtSessionToken(
        {
          lastSessionTokenHash: await Cryptography.getShaHash(
            identity.secret + JSON.stringify(sessionToken)
          ),
          identity: sessionTokenObject.identity,
          rsaKeyPriv: socketTokenRsa.privkData,
          rsaKeyPub: socketTokenRsa.pubkData,
        },
        jwtSessionToken,
        jwt,
        false
      );
      const sessionJwtRsa = await Cryptography.generateRsaKeys("jwk");
      const sessionJwt = await utils.signJwtSessionToken(
        {
          identity: sessionTokenObject.identity,
          statePassword: sessionTokenObject.statePassword,
          rsaKeyPriv: sessionJwtRsa.privkData,
          rsaKeyPub: sessionJwtRsa.pubkData,
        },
        jwtSessionToken,
        jwt
      );
      var token = await jwt.sign(
        {
          sessionJwt: sessionJwt,
          nextRsa: sessionJwtRsa.pubkData,
          statePassword: sessionTokenObject.statePassword,
          sessionToken: JSON.stringify({
            nextRsa: sessionTokenRsa.pubkData,
            sessionJwt: sessionToken,
          }),
          socketToken: JSON.stringify({
            nextRsa: socketTokenRsa.pubkData,
            sessionJwt: socketToken,
          }),
        },
        jwtSessionToken.jwtSessionTokenElipticKey,
        { expiresIn: 60 * 30, algorithm: "ES512" }
      );
      identity.lastSocketTokenHash = await Cryptography.getShaHash(
        identity.secret + JSON.stringify(socketToken)
      );
      identity.lastJwtTokenHash = await Cryptography.getShaHash(
        identity.secret + JSON.stringify(sessionJwt)
      );
      identity.save();
      var aesEncrypted = await Cryptography.aesEncrypt(
        JSON.stringify({
          token: token,
        }),
        rsaEncryptedAes.aesKey,
        decryptedData.nextRsa
      );
      return res.send({
        rsaEncryptedAes: Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
        aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
      });
    }
  };

  account = async (req, res) => {
    if (
      req.decryptedData.data.oldPin === req.sessionJwt.identity.pin &&
      req.decryptedData.data.oldPassword === req.sessionJwt.identity.password
    ) {
      req.sessionJwt.identity.pin = req.decryptedData.data.pin;
      req.sessionJwt.identity.password = req.decryptedData.data.password;
    } else {
      return res.status(403).send({
        message: "pages.account.badDetails",
      });
    }
    const sessionJwtRsa = await Cryptography.generateRsaKeys("jwk");
    const sessionToken = await utils.signJwtSessionToken(
      {
        identity: req.sessionJwt.identity,
        statePassword: req.sessionJwt.statePassword,
        rsaKeyPriv: sessionJwtRsa.privkData,
        rsaKeyPub: sessionJwtRsa.pubkData,
      },
      jwtSessionToken,
      jwt,
      false
    );
    const socketTokenRsa = await Cryptography.generateRsaKeys("jwk");
    const socketToken = await utils.signJwtSessionToken(
      {
        lastSessionTokenHash: await Cryptography.getShaHash(
          req.sessionJwt.identity.secret + JSON.stringify(sessionToken)
        ),
        identity: req.sessionJwt.identity,
        rsaKeyPriv: socketTokenRsa.privkData,
        rsaKeyPub: socketTokenRsa.pubkData,
      },
      jwtSessionToken,
      jwt,
      false
    );
    var identity = await this.Service.findOne({
      _id: req.sessionJwt.identity._id,
      secret: req.sessionJwt.identity.secret,
    });
    identity.lastSocketTokenHash = await Cryptography.getShaHash(
      identity.secret + JSON.stringify(socketToken)
    );
    identity.save();
    req.send(
      {
        socketToken: JSON.stringify({
          nextRsa: socketTokenRsa.pubkData,
          sessionJwt: socketToken,
        }),
        sessionToken: JSON.stringify({
          nextRsa: sessionJwtRsa.pubkData,
          sessionJwt: sessionToken,
        }),
      },
      res
    );
  };

  getRouter() {
    super.registerRoute("/login").post(this.getSafeMethod(this.login));
    super
      .registerProtectedRoute("/account")
      .post(this.getSafeMethod(this.account));
    return super._getRouter();
  }
}

export default {
  ControllerIdentity,
};
