import BaseController from "../../../controllers/base/base.controller";
import User from "../schema/schema.user";
import Referral from "../../referral/schema/schema.referral";
import Identity from "../../identity/schema/schema.identity";
import {
  jwtSessionToken,
  Cryptography,
  jwt,
} from "../../../certs/jwtSessionToken/jwtSessionToken";

class ControllerUser extends BaseController {
  Entity = User;

  preLogin = async (req, res) => {
    console.log(req);
    await User.SchemaUser.findOne(
      { email: req.body.email },
      async (err, user) => {
        if (!user) {
          return res.send(err);
        }
        req.body.user = user;
        res.send(
          await Cryptography.generateLoginSessionData(
            jwtSessionToken,
            req.body,
            jwt
          )
        );
      }
    );
  };
  login = async (req, res) => {
    var identity: any = await Identity.SchemaIdentity.create({
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
    await Referral.SchemaReferral.findOne(
      { email: req.body.email },
      async (err, referral) => {
        if (!referral) {
          return res.send({
            err: "bad referral email",
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
        referral.delete();
      }
    );
  };
  register = async (req, res) => {
    req.body.nextRsa = await Cryptography.generateRsaKeys("jwk");
    var identity: any = await Identity.SchemaIdentity.create({
      secret: [...Array(128)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join(""),
      mailBox: [],
    });
    req.body.identity = identity;
    var validatedSessionData = await Cryptography.validateRegisterSessionData(
      jwtSessionToken,
      req.body,
      jwt
    );
    await User.SchemaUser.findOne(
      { email: req.body.sessionJwt.email },
      async (err, user) => {
        if (user) {
          return res.send({
            err: "taken email",
          });
        }
        var newUser = await User.SchemaUser.create({
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
    super.registerRoute("/login").post(this.login)
    super.registerRoute("/preRegister").post(this.preRegister)
    super.registerRoute("/preLogin").post(this.preLogin)
    super.registerRoute("/register").post(this.register)
    return super._getRouter();
  }
}

export default {
  ControllerUser,
};
