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
    console.log(444, req.sessionJwt);
    req.jwtOptions = {
      lockedPin: false,
    };
    req.send({}, res);
  };

  test = async (req, res) => {
    res.send({ ya: true });
  };

  getRouter() {
    super.registerProtectedRoute("/login").post(this.getSafeMethod(this.login));
    super.registerRoute("/test").post(this.getSafeMethod(this.test));
    return super._getRouter();
  }
}

export default {
  ControllerIdentity,
};
