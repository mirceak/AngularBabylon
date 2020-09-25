"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLoginRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const routes = [
    {
        path: "",
        loadChildren: () => Promise.resolve().then(() => require('@custom/components/pages/login/login.module')).then(m => m.LoginModule)
    },
    {
        path: "register",
        loadChildren: () => Promise.resolve().then(() => require('@custom/components/pages/login/login.module')).then(m => m.LoginModule)
    }
];
let PageLoginRoutingModule = class PageLoginRoutingModule {
};
PageLoginRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], PageLoginRoutingModule);
exports.PageLoginRoutingModule = PageLoginRoutingModule;
//# sourceMappingURL=page.login-routing.module.js.map