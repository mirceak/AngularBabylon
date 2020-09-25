"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginContentComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const login_service_1 = require("@custom/components/pages/login/login.service");
let LoginContentComponent = class LoginContentComponent {
    constructor(loginService) {
        this.loginService = loginService;
        this.form = new forms_1.FormGroup({});
    }
    login() { }
};
LoginContentComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-login-content',
        templateUrl: './login-content.component.html',
        styleUrls: ['./login-content.component.scss'],
        providers: [login_service_1.LoginService],
    })
], LoginContentComponent);
exports.LoginContentComponent = LoginContentComponent;
//# sourceMappingURL=login-content.component.js.map