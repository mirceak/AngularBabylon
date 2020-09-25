"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterContentComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const register_service_1 = require("../register.service");
let RegisterContentComponent = class RegisterContentComponent {
    constructor(registerService) {
        this.registerService = registerService;
        this.form = new forms_1.FormGroup({});
    }
};
RegisterContentComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-register-content',
        templateUrl: './register-content.component.html',
        styleUrls: ['./register-content.component.scss'],
        providers: [register_service_1.RegisterService],
    })
], RegisterContentComponent);
exports.RegisterContentComponent = RegisterContentComponent;
//# sourceMappingURL=register-content.component.js.map