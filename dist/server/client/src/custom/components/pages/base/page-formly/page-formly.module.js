"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageFormlyModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_form_page_module_1 = require("@kernel/pages/base/base.form-page.module");
const page_formly_directive_1 = require("@custom/components/pages/base/page-formly/page-formly.directive");
const core_2 = require("@ngx-formly/core");
const material_1 = require("@ngx-formly/material");
const forms_1 = require("@angular/forms");
const page_simple_module_1 = require("../page-simple/page-simple.module");
const form_simple_component_1 = require("@custom/components/pages/base/page-formly/forms/form-simple/form-simple.component");
let PageFormlyModule = class PageFormlyModule {
};
PageFormlyModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [page_formly_directive_1.PageFormlyDirective, form_simple_component_1.FormSimpleComponent],
        imports: [
            page_simple_module_1.PageSimpleModule,
            forms_1.ReactiveFormsModule,
            base_form_page_module_1.BaseFormPageModule,
            core_2.FormlyModule.forRoot({ extras: { lazyRender: true } }),
            material_1.FormlyMaterialModule,
        ],
        exports: [
            forms_1.ReactiveFormsModule,
            core_2.FormlyModule,
            material_1.FormlyMaterialModule,
            page_simple_module_1.PageSimpleModule,
            form_simple_component_1.FormSimpleComponent,
        ],
    })
], PageFormlyModule);
exports.PageFormlyModule = PageFormlyModule;
//# sourceMappingURL=page-formly.module.js.map