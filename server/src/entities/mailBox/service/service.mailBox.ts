import baseService from "../../../services/base/base.service.entity";
import MailBox from "../schema/schema.mailBox";

export default {
  Entity: MailBox,
  ...Object.assign({ ...baseService.get(MailBox.SchemaMailBox) }, {}),
};
