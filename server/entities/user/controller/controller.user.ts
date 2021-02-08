import BaseController from '../../../controllers/base/base.controller';
import * as SchemaUser from '../../../entities/user/schema/schema.user';
import User from '../schema/schema.user';
import { jwtSessionToken, Cryptography, jwt } from '../../../certs/jwtSessionToken/jwtSessionToken';

class ControllerUser extends BaseController {
  Entity = SchemaUser.default;

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
    res.send(await Cryptography.validateLoginSessionData(jwtSessionToken, req.body, jwt));
  };

  requestSignupData = async (req, res) => {
    var token = await Cryptography.parseJwtSessionToken(req.body.sessionJwt, jwtSessionToken, jwt);
    await User.SchemaUser.findOne({ email: req.body.user.email }, async (err, user) => {
      if (!user) {
        return res.send(err);
      }
      if (
        !user.referrals.reduce((total, current) => {
          return current.email == req.body.email;
        }, false)
      ) {
        user.referrals.push({ email: req.body.email, code: [...Array(20)].map((i) => (~~(Math.random() * 36)).toString(36)).join('') });
        user.save();
      }
      res.send({
        token: await jwt.sign(
          {
            user: {
              email: user.email,
              referrals: user.referrals,
            },
            sessionJwt: await Cryptography.signJwtSessionToken(
              {
                email: token.email,
                username: token.username,
                password: token.password,
                totalHash: token.totalHash,
                fullHash: token.fullHash,
                userHash: token.userHash,
                rsaKeys_0: token.privkData,
                referrals: user.referrals,
              },
              jwtSessionToken,
              jwt
            ),
          },
          jwtSessionToken.jwtSessionTokenElipticKey,
          { algorithm: 'ES512' }
        ),
      });
    });
  };

  preRegister = async (req, res) => {
    await User.SchemaUser.findOne({ email: req.body.referralEmail }, async (err, user) => {
      if (!user) {
        return res.send({
          err: 'bad referral email',
        });
      }
      var referral;
      if (
        !user.referrals.reduce((total, current) => {
          if (current.email == req.body.email) {
            referral = current;
          }
          return current.email == req.body.email ? true : total;
        }, false)
      ) {
        return res.send({
          err: 'wrong referred email',
        });
      }
      req.body.user = user;
      res.send(await Cryptography.generateRegisterSessionData(jwtSessionToken, req.body, jwt));
    });
  };
  register = async (req, res) => {
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
        referrals: [],
      });
      newUser.save();
      res.send({
        token: await jwt.sign(
          {
            user: {
              email: newUser.get('name'),
              referrals: newUser.get('referrals'),
            },
            sessionJwt: validatedSessionData.sessionJwt,
          },
          jwtSessionToken.jwtSessionTokenElipticKey,
          { algorithm: 'ES512' }
        ),
      });
    });
  };

  getRouter() {
    let router = super.getRouter();
    router.route('/preLogin').post(this.preLogin);
    router.route('/login').post(this.login);
    router.route('/reqSignup').post(this.requestSignupData);
    router.route('/preRegister').post(this.preRegister);
    router.route('/register').post(this.register);
    return router;
  }
}

export default ControllerUser;
