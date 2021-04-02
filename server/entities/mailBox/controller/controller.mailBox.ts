import BaseController from "../../../controllers/base/base.controller";
import MailBox from "../schema/schema.mailBox";
import ServiceIdentity from "../../identity/service/service.identity";
import socketApp from "../../../socket.io";
import Identity from "../../identity/schema/schema.identity";
import * as mongoose from "mongoose";

class ControllerMailBox extends BaseController {
  Entity = MailBox;

  getMailBox = async (req, res) => {
    var mailBox: any = await MailBox.SchemaMailBox.findOne({
      _id: req.decryptedData.data.secret1,
      secret: req.decryptedData.data.secret2,
    });
    if (req.body.save) {
      var identity: any = await ServiceIdentity.findOne({
        _id: req.sessionJwt.identity._id,
        secret: req.sessionJwt.identity.secret,
      });
      identity.mailBox.push(mailBox);
      identity.save();
    }
    req.send(mailBox, res);
  };
  setMailBox = async (req, res) => {
    var mailBox: any = await MailBox.SchemaMailBox.findOne({
      _id: req.decryptedData.data.secret1,
      secret: req.decryptedData.data.secret2,
    });

    if (req.decryptedData.data.messages) {
      mailBox.messages = req.decryptedData.data.messages;
    } else {
      mailBox.messages.forEach((current, key) => {
        if (key == "local" && req.decryptedData.data.message.remote) {
          current.push(req.decryptedData.data.message);
        } else if (
          key == "remote" &&
          req.decryptedData.data.message.remote === false
        ) {
          current.push(req.decryptedData.data.message);
        }
      });
    }
    mailBox.save();
    Identity.SchemaIdentity.find(
      { mailBox: mongoose.Types.ObjectId(mailBox._id) },
      (err, identities) => {
        identities.map((currentIdentity) => {
          if (currentIdentity._id != req.sessionJwt.identity._id) {
            socketApp.registerMessage(currentIdentity, mailBox);
          }
          return currentIdentity;
        });
      }
    );
    req.send(mailBox, res);
  };
  reqMailBox = async (req, res) => {
    var mailBox: any = await MailBox.SchemaMailBox.create({
      secret: req.decryptedData.data.secret,
    });
    mailBox.set("messages.local", [req.decryptedData.data.message]);
    var identity: any = await ServiceIdentity.findOne({
      _id: req.sessionJwt.identity._id,
      secret: req.sessionJwt.identity.secret,
    });
    identity.mailBox.push(mailBox);
    identity.save();
    mailBox.save();
    req.send(mailBox, res);
  };
  
  getRouter() {
    super.registerProtectedRoute("/setMailBox").post(this.setMailBox)
    super.registerProtectedRoute("/getMailBox").post(this.getMailBox)
    super.registerProtectedRoute("/reqMailBox").post(this.reqMailBox)
    return super._getRouter();
  }
}

export default {
  ControllerMailBox,
};
