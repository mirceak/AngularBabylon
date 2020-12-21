"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const crypto = require("crypto");
const mongo_1 = require("./mongo");
const tunnel_1 = require("./tunnel");
const base_controller_index_1 = require("./controllers/base/base.controller.index");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true, parameterLimit: 15000 }));
async function main() {
    try {
        await mongo_1.default();
        app.set("port", 3000);
        app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use("/", express.static(path.join(__dirname, "../../dist/client")));
        const controllerParser = (controllers) => {
            Object.keys(controllers).map((key) => {
                let ctrl = new controllers[key]();
                app.use("/api", ctrl.getRouter());
            });
        };
        controllerParser(base_controller_index_1.default);
        app.get("/utils/tunnel", onTunnel);
        app.post("/utils/tunnel", onLockTunnel);
        app.get("/*", (req, res) => {
            res.sendFile(path.join(__dirname, "../../dist/client/index.html"));
        });
        app.listen(app.get("port"), () => console.log(`Angular Full Stack listening on port ${app.get("port")}`));
    }
    catch (err) {
        console.error(err);
    }
}
main();
var p1 = "pass1";
var p2 = "pass2";
var p3 = "pass3";
var serverMap = tunnel_1.default.scrambledMapLength(tunnel_1.default.originalMap.length);
var serverLock = tunnel_1.default.generateLock(serverMap.length);
var hash = crypto.createHmac('sha512', p2);
hash.update(p1);
var p1hash = tunnel_1.default.lockMessage(hash.digest('base64'), serverLock);
hash = crypto.createHmac('sha512', p3);
hash.update(p2);
var p2hash = tunnel_1.default.lockMessage(hash.digest('base64'), serverLock);
hash = crypto.createHmac('sha512', p1);
hash.update(p3);
var p3hash = tunnel_1.default.lockMessage(hash.digest('base64'), serverLock);
var message = p2hash + serverMap.join("") + p3hash;
var offset = tunnel_1.default.engraveKey(serverLock, p1hash, message);
var onTunnel = (req, res) => {
    //get pass based off of user from request
    res.send({
        lock: serverLock,
    });
};
var onLockTunnel = (req, res) => {
    var tunnelLock = '';
    for (var i = 0; i < req.body.lock.length; i++) {
        var originalInputIdex = tunnel_1.default.originalMap.indexOf(serverMap[i % serverMap.length]);
        tunnelLock += req.body.lock[i][originalInputIdex];
    }
    tunnelLock = tunnelLock.substr(0, serverMap.length);
    var clientMap = tunnel_1.default.unlockMessage(tunnelLock, serverMap.join(''));
    var builtLock = [];
    for (var i = 0; i < clientMap.length / tunnel_1.default.originalMap.length; i++) {
        builtLock.push([
            ...clientMap.substring(i * (tunnel_1.default.originalMap.length - 1), (tunnel_1.default.originalMap.length - 1) * (i + 1)),
        ]);
    }
    res.send({
        clientMap: clientMap,
        serverMap: serverMap.join(''),
        tunnelLock: tunnelLock,
    });
};
//# sourceMappingURL=index.js.map