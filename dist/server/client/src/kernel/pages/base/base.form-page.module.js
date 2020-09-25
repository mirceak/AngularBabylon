"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFormPageModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const core_2 = require("@ngx-formly/core");
const material_1 = require("@ngx-formly/material");
let BaseFormPageModule = class BaseFormPageModule {
};
BaseFormPageModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            core_2.FormlyModule.forRoot({ extras: { lazyRender: true } }),
            material_1.FormlyMaterialModule,
        ],
        exports: [core_2.FormlyModule, material_1.FormlyMaterialModule],
    })
], BaseFormPageModule);
exports.BaseFormPageModule = BaseFormPageModule;
//# sourceMappingURL=base.form-page.module.js.map