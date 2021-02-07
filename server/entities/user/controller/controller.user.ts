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

  };

  getRouter() {
    let router = super.getRouter();
    router.route('/preLogin').post(this.preLogin);
    router.route('/login').post(this.login);
    router.route('/reqSignup').post(this.requestSignupData);
    return router;
  }
}

export default ControllerUser;
