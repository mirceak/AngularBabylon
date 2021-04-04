import BaseController from "../../../controllers/base/base.controller";
import ServiceReferral from "../service/service.referral";

class ControllerReferral extends BaseController {
  Entity = ServiceReferral.Entity;

  requestSignupData = async (req, res) => {
    await ServiceReferral.findOne({ email: req.decryptedData.data.email }).then(
      async (referral) => {
        if (referral) {
          referral.delete();
        }
        await ServiceReferral.create({
          email: req.decryptedData.data.email,
          code: [...Array(20)]
            .map((i) => (~~(Math.random() * 36)).toString(36))
            .join(""),
        }).then(async (referral: any) => {
          req.send(referral, res);
        });
      }
    );
  };

  getRouter() {
    super.registerProtectedRoute("/reqSignup").post(this.requestSignupData);
    return super._getRouter();
  }
}

export default {
  ControllerReferral, 
};
