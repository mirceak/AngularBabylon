import "module-alias/register";
import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as crypto from 'crypto';

import setMongo from "./mongo";
import tunnel from "../client/src/tunnel";
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
    app.use("/", express.static(path.join(__dirname, "../../client")));
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
      res.sendFile(path.join(__dirname, "../../client/index.html"));
    });
    app.listen(app.get("port"), () =>
      console.log(`Angular Full Stack listening on port ${app.get("port")}`)
    );
  } catch (err) {
    console.error(err);
  }
}

var getHash = (key, msg) => {
  var hash = crypto.createHmac("sha512", key);
  hash.update(msg);
  return hash.digest("base64");
};

const hashLen = 88;
const p1 = "pass1";
const p2 = "pass2";
const p3 = "pass3";

var clientLock: string[][];

var onTunnel = (req, res) => {
  var serverLock = tunnel.makeServerLock(
    getHash(p2, p1),
    getHash(p3, p2),
    getHash(p1, p3)
  );

  clientLock = serverLock.innerLock;
  res.send({
    lock: tunnel.toString(serverLock.lock),
    dataLock: tunnel.toString(serverLock.dataLock),
  });
};

var onLockTunnel = (req, res) => {
  var finalLock = tunnel.fromString(req.body.finalLock);
  var dataLock = tunnel.fromString(req.body.dataLock);

  var p2hashLocked = tunnel.lockMessage(getHash(p3, p2), dataLock);
  var p3hashLocked = tunnel.lockMessage(getHash(p1, p3), dataLock);

  var lockedClientLockMessage = tunnel.unlock(
    finalLock,
    tunnel.toString(clientLock)
  );

  var p2hashLockedTwice = tunnel.lockMessage(p2hashLocked, clientLock);
  var p2hashIndex = lockedClientLockMessage.indexOf(p2hashLockedTwice);

  var partUnlockedClientLockMessage = tunnel
    .unlockMessage(lockedClientLockMessage.substring(p2hashIndex), clientLock)
    .substring(p2hashLockedTwice.length);

  var p3hashIndex = partUnlockedClientLockMessage.indexOf(p3hashLocked);
  var finalLockString = partUnlockedClientLockMessage.substring(0, p3hashIndex);

  var finalClientLock = tunnel.fromString(finalLockString);

  var encrypted = tunnel.lockMessage(
    `import { HttpClient } from '@angular/common/http'; import { Component } from '@angular/core'; import CryptoJs from 'crypto-js'; import tunnel from '../../../src/tunnel'; @Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'], providers: [HttpClient], }) export class AppComponent { hashLen = 88; getHash(key, msg) { var hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA512, key); hmac.update(msg); return CryptoJs.enc.Base64.stringify( CryptoJs.enc.Hex.parse(hmac.finalize().toString()) ); } constructor(private http: HttpClient) { this.http.get<any>('/utils/tunnel').subscribe( (data) => { var p1 = 'pass1'; var p2 = 'pass2'; var p3 = 'pass3'; data.lock = tunnel.fromString(data.lock); data.dataLock = tunnel.fromString(data.dataLock); var p1hashLocked = tunnel.lockMessage( this.getHash(p2, p1), data.dataLock ); var p2hashLocked = tunnel.lockMessage( this.getHash(p3, p2), data.dataLock ); var p3hashLocked = tunnel.lockMessage( this.getHash(p1, p3), data.dataLock ); var lockedServerLockMessage = tunnel.unlock(data.lock, p1hashLocked); var p2hashLockedTwice = tunnel.lockMessage(p2hashLocked, data.dataLock); var p2hashIndex = lockedServerLockMessage.indexOf(p2hashLockedTwice) var unlockedServerLockMessage = tunnel.unlockMessage( lockedServerLockMessage.substring(p2hashIndex), data.dataLock ).substring(p2hashLockedTwice.length); var p3hashIndex = unlockedServerLockMessage.indexOf(p3hashLocked) var serverLockString = unlockedServerLockMessage.substring(0, p3hashIndex) var serverLock = tunnel.fromString(serverLockString); var finalLock = tunnel.generateLock( this.hashLen * 2 + tunnel.originalMap.length * tunnel.originalMap.length + 4000 ); var dataLock = tunnel.generateLock(this.hashLen); var clientLock = tunnel.generateLock(tunnel.originalMap.length); p2hashLocked = tunnel.lockMessage(this.getHash(p3, p2), dataLock); p3hashLocked = tunnel.lockMessage(this.getHash(p1, p3), dataLock); var lockedFinalLock = tunnel.lockMessage( p2hashLocked + tunnel.toString(clientLock) + p3hashLocked, serverLock ); tunnel.engraveKey( finalLock, serverLockString, lockedFinalLock, true ); var postData = { finalLock: tunnel.toString(finalLock), dataLock: tunnel.toString(dataLock), }; this.http.post<any>('/utils/tunnel', postData).subscribe( (data) => { console.log(tunnel.unlockMessage(data.encrypted, clientLock)); }, (error) => console.log('tunnel post', error) ); }, (error) => console.log('tunnel get', error) ); } title = 'app'; } `,
    finalClientLock
  );
  res.send({
    encrypted,
  });
};

main();
