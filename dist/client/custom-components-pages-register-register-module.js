(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["custom-components-pages-register-register-module"],{

/***/ "./src/custom/components/pages/register/register-content/register-content.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/custom/components/pages/register/register-content/register-content.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: RegisterContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterContentComponent", function() { return RegisterContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _custom_components_pages_register_register_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/register/register.service */ "./src/custom/components/pages/register/register.service.ts");
/* harmony import */ var _custom_entities_user_service_entity_service_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/entities/user/service/entity.service.user */ "./src/custom/entities/user/service/entity.service.user.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @custom/components/pages/shared/forms/form-simple/form-simple.component */ "./src/custom/components/pages/shared/forms/form-simple/form-simple.component.ts");









class RegisterContentComponent {
    constructor(registerService, entityServiceUser, router) {
        this.registerService = registerService;
        this.entityServiceUser = entityServiceUser;
        this.router = router;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({});
    }
    register() {
        this.entityServiceUser.register(this.form.value).subscribe((res) => {
            this.router.navigate(['/login']);
        }, (error) => console.log(error));
    }
}
RegisterContentComponent.ɵfac = function RegisterContentComponent_Factory(t) { return new (t || RegisterContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_custom_components_pages_register_register_service__WEBPACK_IMPORTED_MODULE_2__["RegisterService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_custom_entities_user_service_entity_service_user__WEBPACK_IMPORTED_MODULE_3__["EntityServiceUser"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
RegisterContentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegisterContentComponent, selectors: [["app-register-content"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_custom_components_pages_register_register_service__WEBPACK_IMPORTED_MODULE_2__["RegisterService"]])], decls: 5, vars: 4, consts: [[3, "form", "fields", "submitLabel", "submitIcon", "onSubmit"]], template: function RegisterContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "app-form-simple", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSubmit", function RegisterContentComponent_Template_app_form_simple_onSubmit_4_listener() { return ctx.register(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx.form)("fields", ctx.registerService.fields)("submitLabel", "Register")("submitIcon", "follow_the_signs");
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardTitle"], _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__["FormSimpleComponent"]], styles: [".mat-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jdXN0b20vY29tcG9uZW50cy9wYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci1jb250ZW50L3JlZ2lzdGVyLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2N1c3RvbS9jb21wb25lbnRzL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLWNvbnRlbnQvcmVnaXN0ZXItY29udGVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtY2FyZCB7XG4gICAgcGFkZGluZzogMjRweDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterContentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-register-content',
                templateUrl: './register-content.component.html',
                styleUrls: ['./register-content.component.scss'],
                providers: [_custom_components_pages_register_register_service__WEBPACK_IMPORTED_MODULE_2__["RegisterService"]],
            }]
    }], function () { return [{ type: _custom_components_pages_register_register_service__WEBPACK_IMPORTED_MODULE_2__["RegisterService"] }, { type: _custom_entities_user_service_entity_service_user__WEBPACK_IMPORTED_MODULE_3__["EntityServiceUser"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/custom/components/pages/register/register-routing.module.ts":
/*!*************************************************************************!*\
  !*** ./src/custom/components/pages/register/register-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: RegisterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterRoutingModule", function() { return RegisterRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _custom_components_pages_register_register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/register/register.component */ "./src/custom/components/pages/register/register.component.ts");





const routes = [
    {
        path: "",
        component: _custom_components_pages_register_register_component__WEBPACK_IMPORTED_MODULE_2__["RegisterComponent"]
    }
];
class RegisterRoutingModule {
}
RegisterRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: RegisterRoutingModule });
RegisterRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function RegisterRoutingModule_Factory(t) { return new (t || RegisterRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RegisterRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/custom/components/pages/register/register.component.ts":
/*!********************************************************************!*\
  !*** ./src/custom/components/pages/register/register.component.ts ***!
  \********************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _custom_components_pages_shared_base_page_simple_page_simple_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-simple/page-simple.component */ "./src/custom/components/pages/shared/base/page-simple/page-simple.component.ts");
/* harmony import */ var _custom_components_pages_shared_navs_nav_list_simple_nav_list_simple_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/shared/navs/nav-list-simple/nav-list-simple.component */ "./src/custom/components/pages/shared/navs/nav-list-simple/nav-list-simple.component.ts");
/* harmony import */ var _custom_components_pages_register_register_content_register_content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/register/register-content/register-content.component */ "./src/custom/components/pages/register/register-content/register-content.component.ts");





class RegisterComponent {
    constructor() { }
    ngOnInit() {
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(); };
RegisterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegisterComponent, selectors: [["app-register"]], decls: 3, vars: 0, consts: [["appPageFormly", ""], ["nav-list", ""], ["content", ""]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-page-simple", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-nav-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-register-content", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_custom_components_pages_shared_base_page_simple_page_simple_component__WEBPACK_IMPORTED_MODULE_1__["PageSimpleComponent"], _custom_components_pages_shared_navs_nav_list_simple_nav_list_simple_component__WEBPACK_IMPORTED_MODULE_2__["NavListSimpleComponent"], _custom_components_pages_register_register_content_register_content_component__WEBPACK_IMPORTED_MODULE_3__["RegisterContentComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY3VzdG9tL2NvbXBvbmVudHMvcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-register',
                templateUrl: './register.component.html',
                styleUrls: ['./register.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/custom/components/pages/register/register.module.ts":
/*!*****************************************************************!*\
  !*** ./src/custom/components/pages/register/register.module.ts ***!
  \*****************************************************************/
/*! exports provided: RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _custom_components_pages_register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/register/register.component */ "./src/custom/components/pages/register/register.component.ts");
/* harmony import */ var _custom_components_pages_register_register_content_register_content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/register/register-content/register-content.component */ "./src/custom/components/pages/register/register-content/register-content.component.ts");
/* harmony import */ var _custom_components_pages_register_register_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/register/register-routing.module */ "./src/custom/components/pages/register/register-routing.module.ts");
/* harmony import */ var _custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-formly/page-formly.module */ "./src/custom/components/pages/shared/base/page-formly/page-formly.module.ts");






class RegisterModule {
}
RegisterModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: RegisterModule });
RegisterModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function RegisterModule_Factory(t) { return new (t || RegisterModule)(); }, imports: [[_custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_4__["PageFormlyModule"], _custom_components_pages_register_register_routing_module__WEBPACK_IMPORTED_MODULE_3__["RegisterRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RegisterModule, { declarations: [_custom_components_pages_register_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"], _custom_components_pages_register_register_content_register_content_component__WEBPACK_IMPORTED_MODULE_2__["RegisterContentComponent"]], imports: [_custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_4__["PageFormlyModule"], _custom_components_pages_register_register_routing_module__WEBPACK_IMPORTED_MODULE_3__["RegisterRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_custom_components_pages_register_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"], _custom_components_pages_register_register_content_register_content_component__WEBPACK_IMPORTED_MODULE_2__["RegisterContentComponent"]],
                imports: [_custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_4__["PageFormlyModule"], _custom_components_pages_register_register_routing_module__WEBPACK_IMPORTED_MODULE_3__["RegisterRoutingModule"]],
                exports: [],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/custom/components/pages/register/register.service.ts":
/*!******************************************************************!*\
  !*** ./src/custom/components/pages/register/register.service.ts ***!
  \******************************************************************/
/*! exports provided: RegisterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterService", function() { return RegisterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _custom_components_pages_shared_base_page_formly_page_formly_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-formly/page-formly.service */ "./src/custom/components/pages/shared/base/page-formly/page-formly.service.ts");



class RegisterService {
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
}
RegisterService.ɵfac = function RegisterService_Factory(t) { return new (t || RegisterService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_custom_components_pages_shared_base_page_formly_page_formly_service__WEBPACK_IMPORTED_MODULE_1__["PageFormlyService"])); };
RegisterService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RegisterService, factory: RegisterService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _custom_components_pages_shared_base_page_formly_page_formly_service__WEBPACK_IMPORTED_MODULE_1__["PageFormlyService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=custom-components-pages-register-register-module.js.map