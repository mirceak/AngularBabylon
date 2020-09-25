"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHomeRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const routes = [
    {
        path: '',
        loadChildren: () => Promise.resolve().then(() => require('@custom/components/pages/home/home.module')).then(m => m.HomeModule)
    },
];
let PageHomeRoutingModule = class PageHomeRoutingModule {
};
PageHomeRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], PageHomeRoutingModule);
exports.PageHomeRoutingModule = PageHomeRoutingModule;
//# sourceMappingURL=page.home-routing.module.js.map