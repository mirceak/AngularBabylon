import baseService from "../../../services/base/base.service.entity";
import User from "../schema/schema.user";

export default {
  Entity: User,
  ...Object.assign({ ...baseService.get(User.SchemaUser) }, {}),
};
