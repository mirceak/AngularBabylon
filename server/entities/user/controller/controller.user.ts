import BaseController from '../../../controllers/base/base.controller';
import User from '../schema/schema.user';
import Referral from '../../referral/schema/schema.referral';
import MailBox from '../../mailBox/schema/schema.mailBox';
import Identity from '../../identity/schema/schema.identity';
import { jwtSessionToken, Cryptography, jwt } from '../../../certs/jwtSessionToken/jwtSessionToken';

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
      rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.rsaEncryptedAes),
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
        rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.rsaEncryptedAes),
        aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
      });
    });
  };

  getMailBoxData = async (req, res) => {
    var sessionJwt = await Cryptography.parseJwtSessionToken(req.body.sessionJwt, jwtSessionToken, jwt);
    req.body.rsaEncryptedAes = Cryptography.str2ab(req.body.rsaEncryptedAes);
    req.body.aesEncrypted = Cryptography.str2ab(req.body.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(sessionJwt.rsaKeyPriv);
    var decryptedAes = await Cryptography.rsaDecrypt(req.body.rsaEncryptedAes, jwtRsaKey);
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(await Cryptography.aesDecrypt(req.body.aesEncrypted, aesKey, sessionJwt.rsaKeyPub));
    var mailBox: any = await MailBox.SchemaMailBox.findOne({
      _id: decryptedData.data.secret1,
      secret: decryptedData.data.secret2,
    });
    if (req.body.save) {
      var identity: any = await Identity.SchemaIdentity.findOne({ _id: sessionJwt.identity._id, secret: sessionJwt.identity.secret });
      identity.mailBox.push(mailBox);
      identity.save();
    }
    var nextRsa = await Cryptography.generateRsaKeys('jwk');
    var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(decryptedData.nextRsa);
    var aesEncrypted = await Cryptography.aesEncrypt(
      JSON.stringify({
        data: mailBox,
        token: await jwt.sign(
          {
            nextRsa: nextRsa.pubkData,
            sessionJwt: await Cryptography.signJwtSessionToken(
              {
                identity: sessionJwt.identity,
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
      decryptedData.nextRsa
    );
    res.send({
      rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.rsaEncryptedAes),
      aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
    });
  };

  setMailBoxData = async (req, res) => {
    var sessionJwt = await Cryptography.parseJwtSessionToken(req.body.sessionJwt, jwtSessionToken, jwt);
    req.body.rsaEncryptedAes = Cryptography.str2ab(req.body.rsaEncryptedAes);
    req.body.aesEncrypted = Cryptography.str2ab(req.body.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(sessionJwt.rsaKeyPriv);
    var decryptedAes = await Cryptography.rsaDecrypt(req.body.rsaEncryptedAes, jwtRsaKey);
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(await Cryptography.aesDecrypt(req.body.aesEncrypted, aesKey, sessionJwt.rsaKeyPub));
    var mailBox: any = await MailBox.SchemaMailBox.findOne({
      _id: decryptedData.data.secret1,
      secret: decryptedData.data.secret2,
    });
    mailBox.messages = decryptedData.data.messages;
    mailBox.save();
    var nextRsa = await Cryptography.generateRsaKeys('jwk');
    var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(decryptedData.nextRsa);
    var aesEncrypted = await Cryptography.aesEncrypt(
      JSON.stringify({
        data: mailBox,
        token: await jwt.sign(
          {
            nextRsa: nextRsa.pubkData,
            sessionJwt: await Cryptography.signJwtSessionToken(
              {
                identity: sessionJwt.identity,
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
      decryptedData.nextRsa
    );
    res.send({
      rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.rsaEncryptedAes),
      aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
    });
  };

  requestMailBoxData = async (req, res) => {
    var sessionJwt = await Cryptography.parseJwtSessionToken(req.body.sessionJwt, jwtSessionToken, jwt);
    req.body.rsaEncryptedAes = Cryptography.str2ab(req.body.rsaEncryptedAes);
    req.body.aesEncrypted = Cryptography.str2ab(req.body.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(sessionJwt.rsaKeyPriv);
    var decryptedAes = await Cryptography.rsaDecrypt(req.body.rsaEncryptedAes, jwtRsaKey);
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(await Cryptography.aesDecrypt(req.body.aesEncrypted, aesKey, sessionJwt.rsaKeyPub));
    var mailBox: any = await MailBox.SchemaMailBox.create({
      secret: [...Array(20)].map((i) => (~~(Math.random() * 36)).toString(36)).join(''),
    });
    mailBox.set('messages.local', [decryptedData.data.message]);
    mailBox.save();
    var identity: any = await Identity.SchemaIdentity.findOne({ _id: sessionJwt.identity._id, secret: sessionJwt.identity.secret });
    identity.mailBox.push(mailBox);
    identity.save();
    var nextRsa = await Cryptography.generateRsaKeys('jwk');
    var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(decryptedData.nextRsa);
    var aesEncrypted = await Cryptography.aesEncrypt(
      JSON.stringify({
        data: mailBox.toObject(),
        token: await jwt.sign(
          {
            nextRsa: nextRsa.pubkData,
            sessionJwt: await Cryptography.signJwtSessionToken(
              {
                identity: sessionJwt.identity,
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
      decryptedData.nextRsa
    );
    res.send({
      rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.rsaEncryptedAes),
      aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
    });
  };

  requestSignupData = async (req, res) => {
    var sessionJwt = await Cryptography.parseJwtSessionToken(req.body.sessionJwt, jwtSessionToken, jwt);
    req.body.rsaEncryptedAes = Cryptography.str2ab(req.body.rsaEncryptedAes);
    req.body.aesEncrypted = Cryptography.str2ab(req.body.aesEncrypted);
    var jwtRsaKey = await Cryptography.importRsaKey(sessionJwt.rsaKeyPriv);
    var decryptedAes = await Cryptography.rsaDecrypt(req.body.rsaEncryptedAes, jwtRsaKey);
    var aesKey = await Cryptography.importAesKey(decryptedAes);
    var decryptedData: any = JSON.parse(await Cryptography.aesDecrypt(req.body.aesEncrypted, aesKey, sessionJwt.rsaKeyPub));
    await Referral.SchemaReferral.findOne({ email: decryptedData.data.email }, async (err, referral) => {
      if (referral) {
        referral.delete();
      }
      await Referral.SchemaReferral.create({
        email: decryptedData.data.email,
        code: [...Array(20)].map((i) => (~~(Math.random() * 36)).toString(36)).join(''),
      }).then(async (referral: any) => {
        var nextRsa = await Cryptography.generateRsaKeys('jwk');
        var rsaEncryptedAes = await Cryptography.getRsaEncryptedAesKey(decryptedData.nextRsa);
        var aesEncrypted = await Cryptography.aesEncrypt(
          JSON.stringify({
            data: referral,
            token: await jwt.sign(
              {
                nextRsa: nextRsa.pubkData,
                sessionJwt: await Cryptography.signJwtSessionToken(
                  {
                    identity: sessionJwt.identity,
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
          decryptedData.nextRsa
        );
        res.send({
          rsaEncryptedAes: await Cryptography.ab2str(rsaEncryptedAes.rsaEncryptedAes),
          aesEncrypted: await Cryptography.ab2str(aesEncrypted.ciphertext),
        });
      });
    });
  };

  getRouter() {
    let router = super.getRouter();
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

export default ControllerUser;
