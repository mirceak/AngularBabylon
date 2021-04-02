import baseService from "../../../services/base/base.service.entity";
import Referral from "../schema/schema.referral";

export default {
  Entity: Referral,
  ...Object.assign({ ...baseService.get(Referral.SchemaReferral) }, {}),
};
