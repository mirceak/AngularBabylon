"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const page_formly_module_1 = require("@custom/components/pages/base/page-formly/page-formly.module");
const login_component_1 = require("./login.component");
const login_routing_module_1 = require("./login-routing.module");
const login_content_component_1 = require("./login-content/login-content.component");
let LoginModule = class LoginModule {
};
LoginModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [login_component_1.LoginComponent, login_content_component_1.LoginContentComponent],
        imports: [page_formly_module_1.PageFormlyModule, login_routing_module_1.LoginRoutingModule],
        exports: [],
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map