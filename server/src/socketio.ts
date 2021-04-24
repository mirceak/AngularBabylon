import { readFileSync } from "fs";
import * as https from "https";

import ServiceIdentity from "./entities/identity/service/service.identity";
import {
  jwtSessionToken,
  jwt,
  Cryptography,
} from "./certs/jwtSessionToken/jwtSessionToken";
import { Server } from "socket.io";
import Identity from "./entities/identity/schema/schema.identity";
import MailBox from "./entities/mailBox/schema/schema.mailBox";
import utils from "./controllers/utils";
import path = require("path");

var sockets = [];
var registeredMessages = [];
const httpsSocketServer = https
  .createServer({
    key: readFileSync(
      path.join(__dirname, "../../src/certs/https.key"),
      "utf-8"
    ),
    cert: readFileSync(
      path.join(__dirname, "../../src/certs/https.cert"),
      "utf-8"
    ),
  })
  .listen(8002, () => {
    console.log("Listening for socket requests...");
  });
const io = new Server(httpsSocketServer, {
  transports: ["websocket", "polling"],

  cors: {
    origin: ["https://talky.ro", "https://www.talky.ro"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket: any) => {
  console.log("client connected to socket");
  socket.on("identification", async (data) => {
    try {
      var sessionJwt: any = await utils.parseJwtSessionToken(
        data.sessionJwt,
        jwtSessionToken,
        jwt
      );
    } catch (error) {
      return socket.emit("error", {
        message: "services.auth.badJwt",
      });
    }
    socket.identity = sessionJwt.identity._id;
    var user: any = await Identity.SchemaIdentity.findOne({
      _id: socket.identity,
    }).then((user) => user);
    var mailBoxes: any = await MailBox.SchemaMailBox.find({
      _id: { $in: user.mailBox },
    });
    sockets.push(socket);
    registeredMessages.push({ socket: socket, mailBoxes: mailBoxes });
    socket.emit("verification", {});
  });
  socket.on("verify", async (data) => {
    try {
      var reqData: any = await utils.getRequestData(data).then((result) => {
        return result;
      });
    } catch (e) {
      return socket.emit("expiredToken", {
        message: "services.auth.badJwt",
      });
    }
    var identity = await ServiceIdentity.findOne({
      _id: reqData.sessionJwt.identity._id,
      secret: reqData.sessionJwt.identity.secret,
    });
    if (
      identity.lastJwtHash &&
      identity.lastJwtHash != reqData.sessionJwt.identity.lastJwtHash
    ) {
      return socket.emit("expiredToken", {
        message: "services.auth.badJwt",
      });
    }
    var regMessageIndex = registeredMessages.findIndex((msg) => {
      return socket.identity == msg.socket.identity;
    });
    var regMessage = registeredMessages.splice(regMessageIndex, 1)[0];
    var encryptedResponse: any;
    reqData.sessionJwt.identity.lastJwtHash = await Cryptography.getShaHash(
      identity.secret + reqData.sessionJwt.identity.lastJwtHash
    );
    identity.lastJwtHash = reqData.sessionJwt.identity.lastJwtHash;
    identity.save();
    if (regMessage.mailBox) {
      encryptedResponse = await utils.encryptResponseData(reqData, {
        mailBox: regMessage.mailBox,
      });
    } else {
      encryptedResponse = await utils.encryptResponseData(reqData, {
        mailBoxes: regMessage.mailBoxes,
      });
    }
    encryptedResponse.clientMsgId = reqData.decryptedData.data.clientMsgId;
    socket.emit("updateMailBox", encryptedResponse);
  });

  socket.on("disconnect", (data) => {
    console.log("disconnected", data);
    sockets.splice(
      sockets.reduce((total, currentSocket, index) => {
        if (currentSocket.identity == socket.identity) {
          total = index;
        }
        return total;
      }, 0),
      1
    );
  });
});

var registerMessage = (identity, mailBox) => {
  var socket = sockets.filter((currentSocket) => {
    return currentSocket.identity == identity._id;
  })[0];
  if (!socket) {
    return;
  }
  registeredMessages.push({ socket: socket, mailBox: mailBox });
  socket.emit("verification", {});
};

export default {
  registerMessage,
};
