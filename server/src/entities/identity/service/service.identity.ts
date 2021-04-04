import baseService from "../../../services/base/base.service.entity";
import Identity from "../schema/schema.identity";

export default {
  Entity: Identity,
  ...Object.assign({ ...baseService.get(Identity.SchemaIdentity) }, {}),
};
