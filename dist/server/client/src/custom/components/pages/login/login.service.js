"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let LoginService = class LoginService {
    constructor(pageFormlyService) {
        this.pageFormlyService = pageFormlyService;
        this.fields = [
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    label: 'Email',
                    placeholder: 'Enter email',
                    required: true,
                },
                validators: {
                    email: this.pageFormlyService.emailValidator,
                    required: this.pageFormlyService.requiredValidator,
                },
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    label: 'Password',
                    required: true,
                },
                validators: {
                    minLength: this.pageFormlyService.minLengthValidator(6),
                    required: this.pageFormlyService.requiredValidator,
                },
            },
        ];
    }
};
LoginService = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    })
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map