import BaseController from "../../../controllers/base/base.controller";
import Identity from "../schema/schema.identity";

class ControllerIdentity extends BaseController {
  Entity = Identity;
}

export default {
  ControllerIdentity,
};
