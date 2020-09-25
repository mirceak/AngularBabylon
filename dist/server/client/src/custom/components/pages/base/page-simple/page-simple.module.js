"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSimpleModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const nav_list_simple_component_1 = require("@custom/components/nav/nav-list-simple/nav-list-simple.component");
const layout_simple_component_1 = require("@custom/components/layouts/layout-simple/layout-simple.component");
const base_page_module_1 = require("@kernel/pages/base/base.page.module");
const page_simple_component_1 = require("@custom/components/pages/base/page-simple/page-simple.component");
let PageSimpleModule = class PageSimpleModule {
};
PageSimpleModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [layout_simple_component_1.LayoutSimpleComponent, page_simple_component_1.PageSimpleComponent, nav_list_simple_component_1.NavListSimpleComponent],
        imports: [router_1.RouterModule, base_page_module_1.BasePageModule],
        exports: [
            base_page_module_1.BasePageModule,
            layout_simple_component_1.LayoutSimpleComponent,
            page_simple_component_1.PageSimpleComponent,
            nav_list_simple_component_1.NavListSimpleComponent,
        ],
    })
], PageSimpleModule);
exports.PageSimpleModule = PageSimpleModule;
//# sourceMappingURL=page-simple.module.js.map