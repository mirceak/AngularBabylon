import BaseController from "../../../controllers/base/base.controller";
import ServiceMailBox from "../service/service.mailBox";
import ServiceIdentity from "../../identity/service/service.identity";
import socketApp from "../../../socketio";

class ControllerMailBox extends BaseController {
  Entity = ServiceMailBox.Entity;

  getMailBox = async (req, res) => {
    var mailBox: any;
    try {
      mailBox = await ServiceMailBox.findOne({
        _id: req.decryptedData.data.secret1,
        secret: req.decryptedData.data.secret2,
      });
      if (mailBox == null){
        throw null;
      }
    } catch (error) {
      return res.status(403).send({
        message: "pages.mailBox.badCode",
      });
    }
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
    var mailBox: any = await ServiceMailBox.findOne({
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
    ServiceIdentity.find({
      mailBox: mailBox._id,
    }).then((identities) => {
      identities.map((currentIdentity) => {
        if (currentIdentity._id != req.sessionJwt.identity._id) {
          socketApp.registerMessage(currentIdentity, mailBox);
        }
        return currentIdentity;
      });
    });
    req.send(mailBox, res);
  };
  reqMailBox = async (req, res) => {
    var mailBox: any = await ServiceMailBox.create({
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
    super.registerProtectedRoute("/setMailBox").post(this.getSafeMethod(this.setMailBox));
    super.registerProtectedRoute("/getMailBox").post(this.getSafeMethod(this.getMailBox));
    super.registerProtectedRoute("/reqMailBox").post(this.getSafeMethod(this.reqMailBox));
    return super._getRouter();
  }
}

export default {
  ControllerMailBox,
};
