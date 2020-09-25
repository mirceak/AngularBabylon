"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const register_component_1 = require("./register.component");
const routes = [
    {
        path: "",
        component: register_component_1.RegisterComponent
    }
];
let RegisterRoutingModule = class RegisterRoutingModule {
};
RegisterRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], RegisterRoutingModule);
exports.RegisterRoutingModule = RegisterRoutingModule;
//# sourceMappingURL=register-routing.module.js.map