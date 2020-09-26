"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express = require("express");
const path = require("path");
const mongo_1 = require("./mongo");
const index_controller_1 = require("@kernel/backend/controllers/index.controller");
const app = express();
async function main() {
    try {
        await mongo_1.default();
        app.set('port', 3000);
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use('/', express.static(path.join(__dirname, '../../client')));
        const controllerParser = (controllers) => {
            Object.keys(controllers).map((key) => {
                let ctrl = new controllers[key]();
                app.use('/api', ctrl.getRouter());
            });
        };
        controllerParser(index_controller_1.default);
        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/index.html'));
        });
        app.listen(app.get('port'), () => console.log(`An2gular F1ull Ssstack listening ons port ${app.get('port')}`));
    }
    catch (err) {
        console.error(err);
    }
}
main();
//# sourceMappingURL=index.js.map