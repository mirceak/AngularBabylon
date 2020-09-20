"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, '../client')));
app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
//# sourceMappingURL=index.js.map