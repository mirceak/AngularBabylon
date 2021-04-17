import BaseController from "../../../controllers/base/base.controller";
import UserService from "../service/service.user";
import ReferralService from "../../referral/service/service.referral";
import IdentityService from "../../identity/service/service.identity";
import utils from "../../../controllers/utils";
import {
  jwtSessionToken,
  Cryptography,
  jwt,
} from "../../../certs/jwtSessionToken/jwtSessionToken";

class ControllerUser extends BaseController {
  Entity = UserService.Entity;

  preLogin = async (req, res) => {
    await UserService.findOne({ email: req.body.email }).then(async (user) => {
      if (user == null) {
        return res.status(403).send({
          message: "pages.login.badLogin",
        });
      }

      req.body.user = user;
      res.send(
        await this.generateLoginSessionData(jwtSessionToken, req.body, jwt)
      );
    });
  };
  login = async (req, res) => {
    var validatedSessionData = await this.validateLoginSessionData(
      jwtSessionToken,
      req.body,
      jwt
    );
    var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
      validatedSessionData.nextRsa
    );
    var aesEncrypted = await Cryptography.aesEncrypt(
      validatedSessionData.token,
      rsaEncryptedAes.aesKey,
      validatedSessionData.nextRsa
    );
    res.send({
      rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
      aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
    });
  };
  preRegister = async (req, res) => {
    await ReferralService.findOne({ email: req.body.email }).then(
      async (referral) => {
        if (!referral) {
          return res.status(403).send({
            message: "pages.register.badEmail",
          });
        }
        req.body.referral = referral;
        res.send(
          await this.generateRegisterSessionData(jwtSessionToken, req.body, jwt)
        );
      }
    );
  };
  register = async (req, res) => {
    req.body.nextRsa = await Cryptography.generateRsaKeys("jwk");
    var validatedSessionData;
    try {
      validatedSessionData = await this.validateRegisterSessionData(
        jwtSessionToken,
        req.body,
        jwt
      );
    } catch (error) {
      return res.status(403).send({
        message: "pages.register.badCode",
      });
    }
    await UserService.findOne({ email: req.body.sessionJwt.email }).then(
      async (user) => {
        if (user) {
          return res.status(403).send({
            message: "pages.register.alreadyRegistered",
          });
        }
        var newUser = await UserService.create({
          email: req.body.sessionJwt.email,
          password: validatedSessionData.json.password,
        });
        newUser.save();
        var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(
          validatedSessionData.nextRsa
        );
        var aesEncrypted = await Cryptography.aesEncrypt(
          await jwt.sign(
            {
              nextRsa: req.body.nextRsa.pubkData,
              sessionJwt: validatedSessionData.sessionJwt,
            },
            jwtSessionToken.jwtSessionTokenElipticKey,
            { algorithm: "ES512" }
          ),
          rsaEncryptedAes.aesKey,
          validatedSessionData.nextRsa
        );
        await ReferralService.findOne({
          email: req.body.sessionJwt.email,
        }).then(async (referral) => {
          referral.delete();
        });
        res.send({
          rsaEncryptedAes: await Cryptography.ab2str(
            rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
        });
      }
    );
  };

  async validateRegisterSessionData(jwtSessionToken, postData, jwt) {
    var nextRsa = postData.nextRsa;
    var finalHash = null;
    var rsaDecryptedAesKey = null;
    var aesKey = null;
    var aesDecrypted = null;
    var cipherMap = null;
    var rsaEncryptedAesKeyHash = null;
    var cipherData = null;
    var json = null;
    postData.aesEncrypted = Cryptography.str2ab(postData.aesEncrypted);
    postData.rsaEncryptedAesKey = Cryptography.str2ab(
      postData.rsaEncryptedAesKey
    );
    postData.sessionJwt = await utils.parseJwtSessionToken(
      postData.sessionJwt,
      jwtSessionToken,
      jwt
    );
    postData.sessionJwt.rsaKeyPriv = await Cryptography.importRsaKey(
      postData.sessionJwt.rsaKeyPriv
    );
    finalHash = await Cryptography.getShaHash(
      postData.sessionJwt.totalHash +
        postData.sessionJwt.fullHash +
        postData.sessionJwt.userHash +
        postData.sessionJwt.rsaKeyPub +
        Cryptography.ab2str(postData.rsaEncryptedAesKey)
    );
    rsaDecryptedAesKey = await Cryptography.rsaDecrypt(
      postData.rsaEncryptedAesKey,
      postData.sessionJwt.rsaKeyPriv
    );
    aesKey = await Cryptography.importAesKey(rsaDecryptedAesKey);
    aesDecrypted = await Cryptography.aesDecrypt(
      postData.aesEncrypted,
      aesKey,
      finalHash
    );
    cipherMap = JSON.parse(aesDecrypted);
    cipherMap = {
      lock: Cryptography.fromString(cipherMap.cipherLock),
      dataLock: Cryptography.fromString(cipherMap.cipherDataLock),
      output: cipherMap.cipherOutput,
    };
    rsaEncryptedAesKeyHash = await Cryptography.getShaHash(
      Cryptography.ab2str(postData.rsaEncryptedAesKey)
    );
    cipherData = Cryptography.unlockCipherMap(cipherMap, [
      finalHash,
      postData.sessionJwt.userHash,
      postData.sessionJwt.fullHash,
      postData.sessionJwt.totalHash,
      rsaEncryptedAesKeyHash,
    ]);
    json = JSON.parse(cipherData);
    var identity: any = await IdentityService.create({
      secret: [...Array(128)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join(""),
      mailBox: [],
      password: json.password,
      pin: json.pin
    });
    return {
      nextRsa: json.nextRsa,
      json: json,
      sessionJwt: await utils.signJwtSessionToken(
        {
          identity: identity,
          rsaKeyPriv: nextRsa.privkData,
          rsaKeyPub: nextRsa.pubkData,
        },
        jwtSessionToken,
        jwt
      ),
    };
  }
  async validateLoginSessionData(jwtSessionToken, postData, jwt) {
    var finalHash = null;
    var rsaDecryptedAesKey = null;
    var aesKey = null;
    var aesDecrypted = null;
    var cipherMap = null;
    var rsaEncryptedAesKeyHash = null;
    var cipherData = null;
    var json = null;
    var passHash = null;
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    postData.aesEncrypted = Cryptography.str2ab(postData.aesEncrypted);
    postData.rsaEncryptedAesKey = Cryptography.str2ab(
      postData.rsaEncryptedAesKey
    );
    postData.sessionJwt = await utils.parseJwtSessionToken(
      postData.sessionJwt,
      jwtSessionToken,
      jwt
    );
    postData.sessionJwt.rsaKeyPriv = await Cryptography.importRsaKey(
      postData.sessionJwt.rsaKeyPriv
    );
    finalHash = await Cryptography.getShaHash(
      postData.sessionJwt.totalHash +
        postData.sessionJwt.fullHash +
        postData.sessionJwt.userHash +
        postData.sessionJwt.rsaKeyPub +
        Cryptography.ab2str(postData.rsaEncryptedAesKey)
    );
    rsaDecryptedAesKey = await Cryptography.rsaDecrypt(
      postData.rsaEncryptedAesKey,
      postData.sessionJwt.rsaKeyPriv
    );
    aesKey = await Cryptography.importAesKey(rsaDecryptedAesKey);
    aesDecrypted = await Cryptography.aesDecrypt(
      postData.aesEncrypted,
      aesKey,
      finalHash
    );
    cipherMap = JSON.parse(aesDecrypted);
    cipherMap = {
      lock: Cryptography.fromString(cipherMap.cipherLock),
      dataLock: Cryptography.fromString(cipherMap.cipherDataLock),
      output: cipherMap.cipherOutput,
    };
    rsaEncryptedAesKeyHash = await Cryptography.getShaHash(
      Cryptography.ab2str(postData.rsaEncryptedAesKey)
    );
    cipherData = Cryptography.unlockCipherMap(cipherMap, [
      finalHash,
      postData.sessionJwt.userHash,
      postData.sessionJwt.fullHash,
      postData.sessionJwt.totalHash,
      rsaEncryptedAesKeyHash,
    ]);
    json = JSON.parse(cipherData);
    var identity: any = await IdentityService.create({
      secret: [...Array(128)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join(""),
      mailBox: [],
      password: json.password,
      pin: json.pin
    });
    passHash = await Cryptography.getShaHash(json.password);
    if (passHash == postData.sessionJwt.password) {
      return {
        nextRsa: json.nextRsa,
        token: await jwt.sign(
          {
            nextRsa: nextRsa.pubkData,
            sessionJwt: await utils.signJwtSessionToken(
              {
                identity: identity,
                rsaKeyPriv: nextRsa.privkData,
                rsaKeyPub: nextRsa.pubkData,
              },
              jwtSessionToken,
              jwt
            ),
          },
          jwtSessionToken.jwtSessionTokenElipticKey,
          { algorithm: "ES512" }
        ),
      };
    }
  }
  async generateRegisterSessionData(jwtSessionToken, postData, jwt) {
    var rsaPubkData = postData.rsaPubkData;
    var rsaEncryptedAesKey = null;
    var userHash = null;
    var fullHash = null;
    var totalHash = null;
    var aesEncrypted = null;
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    rsaEncryptedAesKey = await Cryptography.getRsaEncryptedAesKey(rsaPubkData);
    userHash = await Cryptography.getShaHash(
      rsaPubkData + rsaEncryptedAesKey.aesPubkData
    );
    fullHash = await Cryptography.getShaHash(
      (await Cryptography.getShaHash(postData.referralEmail)) +
        (await Cryptography.getShaHash(postData.referral.code)) +
        rsaPubkData +
        rsaEncryptedAesKey.aesPubkData
    );
    totalHash = await Cryptography.getShaHash(fullHash + userHash);
    aesEncrypted = await Cryptography.aesEncrypt(
      JSON.stringify({
        secondRsaPubkData: nextRsa.pubkData,
        sessionJwt: await utils.signJwtSessionToken(
          {
            email: postData.email,
            pin: postData.pin,
            totalHash: totalHash,
            fullHash: fullHash,
            userHash: userHash,
            rsaKeyPriv: nextRsa.privkData,
            rsaKeyPub: nextRsa.pubkData,
          },
          jwtSessionToken,
          jwt
        ),
      }),
      rsaEncryptedAesKey.aesKey,
      totalHash
    );
    return {
      rsaEncryptedAesKey: Cryptography.ab2str(rsaEncryptedAesKey.encryptedAes),
      aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
    };
  }
  async generateLoginSessionData(jwtSessionToken, postData, jwt) {
    var rsaPubkData = postData.rsaPubkData;
    var rsaEncryptedAesKey = null;
    var userHash = null;
    var fullHash = null;
    var totalHash = null;
    var aesEncrypted = null;
    var nextRsa = await Cryptography.generateRsaKeys("jwk");
    rsaEncryptedAesKey = await Cryptography.getRsaEncryptedAesKey(rsaPubkData);
    userHash = await Cryptography.getShaHash(
      rsaPubkData + rsaEncryptedAesKey.aesPubkData
    );
    fullHash = await Cryptography.getShaHash(
      (await Cryptography.getShaHash(postData.user.password)) +
        rsaPubkData +
        rsaEncryptedAesKey.aesPubkData
    );
    totalHash = await Cryptography.getShaHash(fullHash + userHash);
    aesEncrypted = await Cryptography.aesEncrypt(
      JSON.stringify({
        secondRsaPubkData: nextRsa.pubkData,
        sessionJwt: await utils.signJwtSessionToken(
          {
            email: postData.user.email,
            password: postData.user.password,
            pin: postData.user.pin,
            totalHash: totalHash,
            fullHash: fullHash,
            userHash: userHash,
            rsaKeyPriv: nextRsa.privkData,
            rsaKeyPub: nextRsa.pubkData,
          },
          jwtSessionToken,
          jwt
        ),
      }),
      rsaEncryptedAesKey.aesKey,
      totalHash
    );
    return {
      rsaEncryptedAesKey: Cryptography.ab2str(rsaEncryptedAesKey.encryptedAes),
      aesEncrypted: Cryptography.ab2str(aesEncrypted.ciphertext),
    };
  }

  getRouter() {
    super.registerRoute("/login").post(this.getSafeMethod(this.login));
    super
      .registerRoute("/preRegister")
      .post(this.getSafeMethod(this.preRegister));
    super.registerRoute("/preLogin").post(this.getSafeMethod(this.preLogin));
    super.registerRoute("/register").post(this.getSafeMethod(this.register));
    return super._getRouter();
  }
}

export default {
  ControllerUser,
};
