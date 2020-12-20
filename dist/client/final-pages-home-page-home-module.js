(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["final-pages-home-page-home-module"],{

/***/ "7s0r":
/*!**************************************************!*\
  !*** ./src/final/pages/home/page.home.module.ts ***!
  \**************************************************/
/*! exports provided: PageHomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageHomeModule", function() { return PageHomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _final_pages_home_page_home_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @final/pages/home/page.home-routing.module */ "MmdI");
/* harmony import */ var _custom_components_pages_home_home_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/home/home.module */ "Y6gx");





class PageHomeModule {
}
PageHomeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PageHomeModule });
PageHomeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PageHomeModule_Factory(t) { return new (t || PageHomeModule)(); }, imports: [[_custom_components_pages_home_home_module__WEBPACK_IMPORTED_MODULE_3__["HomeModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _final_pages_home_page_home_routing_module__WEBPACK_IMPORTED_MODULE_2__["PageHomeRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PageHomeModule, { imports: [_custom_components_pages_home_home_module__WEBPACK_IMPORTED_MODULE_3__["HomeModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _final_pages_home_page_home_routing_module__WEBPACK_IMPORTED_MODULE_2__["PageHomeRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageHomeModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_custom_components_pages_home_home_module__WEBPACK_IMPORTED_MODULE_3__["HomeModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _final_pages_home_page_home_routing_module__WEBPACK_IMPORTED_MODULE_2__["PageHomeRoutingModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "G4QH":
/*!*****************************************************************!*\
  !*** ./src/custom/components/pages/home/home-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _custom_components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/home/home.component */ "ZtLB");





const routes = [
    {
        path: '',
        component: _custom_components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"],
    },
];
class HomeRoutingModule {
}
HomeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: HomeRoutingModule });
HomeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function HomeRoutingModule_Factory(t) { return new (t || HomeRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HomeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "Hxem":
/*!*********************************************************************************!*\
  !*** ./src/custom/components/pages/home/home-content/home-content.component.ts ***!
  \*********************************************************************************/
/*! exports provided: HomeContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeContentComponent", function() { return HomeContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class HomeContentComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeContentComponent.ɵfac = function HomeContentComponent_Factory(t) { return new (t || HomeContentComponent)(); };
HomeContentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeContentComponent, selectors: [["app-home-content"]], decls: 2, vars: 0, template: function HomeContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "hellos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLWNvbnRlbnQuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeContentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home-content',
                templateUrl: './home-content.component.html',
                styleUrls: ['./home-content.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "MmdI":
/*!**********************************************************!*\
  !*** ./src/final/pages/home/page.home-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: PageHomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageHomeRoutingModule", function() { return PageHomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [
    {
        path: '',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @custom/components/pages/home/home.module */ "Y6gx")).then(m => m.HomeModule)
    },
];
class PageHomeRoutingModule {
}
PageHomeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PageHomeRoutingModule });
PageHomeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PageHomeRoutingModule_Factory(t) { return new (t || PageHomeRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PageHomeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageHomeRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "Y6gx":
/*!*********************************************************!*\
  !*** ./src/custom/components/pages/home/home.module.ts ***!
  \*********************************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-simple/page-simple.module */ "/uTn");
/* harmony import */ var _custom_components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/home/home.component */ "ZtLB");
/* harmony import */ var _custom_components_pages_home_home_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/home/home-routing.module */ "G4QH");
/* harmony import */ var _custom_components_pages_home_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @custom/components/pages/home/home-content/home-content.component */ "Hxem");






class HomeModule {
}
HomeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: HomeModule });
HomeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function HomeModule_Factory(t) { return new (t || HomeModule)(); }, imports: [[_custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__["PageSimpleModule"], _custom_components_pages_home_home_routing_module__WEBPACK_IMPORTED_MODULE_3__["HomeRoutingModule"]], _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__["PageSimpleModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HomeModule, { declarations: [_custom_components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], _custom_components_pages_home_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_4__["HomeContentComponent"]], imports: [_custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__["PageSimpleModule"], _custom_components_pages_home_home_routing_module__WEBPACK_IMPORTED_MODULE_3__["HomeRoutingModule"]], exports: [_custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__["PageSimpleModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_custom_components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], _custom_components_pages_home_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_4__["HomeContentComponent"]],
                imports: [_custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__["PageSimpleModule"], _custom_components_pages_home_home_routing_module__WEBPACK_IMPORTED_MODULE_3__["HomeRoutingModule"]],
                exports: [_custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_1__["PageSimpleModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "ZtLB":
/*!************************************************************!*\
  !*** ./src/custom/components/pages/home/home.component.ts ***!
  \************************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _custom_components_pages_shared_base_page_simple_page_simple_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-simple/page-simple.component */ "aDzp");
/* harmony import */ var _custom_components_pages_shared_navs_nav_list_simple_nav_list_simple_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/shared/navs/nav-list-simple/nav-list-simple.component */ "usSO");
/* harmony import */ var _custom_components_pages_home_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/home/home-content/home-content.component */ "Hxem");





class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 3, vars: 0, consts: [["nav-list", ""], ["content", ""]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-page-simple");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-nav-list", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-home-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_custom_components_pages_shared_base_page_simple_page_simple_component__WEBPACK_IMPORTED_MODULE_1__["PageSimpleComponent"], _custom_components_pages_shared_navs_nav_list_simple_nav_list_simple_component__WEBPACK_IMPORTED_MODULE_2__["NavListSimpleComponent"], _custom_components_pages_home_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_3__["HomeContentComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.scss'],
            }]
    }], function () { return []; }, null); })();


/***/ })

}]);
//# sourceMappingURL=final-pages-home-page-home-module.js.map