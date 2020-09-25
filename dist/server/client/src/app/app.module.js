"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const animations_1 = require("@angular/platform-browser/animations");
const forms_1 = require("@angular/forms");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.ReactiveFormsModule,
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map