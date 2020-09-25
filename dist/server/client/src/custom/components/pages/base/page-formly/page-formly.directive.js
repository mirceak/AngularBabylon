"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageFormlyDirective = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const page_formly_service_1 = require("./page-formly.service");
let PageFormlyDirective = class PageFormlyDirective {
    constructor(pageFormlyService) { }
};
PageFormlyDirective = tslib_1.__decorate([
    core_1.Directive({
        selector: '[appPageFormly]',
        providers: [page_formly_service_1.PageFormlyService],
    })
], PageFormlyDirective);
exports.PageFormlyDirective = PageFormlyDirective;
//# sourceMappingURL=page-formly.directive.js.map