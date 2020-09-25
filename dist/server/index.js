"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const index_controller_1 = require("./client/src/kernel/backend/controllers/index.controller");
const controllerParser = (controllers) => {
    Object.keys(controllers).map((key) => {
        let ctrl = new controllers[key]();
        console.log(ctrl);
    });
};
controllerParser(index_controller_1.default);
console.log(3);
const app = express();
app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(app.get('port'), () => console.log(`An2gular F1ull Ssstack listening ons port ${app.get('port')}`));
//# sourceMappingURL=index.js.map