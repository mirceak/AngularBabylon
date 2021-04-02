import BaseController from "../../../controllers/base/base.controller";
import Referral from "../schema/schema.referral";
import utils from '../../../controllers/utils'

class ControllerReferral extends BaseController {
  Entity = Referral;
  
  requestSignupData = async (req, res) => {
    await Referral.SchemaReferral.findOne(
      { email: req.decryptedData.data.email },
      async (err, referral) => {
        if (referral) {
          referral.delete();
        }
        await Referral.SchemaReferral.create({
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
    super.registerProtectedRoute("/reqSignup").post(this.requestSignupData)
    return super._getRouter();
  }
}

export default {
  ControllerReferral,
};
