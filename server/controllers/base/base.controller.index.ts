import * as UserController from "../../entities/user/controller/controller.user";
import * as MailBoxController from "../../entities/mailBox/controller/controller.mailBox";
import * as ReferralController from "../../entities/referral/controller/controller.referral";
import * as IdentityController from "../../entities/identity/controller/controller.identity";

export default [
  UserController.default.ControllerUser,
  IdentityController.default.ControllerIdentity,
  MailBoxController.default.ControllerMailBox,
  ReferralController.default.ControllerReferral
];
