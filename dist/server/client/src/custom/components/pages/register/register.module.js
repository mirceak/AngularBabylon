"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const register_component_1 = require("@custom/components/pages/register/register.component");
const register_content_component_1 = require("@custom/components/pages/register/register-content/register-content.component");
const register_routing_module_1 = require("./register-routing.module");
const page_formly_module_1 = require("../base/page-formly/page-formly.module");
let RegisterModule = class RegisterModule {
};
RegisterModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [register_component_1.RegisterComponent, register_content_component_1.RegisterContentComponent],
        imports: [page_formly_module_1.PageFormlyModule, register_routing_module_1.RegisterRoutingModule],
        exports: [],
    })
], RegisterModule);
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=register.module.js.map