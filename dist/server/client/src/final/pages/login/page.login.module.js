"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLoginModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const page_login_routing_module_1 = require("@final/pages/login/page.login-routing.module");
const login_module_1 = require("@custom/components/pages/login/login.module");
let PageLoginModule = class PageLoginModule {
};
PageLoginModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [login_module_1.LoginModule, common_1.CommonModule, page_login_routing_module_1.PageLoginRoutingModule],
    })
], PageLoginModule);
exports.PageLoginModule = PageLoginModule;
//# sourceMappingURL=page.login.module.js.map