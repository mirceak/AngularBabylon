import * as UserController from "../../entities/user/controller/controller.user";
import * as MailBoxController from "../../entities/mailBox/controller/controller.mailBox";
import * as ReferralController from "../../entities/referral/controller/controller.referral";
import * as IdentityController from "../../entities/identity/controller/controller.identity";

export default {
  ControllerUser: new UserController.default.ControllerUser(),
  ControllerIdentity: new IdentityController.default.ControllerIdentity(),
  ControllerMailBox: new MailBoxController.default.ControllerMailBox(),
  ControllerReferral: new ReferralController.default.ControllerReferral()
};
