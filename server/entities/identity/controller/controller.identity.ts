import BaseController from "../../../controllers/base/base.controller";
import Identity from "../schema/schema.identity";
import * as mongoose from "mongoose";
import service from '../service/service.identity'

class ControllerIdentity extends BaseController {
  Entity = Identity;
}

export default {
  ControllerIdentity,
};
