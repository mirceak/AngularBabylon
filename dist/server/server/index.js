"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongo_1 = require("./mongo");
const base_controller_index_1 = require("@kernel/backend/controllers/base.controller.index");
const app = express();
async function main() {
    try {
        await mongo_1.default();
        app.set('port', 3000);
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use('/', express.static(path.join(__dirname, '../../client')));
        const controllerParser = (controllers) => {
            Object.keys(controllers).map((key) => {
                let ctrl = new controllers[key]();
                app.use('/api', ctrl.getRouter());
            });
        };
        controllerParser(base_controller_index_1.default);
        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/index.html'));
        });
        app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
    }
    catch (err) {
        console.error(err);
    }
}
main();
//# sourceMappingURL=index.js.map