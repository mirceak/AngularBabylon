"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHomeModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const page_home_routing_module_1 = require("@final/pages/home/page.home-routing.module");
const home_module_1 = require("@custom/components/pages/home/home.module");
let PageHomeModule = class PageHomeModule {
};
PageHomeModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [home_module_1.HomeModule, common_1.CommonModule, page_home_routing_module_1.PageHomeRoutingModule],
    })
], PageHomeModule);
exports.PageHomeModule = PageHomeModule;
//# sourceMappingURL=page.home.module.js.map