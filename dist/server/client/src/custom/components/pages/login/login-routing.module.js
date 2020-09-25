"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const login_component_1 = require("./login.component");
const routes = [
    {
        path: '',
        component: login_component_1.LoginComponent,
    },
    {
        path: 'register',
        loadChildren: () => Promise.resolve().then(() => require('@custom/components/pages/register/register.module')).then(m => m.RegisterModule)
    },
];
let LoginRoutingModule = class LoginRoutingModule {
};
LoginRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], LoginRoutingModule);
exports.LoginRoutingModule = LoginRoutingModule;
//# sourceMappingURL=login-routing.module.js.map