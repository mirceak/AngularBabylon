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
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true, parameterLimit: 15000 }));
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
    app.post("/utils/tunnel", onLockTunnel);

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


var p1 = "pass1";
var p2 = "pass2";
var p3 = "pass3";
var serverMap = tunnel.scrambledMapLength(tunnel.originalMap.length);
var serverLock = tunnel.generateLock(serverMap.length);
var hash = crypto.createHmac('sha512', p2)
hash.update(p1)
var p1hash = tunnel.lockMessage(hash.digest('base64'), serverLock);
hash = crypto.createHmac('sha512', p3)
hash.update(p2)
var p2hash = tunnel.lockMessage(hash.digest('base64'), serverLock);
hash = crypto.createHmac('sha512', p1)
hash.update(p3)
var p3hash = tunnel.lockMessage(hash.digest('base64'), serverLock);
var message = p2hash + serverMap.join("") + p3hash;
var offset = tunnel.engraveKey(serverLock, p1hash, message);
var onTunnel = (req, res) => {
  //get pass based off of user from request
  res.send({
    lock: serverLock,
  });
};

var onLockTunnel = (req, res) => {

  var tunnelLock = '';
  for (var i = 0; i < req.body.lock.length; i++) {
    var originalInputIdex = tunnel.originalMap.indexOf(
      serverMap[i % serverMap.length]
    );
    tunnelLock += req.body.lock[i][originalInputIdex];
  }

  tunnelLock = tunnelLock.substr(0, serverMap.length)
  
  var clientMap = tunnel.unlockMessage(tunnelLock, serverMap.join(''))
  var builtLock = [];
  for (var i = 0; i < clientMap.length / tunnel.originalMap.length; i++) {
    builtLock.push([
      ...clientMap.substring(
        i * (tunnel.originalMap.length - 1),
        (tunnel.originalMap.length - 1) * (i + 1)
      ),
    ]);
  }

  res.send({
    clientMap: clientMap,
    serverMap: serverMap.join(''),
    tunnelLock: tunnelLock,
  });
}
