import BaseController from "../../../controllers/base/base.controller";
import UserService from "../service/service.user";
import ReferralService from "../../referral/service/service.referral";
import IdentityService from "../../identity/service/service.identity";
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
        await Cryptography.generateLoginSessionData(
          jwtSessionToken,
          req.body,
          jwt
        )
      );
    });
  };
  login = async (req, res) => {
    var identity: any = await IdentityService.create({
      secret: [...Array(128)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join(""),
      mailBox: [],
    });
    req.body.identity = identity;
    var validatedSessionData = await Cryptography.validateLoginSessionData(
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
          await Cryptography.generateRegisterSessionData(
            jwtSessionToken,
            req.body,
            jwt
          )
        );
      }
    );
  };
  register = async (req, res) => {
    req.body.nextRsa = await Cryptography.generateRsaKeys("jwk");
    var identity: any = await IdentityService.create({
      secret: [...Array(128)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join(""),
      mailBox: [],
    });
    req.body.identity = identity;
    var validatedSessionData;
    try {
      validatedSessionData = await Cryptography.validateRegisterSessionData(
        jwtSessionToken,
        req.body,
        jwt
      );
    } catch (e) {
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

  getRouter() {
    super.registerRoute("/login").post(this.login);
    super.registerRoute("/preRegister").post(this.preRegister);
    super.registerRoute("/preLogin").post(this.preLogin);
    super.registerRoute("/register").post(this.register);
    return super._getRouter();
  }
}

export default {
  ControllerUser,
};
