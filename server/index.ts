import "module-alias/register";
import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as crypto from 'crypto';

import setMongo from "./mongo";
import tunnel from "./tunnel";
import BaseController from "./controllers/base/base.controller";
import Controllers from "./controllers/base/base.controller.index";

const app = express();
async function main(): Promise<any> {
  try {
    await setMongo();

    app.set("port", 3000);
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/", express.static(path.join(__dirname, "../../dist/client")));
    const controllerParser = (controllers: any[]) => {
      Object.keys(controllers).map((key) => {
        let ctrl: BaseController = new controllers[key]();
        app.use("/api", ctrl.getRouter());
      });
    };
    controllerParser(Controllers);

    app.get("/utils/tunnel", onTunnel);

    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../dist/client/index.html"));
    });
    app.listen(app.get("port"), () =>
      console.log(`Angular Full Stack listening on port ${app.get("port")}`)
    );
  } catch (err) {
    console.error(err);
  }
}
main();


var onTunnel = (req, res) => {
  //get pass based off of user from request
  var p1 = "pass1";
  var p2 = "pass2";
  var p3 = "pass3";
  var hash = crypto.createHmac('sha512', p2)
  var clientLock = tunnel.scrambledMapLength(tunnel.originalMap.length);
  var serverLock = tunnel.generateLock(clientLock.length);
  hash.update(p1)
  var p1hash = tunnel.lockMessage(hash.digest('base64'), serverLock);
  hash = crypto.createHmac('sha512', p3)
  hash.update(p2)
  var p2hash = tunnel.lockMessage(hash.digest('base64'), serverLock);
  hash = crypto.createHmac('sha512', p1)
  hash.update(p3)
  var p3hash = tunnel.lockMessage(hash.digest('base64'), serverLock);
  var message = p2hash + clientLock.join("") + p3hash;
  tunnel.engraveKey(serverLock, p1hash, message);
  res.send({
    original: tunnel.originalMap,
    lock: serverLock,
  });
};
