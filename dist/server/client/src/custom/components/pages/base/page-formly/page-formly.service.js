"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageFormlyService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let PageFormlyService = class PageFormlyService {
    constructor() {
        this.requiredValidator = {
            expression: (c) => forms_1.Validators.required(c) == null,
            message: (error, field) => `"${field.templateOptions.label}" field is required`,
        };
        this.emailValidator = {
            expression: (c) => forms_1.Validators.email(c) == null,
            message: (error, field) => `"${field.templateOptions.label}" needs to be a valid email`,
        };
        this.minLengthValidator = (count) => {
            return {
                expression: (c) => forms_1.Validators.minLength(count)(c) == null,
                message: (error, field) => `"${field.templateOptions.label}" needs to be at least ${count} characters long`,
            };
        };
        this.minValidator = (value) => {
            return {
                expression: (c) => forms_1.Validators.min(value)(c) == null,
                message: (error, field) => `"${field.templateOptions.label}" needs to be minimum ${value}`,
            };
        };
    }
};
PageFormlyService = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    })
], PageFormlyService);
exports.PageFormlyService = PageFormlyService;
//# sourceMappingURL=page-formly.service.js.map