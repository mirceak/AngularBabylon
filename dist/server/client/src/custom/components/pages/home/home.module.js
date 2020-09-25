"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const page_simple_module_1 = require("@custom/components/pages/base/page-simple/page-simple.module");
const home_component_1 = require("@custom/components/pages/home/home.component");
const home_routing_module_1 = require("@custom/components/pages/home/home-routing.module");
const home_content_component_1 = require("@custom/components/pages/home/home-content/home-content.component");
let HomeModule = class HomeModule {
};
HomeModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [home_component_1.HomeComponent, home_content_component_1.HomeContentComponent],
        imports: [page_simple_module_1.PageSimpleModule, home_routing_module_1.HomeRoutingModule],
        exports: [page_simple_module_1.PageSimpleModule],
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map