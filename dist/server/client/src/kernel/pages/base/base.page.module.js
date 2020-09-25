"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePageModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const material_module_1 = require("@kernel/material/material.module");
let BasePageModule = class BasePageModule {
};
BasePageModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [],
        imports: [material_module_1.MaterialModule],
        exports: [material_module_1.MaterialModule],
    })
], BasePageModule);
exports.BasePageModule = BasePageModule;
//# sourceMappingURL=base.page.module.js.map