"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSimpleComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let FormSimpleComponent = class FormSimpleComponent {
    constructor() {
        this.submit = new core_1.EventEmitter();
    }
};
tslib_1.__decorate([
    core_1.Output()
], FormSimpleComponent.prototype, "submit", void 0);
tslib_1.__decorate([
    core_1.Input()
], FormSimpleComponent.prototype, "form", void 0);
tslib_1.__decorate([
    core_1.Input()
], FormSimpleComponent.prototype, "fields", void 0);
tslib_1.__decorate([
    core_1.Input()
], FormSimpleComponent.prototype, "submitLabel", void 0);
tslib_1.__decorate([
    core_1.Input()
], FormSimpleComponent.prototype, "submitIcon", void 0);
FormSimpleComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-form-simple',
        templateUrl: './form-simple.component.html',
        styleUrls: ['./form-simple.component.scss']
    })
], FormSimpleComponent);
exports.FormSimpleComponent = FormSimpleComponent;
//# sourceMappingURL=form-simple.component.js.map