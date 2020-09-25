"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const home_component_1 = require("./home.component");
const routes = [
    {
        path: '',
        component: home_component_1.HomeComponent,
    },
];
let HomeRoutingModule = class HomeRoutingModule {
};
HomeRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], HomeRoutingModule);
exports.HomeRoutingModule = HomeRoutingModule;
//# sourceMappingURL=home-routing.module.js.map