import BaseController from '../../../controllers/base/base.controller';
import User from '../schema/schema.user';
import Referral from '../../referral/schema/schema.referral';
import MailBox from '../../mailBox/schema/schema.mailBox';
import Identity from '../../identity/schema/schema.identity';
import { jwtSessionToken, Cryptography, jwt } from '../../../certs/jwtSessionToken/jwtSessionToken';
import * as mongoose from 'mongoose';
import socketApp from '../../../socket.io';

var getRequestData = async (data) => {
  var sessionJwt = await Cryptography.parseJwtSessionToken(data.sessionJwt, jwtSessionToken, jwt);
  data.rsaEncryptedAes = Cryptography.str2ab(data.rsaEncryptedAes);
  data.aesEncrypted = Cryptography.str2ab(data.aesEncrypted);
  var jwtRsaKey = await Cryptography.importRsaKey(sessionJwt.rsaKeyPriv);
  var decryptedAes = await Cryptography.rsaDecrypt(data.rsaEncryptedAes, jwtRsaKey);
  var aesKey = await Cryptography.importAesKey(decryptedAes);
  var decryptedData: any = JSON.parse(await Cryptography.aesDecrypt(data.aesEncrypted, aesKey, sessionJwt.rsaKeyPub));
  return {
    sessionJwt: sessionJwt,
    decryptedData: decryptedData,
  };
};

var encryptResponseData = async (reqData, data) => {
  var nextRsa = await Cryptography.generateRsaKeys('jwk');
  var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(reqData.decryptedData.nextRsa);
  var aesEncrypted = await Cryptography.aesEncrypt(
    JSON.stringify({
      data: data,
      token: await jwt.sign(
        {
          nextRsa: nextRsa.pubkData,
          sessionJwt: await Cryptography.signJwtSessionToken(
            {
              identity: reqData.sessionJwt.identity,
              rsaKeyPriv: nextRsa.privkData,
              rsaKeyPub: nextRsa.pubkData,
            },
            jwtSessionToken,
            jwt
          ),
        },
        jwtSessionToken.jwtSessionTokenElipticKey,
        { algorithm: 'ES512' }
      ),
    }),
    rsaEncryptedAes.aesKey,
    reqData.decryptedData.nextRsa
  );
  return {
    rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
    aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
  };
};

class ControllerUser extends BaseController {
  Entity = User;

  preLogin = async (req, res) => {
    await User.SchemaUser.findOne({ email: req.body.email }, async (err, user) => {
      if (!user) {
        return res.send(err);
      }
      req.body.user = user;
      res.send(await Cryptography.generateLoginSessionData(jwtSessionToken, req.body, jwt));
    });
  };

  login = async (req, res) => {
    var identity: any = await Identity.SchemaIdentity.create({
      secret: [...Array(128)].map((i) => (~~(Math.random() * 36)).toString(36)).join(''),
      mailBox: [],
    });
    req.body.identity = identity;
    var validatedSessionData = await Cryptography.validateLoginSessionData(jwtSessionToken, req.body, jwt);
    var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(validatedSessionData.nextRsa);
    var aesEncrypted = await Cryptography.aesEncrypt(validatedSessionData.token, rsaEncryptedAes.aesKey, validatedSessionData.nextRsa);
    res.send({
      rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
      aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
    });
  };

  preRegister = async (req, res) => {
    await Referral.SchemaReferral.findOne({ email: req.body.email }, async (err, referral) => {
      if (!referral) {
        return res.send({
          err: 'bad referral email',
        });
      }
      req.body.referral = referral;
      res.send(await Cryptography.generateRegisterSessionData(jwtSessionToken, req.body, jwt));
      referral.delete();
    });
  };
  register = async (req, res) => {
    req.body.nextRsa = await Cryptography.generateRsaKeys('jwk');
    var identity: any = await Identity.SchemaIdentity.create({
      secret: [...Array(128)].map((i) => (~~(Math.random() * 36)).toString(36)).join(''),
      mailBox: [],
    });
    req.body.identity = identity;
    var validatedSessionData = await Cryptography.validateRegisterSessionData(jwtSessionToken, req.body, jwt);
    await User.SchemaUser.findOne({ email: req.body.sessionJwt.email }, async (err, user) => {
      if (user) {
        return res.send({
          err: 'taken email',
        });
      }
      var newUser = await User.SchemaUser.create({
        email: req.body.sessionJwt.email,
        username: validatedSessionData.json.username,
        password: validatedSessionData.json.password,
      });
      newUser.save();
      var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(validatedSessionData.nextRsa);
      var aesEncrypted = await Cryptography.aesEncrypt(
        await jwt.sign(
          {
            nextRsa: req.body.nextRsa.pubkData,
            sessionJwt: validatedSessionData.sessionJwt,
          },
          jwtSessionToken.jwtSessionTokenElipticKey,
          { algorithm: 'ES512' }
        ),
        rsaEncryptedAes.aesKey,
        validatedSessionData.nextRsa
      );
      res.send({
        rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
        aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
      });
    });
  };

  getMailBoxData = async (req, res) => {
    var mailBox: any = await MailBox.SchemaMailBox.findOne({
      _id: req.decryptedData.data.secret1,
      secret: req.decryptedData.data.secret2,
    });
    if (req.body.save) {
      var identity: any = await Identity.SchemaIdentity.findOne({
        _id: req.sessionJwt.identity._id,
        secret: req.sessionJwt.identity.secret,
      });
      identity.mailBox.push(mailBox);
      identity.save();
    }
    req.send(mailBox, res);
  };

  setMailBoxData = async (req, res) => {
    var mailBox: any = await MailBox.SchemaMailBox.findOne({
      _id: req.decryptedData.data.secret1,
      secret: req.decryptedData.data.secret2,
    });

    if (req.decryptedData.data.messages) {
      mailBox.messages = req.decryptedData.data.messages;
    } else {
      mailBox.messages.forEach((current, key) => {
        if (key == 'local' && req.decryptedData.data.message.remote) {
          current.push(req.decryptedData.data.message);
        } else if (key == 'remote' && req.decryptedData.data.message.remote === false) {
          current.push(req.decryptedData.data.message);
        }
      });
    }
    mailBox.save();
    Identity.SchemaIdentity.find({ mailBox: mongoose.Types.ObjectId(mailBox._id) }, (err, identities) => {
      identities.map((currentIdentity) => {
        if (currentIdentity._id != req.sessionJwt.identity._id) {
          socketApp.registerMessage(currentIdentity, mailBox);
        }
        return currentIdentity;
      });
    });
    req.send(mailBox, res);
  };

  requestMailBoxData = async (req, res) => {
    var mailBox: any = await MailBox.SchemaMailBox.create({
      secret: req.decryptedData.data.secret,
    });
    mailBox.set('messages.local', [req.decryptedData.data.message]);
    var identity: any = await Identity.SchemaIdentity.findOne({ _id: req.sessionJwt.identity._id, secret: req.sessionJwt.identity.secret });
    identity.mailBox.push(mailBox);
    identity.save();
    mailBox.save();
    req.send(mailBox, res);
  };

  requestSignupData = async (req, res) => {
    await Referral.SchemaReferral.findOne({ email: req.decryptedData.data.email }, async (err, referral) => {
      if (referral) {
        referral.delete();
      }
      await Referral.SchemaReferral.create({
        email: req.decryptedData.data.email,
        code: [...Array(20)].map((i) => (~~(Math.random() * 36)).toString(36)).join(''),
      }).then(async (referral: any) => {
        req.send(referral, res);
      });
    });
  };

  getRouter() {
    let router = super.getRouter();
    router.use(['/reqSignup', '/setMailBox', '/getMailBox', '/reqMailBox'], async (req, res, next) => {
      var reqData: any = await getRequestData(req.body);
      req.decryptedData = reqData.decryptedData;
      req.sessionJwt = reqData.sessionJwt;
      req.send = async (data, res) => {
        var encryptedResponse = await encryptResponseData(reqData, data);
        res.send({
          rsaEncryptedAes: encryptedResponse.rsaEncryptedAes,
          aesEncrypted: encryptedResponse.aesEncrypted,
        });
      };
      next();
    });
    router.route('/preLogin').post(this.preLogin);
    router.route('/login').post(this.login);
    router.route('/reqSignup').post(this.requestSignupData);
    router.route('/setMailBox').post(this.setMailBoxData);
    router.route('/getMailBox').post(this.getMailBoxData);
    router.route('/reqMailBox').post(this.requestMailBoxData);
    router.route('/preRegister').post(this.preRegister);
    router.route('/register').post(this.register);
    return router;
  }
}

export default {
  ControllerUser,
  getRequestData,
  encryptResponseData,
};
