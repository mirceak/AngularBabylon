"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const controllerParser = (controllers) => {
    Object.keys(controllers).map((controller, key) => {
        console.log(controller, key);
    });
};
// controllerParser(Controllers);
console.log(21113);
const app = express();
app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(app.get('port'), () => console.log(`An2gular F1ull Ssstack listening ons port ${app.get('port')}`));
//# sourceMappingURL=index.js.map