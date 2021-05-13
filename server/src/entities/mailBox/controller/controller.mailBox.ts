import BaseController from "../../../controllers/base/base.controller";
import ServiceMailBox from "../service/service.mailBox";
import ServiceIdentity from "../../identity/service/service.identity";
import socket from "../../../modules/module.socketio";
import { Cryptography } from "../../../modules/module.jwtSessionToken";

class ControllerMailBox extends BaseController {
  Service = ServiceMailBox;

  getMailBox = async (req, res) => {
    var mailBox: any;
    var identity: any = await ServiceIdentity.findOne({
      _id: req.sessionJwt.identity._id,
      secret: req.sessionJwt.identity.secret,
    });
    try {
      mailBox = await ServiceMailBox.findOne({
        _id: req.decryptedData.data.secret1,
        secret: req.decryptedData.data.secret2,
      });
      if (mailBox == null || identity.mailBox.includes(req.decryptedData.data.secret1)) {
        throw null;
      }
    } catch (error) {
      return res.status(403).send({
        message: "pages.mailBox.badCode",
      });
    }
    if (req.body.save) {
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
    await ServiceIdentity.find({
      mailBox: mailBox._id,
    }).then(async (identities) => {
      await identities.map(async (currentIdentity) => {
        if (currentIdentity._id != req.sessionJwt.identity._id) {
          const roomHash = await Cryptography.getShaHash(
            currentIdentity._id + currentIdentity.secret
          );
          const sockets: any = await socket.io.in(roomHash).fetchSockets();
          if (sockets.length) {
            //TODO maybe add an id to the message so that multiple messages can be queued
            sockets[0].registeredMessage = { mailBox: mailBox };
            sockets[0].emit("verification", {});
          }
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
    super
      .registerProtectedRoute("/setMailBox")
      .post(this.getSafeMethod(this.setMailBox));
    super
      .registerProtectedRoute("/getMailBox")
      .post(this.getSafeMethod(this.getMailBox));
    super
      .registerProtectedRoute("/reqMailBox")
      .post(this.getSafeMethod(this.reqMailBox));
    return super._getRouter();
  }
}

export default {
  ControllerMailBox,
};
