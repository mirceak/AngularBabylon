"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutSimpleComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let LayoutSimpleComponent = class LayoutSimpleComponent {
    constructor(changeDetectorRef, media) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener("change", this._mobileQueryListener);
    }
    ngOnDestroy() {
        this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
    }
};
LayoutSimpleComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-layout-simple',
        templateUrl: './layout-simple.component.html',
        styleUrls: ['./layout-simple.component.scss'],
    })
], LayoutSimpleComponent);
exports.LayoutSimpleComponent = LayoutSimpleComponent;
//# sourceMappingURL=layout-simple.component.js.map