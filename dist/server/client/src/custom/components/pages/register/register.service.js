"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let RegisterService = class RegisterService {
    constructor(pageFormlyService) {
        this.pageFormlyService = pageFormlyService;
        this.fields = [
            {
                key: 'username',
                type: 'input',
                templateOptions: {
                    label: 'Username',
                    placeholder: 'Enter username',
                    required: true,
                },
                validators: {
                    minLength: this.pageFormlyService.minLengthValidator(6),
                    required: this.pageFormlyService.requiredValidator,
                },
            },
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
            {
                key: 'role',
                type: 'select',
                templateOptions: {
                    label: 'Role',
                    required: true,
                },
                hooks: {
                    onInit: (field) => {
                        field.templateOptions.options = [
                            {
                                value: null,
                                label: 'Select',
                            },
                            {
                                value: 'admin',
                                label: 'Admin',
                            },
                            {
                                value: 'user',
                                label: 'User',
                            },
                        ];
                    },
                },
                validators: {
                    min: this.pageFormlyService.minValidator(1),
                    required: this.pageFormlyService.requiredValidator,
                },
            },
        ];
    }
};
RegisterService = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map