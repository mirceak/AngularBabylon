import { readFileSync } from "fs";
import * as https from "https";

import ServiceIdentity from "../entities/identity/service/service.identity";
import { jwtSessionToken, jwt, Cryptography } from "./module.jwtSessionToken";
import { Server } from "socket.io";
import Identity from "../entities/identity/schema/schema.identity";
import MailBox from "../entities/mailBox/schema/schema.mailBox";
import utils from "./module.utils";
import path = require("path");

const httpsSocketServer = https
  .createServer({
    key: readFileSync(
      path.join(__dirname, "../../../src/certs/https.key"),
      "utf-8"
    ),
    cert: readFileSync(
      path.join(__dirname, "../../../src/certs/https.cert"),
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
    var user: any = await Identity.SchemaIdentity.findOne({
      _id: sessionJwt.identity._id ,
    }).then((user) => user);
    var mailBoxes: any = await MailBox.SchemaMailBox.find({
      _id: { $in: user.mailBox },
    });
    var identity = await ServiceIdentity.findOne({
      _id: sessionJwt.identity._id,
      secret: sessionJwt.identity.secret,
    });
    identity.lastSessionTokenHash = sessionJwt.lastSessionTokenHash;
    identity.lastSocketTokenHash = await Cryptography.getShaHash(
      identity.secret + JSON.stringify(data.sessionJwt)
    );
    identity.save();
    socket.join(
      await Cryptography.getShaHash(sessionJwt.identity._id + identity.secret)
    );
    socket.registeredMessage = { mailBoxes: mailBoxes };
    socket.emit("verification", {});
  });
  socket.on("verify", async (data) => {
    try {
      var reqData: any = await utils.getRequestData(data).then((result) => {
        return result;
      });
    } catch (e) {
      socket.emit("expiredToken", {
        message: "services.auth.badJwt",
      });
      return socket.disconnect();
    }
    var identity = await ServiceIdentity.findOne({
      _id: reqData.sessionJwt.identity._id,
      secret: reqData.sessionJwt.identity.secret,
    });
    if (
      identity.lastSocketTokenHash &&
      identity.lastSocketTokenHash !=
        (await Cryptography.getShaHash(
          identity.secret + JSON.stringify(data.sessionJwt)
        ))
    ) {
      return socket.emit("expiredToken", {
        message: "services.auth.badJwt",
      });
    }
    var encryptedResponse: any;
    if (socket.registeredMessage.mailBox) {
      encryptedResponse = await utils.encryptResponseData(reqData, {
        mailBox: socket.registeredMessage.mailBox,
      });
    } else {
      encryptedResponse = await utils.encryptResponseData(reqData, {
        mailBoxes: socket.registeredMessage.mailBoxes,
      });
    }
    encryptedResponse.clientMsgId = reqData.decryptedData.data.clientMsgId;
    socket.emit("updateMailBox", encryptedResponse);
  });

  socket.on("disconnect", (data) => {
    console.log("socket disconnected");
  });
});

export default {
  io,
};
