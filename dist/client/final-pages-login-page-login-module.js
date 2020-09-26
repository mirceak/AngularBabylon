(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["final-pages-login-page-login-module"],{

/***/ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core-select.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core-select.js ***!
  \***************************************************************************************/
/*! exports provided: FormlySelectModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlySelectModule", function() { return FormlySelectModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return FormlySelectOptionsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

class FormlySelectOptionsPipe {
    /**
     * @param {?} options
     * @param {?=} field
     * @return {?}
     */
    transform(options, field) {
        if (!(options instanceof rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])) {
            options = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(options);
        }
        return ((/** @type {?} */ (options))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        value => this.toOptions(value, field || {}))));
    }
    /**
     * @private
     * @param {?} options
     * @param {?} field
     * @return {?}
     */
    toOptions(options, field) {
        /** @type {?} */
        const gOptions = [];
        /** @type {?} */
        const groups = {};
        /** @type {?} */
        const to = field.templateOptions || {};
        to._flatOptions = true;
        options.map((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            if (!this.getGroupProp(option, to)) {
                gOptions.push(this.toOption(option, to));
            }
            else {
                to._flatOptions = false;
                if (!groups[this.getGroupProp(option, to)]) {
                    groups[this.getGroupProp(option, to)] = [];
                    gOptions.push({
                        label: this.getGroupProp(option, to),
                        group: groups[this.getGroupProp(option, to)],
                    });
                }
                groups[this.getGroupProp(option, to)].push(this.toOption(option, to));
            }
        }));
        return gOptions;
    }
    /**
     * @private
     * @param {?} item
     * @param {?} to
     * @return {?}
     */
    toOption(item, to) {
        return {
            label: this.getLabelProp(item, to),
            value: this.getValueProp(item, to),
            disabled: this.getDisabledProp(item, to) || false,
        };
    }
    /**
     * @private
     * @param {?} item
     * @param {?} to
     * @return {?}
     */
    getLabelProp(item, to) {
        if (typeof to.labelProp === 'function') {
            return to.labelProp(item);
        }
        if (this.shouldUseLegacyOption(item, to)) {
            console.warn(`NgxFormly: legacy select option '{key, value}' is deprecated since v5.5, use '{value, label}' instead.`);
            return item.value;
        }
        return item[to.labelProp || 'label'];
    }
    /**
     * @private
     * @param {?} item
     * @param {?} to
     * @return {?}
     */
    getValueProp(item, to) {
        if (typeof to.valueProp === 'function') {
            return to.valueProp(item);
        }
        if (this.shouldUseLegacyOption(item, to)) {
            return item.key;
        }
        return item[to.valueProp || 'value'];
    }
    /**
     * @private
     * @param {?} item
     * @param {?} to
     * @return {?}
     */
    getDisabledProp(item, to) {
        if (typeof to.disabledProp === 'function') {
            return to.disabledProp(item);
        }
        return item[to.disabledProp || 'disabled'];
    }
    /**
     * @private
     * @param {?} item
     * @param {?} to
     * @return {?}
     */
    getGroupProp(item, to) {
        if (typeof to.groupProp === 'function') {
            return to.groupProp(item);
        }
        return item[to.groupProp || 'group'];
    }
    /**
     * @private
     * @param {?} item
     * @param {?} to
     * @return {?}
     */
    shouldUseLegacyOption(item, to) {
        return !to.valueProp
            && !to.labelProp
            && item != null
            && typeof item === 'object'
            && 'key' in item
            && 'value' in item;
    }
}
FormlySelectOptionsPipe.ɵfac = function FormlySelectOptionsPipe_Factory(t) { return new (t || FormlySelectOptionsPipe)(); };
FormlySelectOptionsPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "formlySelectOptions", type: FormlySelectOptionsPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormlySelectOptionsPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{ name: 'formlySelectOptions' }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlySelectModule {
}
FormlySelectModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: FormlySelectModule });
FormlySelectModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function FormlySelectModule_Factory(t) { return new (t || FormlySelectModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FormlySelectModule, { declarations: [FormlySelectOptionsPipe], exports: [FormlySelectOptionsPipe] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormlySelectModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [FormlySelectOptionsPipe],
                exports: [FormlySelectOptionsPipe]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-core-select.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js ***!
  \********************************************************************************/
/*! exports provided: FormlyForm, FormlyField, FormlyAttributes, FORMLY_CONFIG, FormlyConfig, FormlyFormBuilder, FieldType, Field, FieldArrayType, FieldWrapper, FormlyModule, ɵdefineHiddenProp, ɵreverseDeepMerge, ɵgetFieldInitialValue, ɵclone, ɵwrapProperty, ɵa, ɵe, ɵh, ɵg, ɵf, ɵd, ɵb, ɵc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyForm", function() { return FormlyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyField", function() { return FormlyField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyAttributes", function() { return FormlyAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMLY_CONFIG", function() { return FORMLY_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyConfig", function() { return FormlyConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFormBuilder", function() { return FormlyFormBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return FieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldArrayType", function() { return FieldArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldWrapper", function() { return FieldWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyModule", function() { return FormlyModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵdefineHiddenProp", function() { return defineHiddenProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵreverseDeepMerge", function() { return reverseDeepMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵgetFieldInitialValue", function() { return getFieldInitialValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵclone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵwrapProperty", function() { return wrapProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return defaultFormlyConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return CoreExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return FieldExpressionExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return FieldFormExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return FieldValidationExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return FormlyTemplateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return FormlyGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return FormlyValidationMessage; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/@ngx-formly/core/node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} formId
 * @param {?} field
 * @param {?} index
 * @return {?}
 */





const _c0 = ["content"];
function FormlyForm_formly_field_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "formly-field", 2);
} if (rf & 2) {
    const field_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("form", field_r2.form)("options", field_r2.options)("model", field_r2.model)("field", field_r2);
} }
const _c1 = ["*"];
const _c2 = ["container"];
function FormlyField_ng_template_0_Template(rf, ctx) { }
const _c3 = ["fieldComponent"];
function FormlyGroup_formly_field_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "formly-field", 1);
} if (rf & 2) {
    const f_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("field", f_r1);
} }
function getFieldId(formId, field, index) {
    if (field.id)
        return field.id;
    /** @type {?} */
    let type = field.type;
    if (!type && field.template)
        type = 'template';
    return [formId, type, field.key, index].join('_');
}
/**
 * @param {?} field
 * @return {?}
 */
function getKeyPath(field) {
    if (!field.key) {
        return [];
    }
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!field._keyPath || field._keyPath.key !== field.key) {
        /** @type {?} */
        let path = [];
        if (typeof field.key === 'string') {
            /** @type {?} */
            const key = field.key.indexOf('[') === -1
                ? field.key
                : field.key.replace(/\[(\w+)\]/g, '.$1');
            path = key.indexOf('.') !== -1 ? key.split('.') : [key];
        }
        else if (Array.isArray(field.key)) {
            path = field.key.slice(0);
        }
        else {
            path = [`${field.key}`];
        }
        field._keyPath = { key: field.key, path };
    }
    return field._keyPath.path.slice(0);
}
/** @type {?} */
const FORMLY_VALIDATORS = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
/**
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
function assignFieldValue(field, value) {
    /** @type {?} */
    let paths = getKeyPath(field);
    if (paths.length === 0) {
        return;
    }
    if (value == null && field['autoClear'] && !field.formControl.parent) {
        /** @type {?} */
        const k = paths.pop();
        /** @type {?} */
        const m = paths.reduce((/**
         * @param {?} model
         * @param {?} path
         * @return {?}
         */
        (model, path) => model[path] || {}), field.parent.model);
        delete m[k];
        return;
    }
    while (field.parent) {
        field = field.parent;
        paths = [...getKeyPath(field), ...paths];
    }
    assignModelValue(field.model, paths, value);
}
/**
 * @param {?} model
 * @param {?} paths
 * @param {?} value
 * @return {?}
 */
function assignModelValue(model, paths, value) {
    for (let i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        const path = paths[i];
        if (!model[path] || !isObject(model[path])) {
            model[path] = /^\d+$/.test(paths[i + 1]) ? [] : {};
        }
        model = model[path];
    }
    model[paths[paths.length - 1]] = clone(value);
}
/**
 * @param {?} field
 * @return {?}
 */
function getFieldInitialValue(field) {
    /** @type {?} */
    let value = field.options['_initialModel'];
    /** @type {?} */
    let paths = getKeyPath(field);
    while (field.parent) {
        field = field.parent;
        paths = [...getKeyPath(field), ...paths];
    }
    for (const path of paths) {
        if (!value) {
            return undefined;
        }
        value = value[path];
    }
    return value;
}
/**
 * @param {?} field
 * @return {?}
 */
function getFieldValue(field) {
    /** @type {?} */
    let model = field.parent.model;
    for (const path of getKeyPath(field)) {
        if (!model) {
            return model;
        }
        model = model[path];
    }
    return model;
}
/**
 * @param {?} dest
 * @param {...?} args
 * @return {?}
 */
function reverseDeepMerge(dest, ...args) {
    args.forEach((/**
     * @param {?} src
     * @return {?}
     */
    src => {
        for (let srcArg in src) {
            if (isNullOrUndefined(dest[srcArg]) || isBlankString(dest[srcArg])) {
                dest[srcArg] = clone(src[srcArg]);
            }
            else if (objAndSameType(dest[srcArg], src[srcArg])) {
                reverseDeepMerge(dest[srcArg], src[srcArg]);
            }
        }
    }));
    return dest;
}
/**
 * @param {?} value
 * @return {?}
 */
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
/**
 * @param {?} value
 * @return {?}
 */
function isUndefined(value) {
    return value === undefined;
}
/**
 * @param {?} value
 * @return {?}
 */
function isBlankString(value) {
    return value === '';
}
/**
 * @param {?} value
 * @return {?}
 */
function isFunction(value) {
    return typeof (value) === 'function';
}
/**
 * @param {?} obj1
 * @param {?} obj2
 * @return {?}
 */
function objAndSameType(obj1, obj2) {
    return isObject(obj1) && isObject(obj2)
        && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2)
        && !(Array.isArray(obj1) || Array.isArray(obj2));
}
/**
 * @param {?} x
 * @return {?}
 */
function isObject(x) {
    return x != null && typeof x === 'object';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function';
}
/**
 * @param {?} value
 * @return {?}
 */
function clone(value) {
    if (!isObject(value)
        || Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["isObservable"])(value)
        || /* instanceof SafeHtmlImpl */ value.changingThisBreaksApplicationSecurity
        || ['RegExp', 'FileList', 'File', 'Blob'].indexOf(value.constructor.name) !== -1) {
        return value;
    }
    // https://github.com/moment/moment/blob/master/moment.js#L252
    if (value._isAMomentObject && isFunction(value.clone)) {
        return value.clone();
    }
    if (value instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["AbstractControl"]) {
        return null;
    }
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
        return value.slice(0).map((/**
         * @param {?} v
         * @return {?}
         */
        v => clone(v)));
    }
    // best way to clone a js object maybe
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    /** @type {?} */
    const proto = Object.getPrototypeOf(value);
    /** @type {?} */
    let c = Object.create(proto);
    c = Object.setPrototypeOf(c, proto);
    // need to make a deep copy so we dont use Object.assign
    // also Object.assign wont copy property descriptor exactly
    return Object.keys(value).reduce((/**
     * @param {?} newVal
     * @param {?} prop
     * @return {?}
     */
    (newVal, prop) => {
        /** @type {?} */
        const propDesc = Object.getOwnPropertyDescriptor(value, prop);
        if (propDesc.get) {
            Object.defineProperty(newVal, prop, propDesc);
        }
        else {
            newVal[prop] = clone(value[prop]);
        }
        return newVal;
    }), c);
}
/**
 * @param {?} field
 * @param {?} prop
 * @param {?} defaultValue
 * @return {?}
 */
function defineHiddenProp(field, prop, defaultValue) {
    Object.defineProperty(field, prop, { enumerable: false, writable: true, configurable: true });
    field[prop] = defaultValue;
}
/**
 * @template T
 * @param {?} o
 * @param {?} prop
 * @param {?} setFn
 * @return {?}
 */
function wrapProperty(o, prop, setFn) {
    if (!o._observers) {
        defineHiddenProp(o, '_observers', {});
    }
    if (!o._observers[prop]) {
        o._observers[prop] = [];
    }
    /** @type {?} */
    let fns = o._observers[prop];
    if (fns.indexOf(setFn) === -1) {
        fns.push(setFn);
        setFn({ currentValue: o[prop], firstChange: true });
        if (fns.length === 1) {
            defineHiddenProp(o, `___$${prop}`, o[prop]);
            Object.defineProperty(o, prop, {
                configurable: true,
                get: (/**
                 * @return {?}
                 */
                () => o[`___$${prop}`]),
                set: (/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                currentValue => {
                    if (currentValue !== o[`___$${prop}`]) {
                        /** @type {?} */
                        const previousValue = o[`___$${prop}`];
                        o[`___$${prop}`] = currentValue;
                        fns.forEach((/**
                         * @param {?} changeFn
                         * @return {?}
                         */
                        changeFn => changeFn({ previousValue, currentValue, firstChange: false })));
                    }
                }),
            });
        }
    }
    return (/**
     * @return {?}
     */
    () => fns.splice(fns.indexOf(setFn), 1));
}
/**
 * @param {?} form
 * @param {?} action
 * @return {?}
 */
function reduceFormUpdateValidityCalls(form, action) {
    /** @type {?} */
    const updateValidity = form._updateTreeValidity.bind(form);
    /** @type {?} */
    let updateValidityArgs = { called: false, emitEvent: false };
    form._updateTreeValidity = (/**
     * @param {?=} __0
     * @return {?}
     */
    ({ emitEvent } = { emitEvent: true }) => updateValidityArgs = { called: true, emitEvent: emitEvent || updateValidityArgs.emitEvent });
    action();
    updateValidityArgs.called && updateValidity({ emitEvent: updateValidityArgs.emitEvent });
    form._updateTreeValidity = updateValidity;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FORMLY_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('FORMLY_CONFIG');
/**
 * Maintains list of formly field directive types. This can be used to register new field templates.
 */
class FormlyConfig {
    constructor() {
        this.types = {};
        this.validators = {};
        this.wrappers = {};
        this.messages = {};
        this.templateManipulators = {
            preWrapper: [],
            postWrapper: [],
        };
        this.extras = {
            checkExpressionOn: 'changeDetectionCheck',
            lazyRender: false,
            showError: (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                return field.formControl && field.formControl.invalid && (field.formControl.touched || (field.options.parentForm && field.options.parentForm.submitted) || !!(field.field.validation && field.field.validation.show));
            }),
        };
        this.extensions = {};
    }
    /**
     * @param {?} config
     * @return {?}
     */
    addConfig(config) {
        if (config.types) {
            config.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            type => this.setType(type)));
        }
        if (config.validators) {
            config.validators.forEach((/**
             * @param {?} validator
             * @return {?}
             */
            validator => this.setValidator(validator)));
        }
        if (config.wrappers) {
            config.wrappers.forEach((/**
             * @param {?} wrapper
             * @return {?}
             */
            wrapper => this.setWrapper(wrapper)));
        }
        if (config.manipulators) {
            console.warn(`NgxFormly: passing 'manipulators' config is deprecated, use custom extension instead.`);
            config.manipulators.forEach((/**
             * @param {?} manipulator
             * @return {?}
             */
            manipulator => this.setManipulator(manipulator)));
        }
        if (config.validationMessages) {
            config.validationMessages.forEach((/**
             * @param {?} validation
             * @return {?}
             */
            validation => this.addValidatorMessage(validation.name, validation.message)));
        }
        if (config.extensions) {
            config.extensions.forEach((/**
             * @param {?} c
             * @return {?}
             */
            c => this.extensions[c.name] = c.extension));
        }
        if (config.extras) {
            this.extras = Object.assign({}, this.extras, config.extras);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setType(options) {
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => this.setType(option)));
        }
        else {
            if (!this.types[options.name]) {
                this.types[options.name] = (/** @type {?} */ ({ name: options.name }));
            }
            ['component', 'extends', 'defaultOptions'].forEach((/**
             * @param {?} prop
             * @return {?}
             */
            prop => {
                if (options.hasOwnProperty(prop)) {
                    this.types[options.name][prop] = options[prop];
                }
            }));
            if (options.wrappers) {
                options.wrappers.forEach((/**
                 * @param {?} wrapper
                 * @return {?}
                 */
                (wrapper) => this.setTypeWrapper(options.name, wrapper)));
            }
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getType(name) {
        if (!this.types[name]) {
            throw new Error(`[Formly Error] The type "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        this.mergeExtendedType(name);
        return this.types[name];
    }
    /**
     * @param {?=} field
     * @return {?}
     */
    getMergedField(field = {}) {
        /** @type {?} */
        const type = this.getType(field.type);
        if (type.defaultOptions) {
            reverseDeepMerge(field, type.defaultOptions);
        }
        /** @type {?} */
        const extendDefaults = type.extends && this.getType(type.extends).defaultOptions;
        if (extendDefaults) {
            reverseDeepMerge(field, extendDefaults);
        }
        if (field && field.optionsTypes) {
            field.optionsTypes.forEach((/**
             * @param {?} option
             * @return {?}
             */
            option => {
                /** @type {?} */
                const defaultOptions = this.getType(option).defaultOptions;
                if (defaultOptions) {
                    reverseDeepMerge(field, defaultOptions);
                }
            }));
        }
        /** @type {?} */
        const componentRef = this.resolveFieldTypeRef(field);
        if (componentRef && componentRef.instance && componentRef.instance.defaultOptions) {
            reverseDeepMerge(field, componentRef.instance.defaultOptions);
        }
        if (!field.wrappers && type.wrappers) {
            field.wrappers = [...type.wrappers];
        }
    }
    /**
     * \@internal
     * @param {?=} field
     * @return {?}
     */
    resolveFieldTypeRef(field = {}) {
        if (!field.type) {
            return null;
        }
        /** @type {?} */
        const type = this.getType(field.type);
        if (!type.component || type['_componentRef']) {
            return type['_componentRef'];
        }
        const { _resolver, _injector } = field.parent.options;
        /** @type {?} */
        const componentRef = _resolver
            .resolveComponentFactory(type.component)
            .create(_injector);
        defineHiddenProp(type, '_componentRef', componentRef);
        componentRef.destroy();
        return type['_componentRef'];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setWrapper(options) {
        this.wrappers[options.name] = options;
        if (options.types) {
            options.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            (type) => {
                this.setTypeWrapper(type, options.name);
            }));
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getWrapper(name) {
        if (!this.wrappers[name]) {
            throw new Error(`[Formly Error] The wrapper "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        return this.wrappers[name];
    }
    /**
     * @param {?} type
     * @param {?} name
     * @return {?}
     */
    setTypeWrapper(type, name) {
        if (!this.types[type]) {
            this.types[type] = (/** @type {?} */ ({}));
        }
        if (!this.types[type].wrappers) {
            this.types[type].wrappers = [];
        }
        if (this.types[type].wrappers.indexOf(name) === -1) {
            this.types[type].wrappers.push(name);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setValidator(options) {
        this.validators[options.name] = options;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getValidator(name) {
        if (!this.validators[name]) {
            throw new Error(`[Formly Error] The validator "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        return this.validators[name];
    }
    /**
     * @param {?} name
     * @param {?} message
     * @return {?}
     */
    addValidatorMessage(name, message) {
        this.messages[name] = message;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getValidatorMessage(name) {
        return this.messages[name];
    }
    /**
     * @param {?} manipulator
     * @return {?}
     */
    setManipulator(manipulator) {
        new manipulator.class()[manipulator.method](this);
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    mergeExtendedType(name) {
        if (!this.types[name].extends) {
            return;
        }
        /** @type {?} */
        const extendedType = this.getType(this.types[name].extends);
        if (!this.types[name].component) {
            this.types[name].component = extendedType.component;
        }
        if (!this.types[name].wrappers) {
            this.types[name].wrappers = extendedType.wrappers;
        }
    }
}
FormlyConfig.ɵfac = function FormlyConfig_Factory(t) { return new (t || FormlyConfig)(); };
FormlyConfig.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: FormlyConfig, factory: FormlyConfig.ɵfac, providedIn: 'root' });
/** @nocollapse */ FormlyConfig.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function FormlyConfig_Factory() { return new FormlyConfig(); }, token: FormlyConfig, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyConfig, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFormBuilder {
    /**
     * @param {?} formlyConfig
     * @param {?} componentFactoryResolver
     * @param {?} injector
     */
    constructor(formlyConfig, componentFactoryResolver, injector) {
        this.formlyConfig = formlyConfig;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * @param {?} formControl
     * @param {?=} fieldGroup
     * @param {?=} model
     * @param {?=} options
     * @return {?}
     */
    buildForm(formControl, fieldGroup = [], model, options) {
        if (!this.formlyConfig.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        /** @type {?} */
        const field = { fieldGroup, model, formControl, options: this._setOptions(options) };
        reduceFormUpdateValidityCalls(formControl, (/**
         * @return {?}
         */
        () => this._buildForm(field)));
        field.options._checkField(field, true);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    _buildForm(field) {
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.prePopulate && extension.prePopulate(field)));
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.onPopulate && extension.onPopulate(field)));
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @return {?}
             */
            (f) => this._buildForm(f)));
        }
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.postPopulate && extension.postPopulate(field)));
    }
    /**
     * @private
     * @return {?}
     */
    getExtensions() {
        return Object.keys(this.formlyConfig.extensions).map((/**
         * @param {?} name
         * @return {?}
         */
        name => this.formlyConfig.extensions[name]));
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    _setOptions(options) {
        options = options || {};
        options.formState = options.formState || {};
        if (!options.showError) {
            options.showError = this.formlyConfig.extras.showError;
        }
        if (!options.fieldChanges) {
            defineHiddenProp(options, 'fieldChanges', new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]());
        }
        if (!options._resolver) {
            defineHiddenProp(options, '_resolver', this.componentFactoryResolver);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options._hiddenFieldsForCheck) {
            options._hiddenFieldsForCheck = [];
        }
        if (!options._markForCheck) {
            options._markForCheck = (/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                if (field._componentRefs) {
                    field._componentRefs.forEach((/**
                     * @param {?} ref
                     * @return {?}
                     */
                    ref => {
                        // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
                        /** @type {?} */
                        const changeDetectorRef = ref.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]);
                        changeDetectorRef.markForCheck();
                    }));
                }
                if (field.fieldGroup) {
                    field.fieldGroup.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => options._markForCheck(f)));
                }
            });
        }
        if (!options._buildField) {
            options._buildField = (/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                this.buildForm(field.form, field.fieldGroup, field.model, field.options);
                return field;
            });
        }
        return options;
    }
}
FormlyFormBuilder.ɵfac = function FormlyFormBuilder_Factory(t) { return new (t || FormlyFormBuilder)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](FormlyConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
FormlyFormBuilder.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: FormlyFormBuilder, factory: FormlyFormBuilder.ɵfac, providedIn: 'root' });
/** @nocollapse */
FormlyFormBuilder.ctorParameters = () => [
    { type: FormlyConfig },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] }
];
/** @nocollapse */ FormlyFormBuilder.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function FormlyFormBuilder_Factory() { return new FormlyFormBuilder(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"])(FormlyConfig), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["INJECTOR"])); }, token: FormlyFormBuilder, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyFormBuilder, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: FormlyConfig }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyForm {
    /**
     * @param {?} formlyBuilder
     * @param {?} formlyConfig
     * @param {?} ngZone
     * @param {?} immutable
     * @param {?} parentFormGroup
     */
    constructor(formlyBuilder, formlyConfig, ngZone, 
    // tslint:disable-next-line
    immutable, parentFormGroup) {
        this.formlyBuilder = formlyBuilder;
        this.formlyConfig = formlyConfig;
        this.ngZone = ngZone;
        this.parentFormGroup = parentFormGroup;
        this.modelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.immutable = false;
        this._modelChangeValue = {};
        this.modelChangeSubs = [];
        this.modelChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.modelChangeSub = this.modelChange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((/**
         * @return {?}
         */
        () => this.ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))))).subscribe((/**
         * @return {?}
         */
        () => this.ngZone.runGuarded((/**
         * @return {?}
         */
        () => {
            // runGuarded is used to keep the expression changes in-sync
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            this.checkExpressionChange();
            this.modelChange.emit(this._modelChangeValue = clone(this.model));
        }))));
        if (immutable !== null) {
            console.warn(`NgxFormly: passing 'immutable' attribute to 'formly-form' component is deprecated since v5.5, enable immutable mode through NgModule declaration instead.`);
        }
        this.immutable = (immutable !== null) || !!formlyConfig.extras.immutable;
    }
    /**
     * @param {?} model
     * @return {?}
     */
    set model(model) { this._model = this.immutable ? clone(model) : model; }
    /**
     * @return {?}
     */
    get model() { return this._model || {}; }
    /**
     * @param {?} fields
     * @return {?}
     */
    set fields(fields) { this._fields = this.immutable ? clone(fields) : fields; }
    /**
     * @return {?}
     */
    get fields() { return this._fields || []; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) { this._options = this.immutable ? clone(options) : options; }
    /**
     * @return {?}
     */
    get options() { return this._options; }
    /**
     * @param {?} content
     * @return {?}
     */
    set content(content) {
        if (content && content.nativeElement.nextSibling) {
            console.warn(`NgxFormly: content projection for 'formly-form' component is deprecated since v5.5, you should avoid passing content inside the 'formly-form' tag.`);
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.formlyConfig.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // https://github.com/ngx-formly/ngx-formly/issues/2294
        if (changes.model && this.field) {
            this.field.model = this.model;
        }
        if (changes.fields || changes.form || (changes.model && this._modelChangeValue !== changes.model.currentValue)) {
            this.form = this.form || (new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({}));
            this.setOptions();
            this.options.updateInitialValue();
            this.clearModelSubscriptions();
            this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
            this.trackModelChanges(this.fields);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.modelChangeSub.unsubscribe();
        this.clearModelSubscriptions();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    changeModel({ key, value, field }) {
        assignFieldValue(field, value);
        this.modelChange$.next();
    }
    /**
     * @return {?}
     */
    setOptions() {
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.resetModel) {
            this.options.resetModel = (/**
             * @param {?=} model
             * @return {?}
             */
            (model) => {
                model = clone(isNullOrUndefined(model) ? ((/** @type {?} */ (this.options)))._initialModel : model);
                if (this.model) {
                    Object.keys(this.model).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    k => delete this.model[k]));
                    Object.assign(this.model, model || {});
                }
                ((/** @type {?} */ (this.options)))._buildForm();
                // we should call `NgForm::resetForm` to ensure changing `submitted` state after resetting form
                // but only when the current component is a root one.
                if (this.options.parentForm && this.options.parentForm.control === this.form) {
                    this.options.parentForm.resetForm(model);
                }
                else {
                    this.form.reset(model);
                }
            });
        }
        if (!this.options.parentForm && this.parentFormGroup) {
            defineHiddenProp(this.options, 'parentForm', this.parentFormGroup);
            wrapProperty(this.options.parentForm, 'submitted', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange }) => {
                if (!firstChange) {
                    this.checkExpressionChange();
                    ((/** @type {?} */ (this.options)))._markForCheck({
                        fieldGroup: this.fields,
                        model: this.model,
                        formControl: this.form,
                        options: this.options,
                    });
                }
            }));
        }
        if (!this.options.updateInitialValue) {
            this.options.updateInitialValue = (/**
             * @return {?}
             */
            () => ((/** @type {?} */ (this.options)))._initialModel = clone(this.model));
        }
        if (!((/** @type {?} */ (this.options)))._buildForm) {
            ((/** @type {?} */ (this.options)))._buildForm = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            (emitModelChange = false) => {
                this.clearModelSubscriptions();
                this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
                this.trackModelChanges(this.fields);
                if (emitModelChange) {
                    this.modelChange.emit(this._modelChangeValue = clone(this.model));
                }
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    checkExpressionChange() {
        if (this.options && ((/** @type {?} */ (this.options)))._checkField) {
            ((/** @type {?} */ (this.options)))._checkField({
                fieldGroup: this.fields,
                model: this.model,
                formControl: this.form,
                options: this.options,
            });
        }
    }
    /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    trackModelChanges(fields, rootKey = []) {
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (field.key && !field.fieldGroup) {
                /** @type {?} */
                const control = field.formControl;
                /** @type {?} */
                let valueChanges = control.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
                const { updateOn, debounce } = field.modelOptions;
                if ((!updateOn || updateOn === 'change') && debounce && debounce.default > 0) {
                    valueChanges = control.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(debounce.default));
                }
                this.modelChangeSubs.push(valueChanges.subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => {
                    // workaround for https://github.com/angular/angular/issues/13792
                    if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"] && control['_fields'] && control['_fields'].length > 1) {
                        control.patchValue(value, { emitEvent: false, onlySelf: true });
                    }
                    if (field.parsers && field.parsers.length > 0) {
                        field.parsers.forEach((/**
                         * @param {?} parserFn
                         * @return {?}
                         */
                        parserFn => value = parserFn(value)));
                    }
                    this.changeModel({ key: [...rootKey, ...getKeyPath(field)].join('.'), value, field });
                })));
                // workaround for v5 (https://github.com/ngx-formly/ngx-formly/issues/2061)
                /** @type {?} */
                const observers = control.valueChanges['observers'];
                if (observers && observers.length > 1) {
                    observers.unshift(observers.pop());
                }
            }
            if (field.fieldGroup && field.fieldGroup.length > 0) {
                this.trackModelChanges(field.fieldGroup, field.key ? [...rootKey, ...getKeyPath(field)] : rootKey);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    clearModelSubscriptions() {
        this.modelChangeSubs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.modelChangeSubs = [];
    }
    /**
     * @private
     * @return {?}
     */
    get field() {
        return this.fields && this.fields[0] && this.fields[0].parent;
    }
}
FormlyForm.ɵfac = function FormlyForm_Factory(t) { return new (t || FormlyForm)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](FormlyFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](FormlyConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinjectAttribute"]('immutable'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"], 8)); };
FormlyForm.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormlyForm, selectors: [["formly-form"]], viewQuery: function FormlyForm_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
    } }, inputs: { model: "model", fields: "fields", options: "options", form: "form" }, outputs: { modelChange: "modelChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([FormlyFormBuilder]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], ngContentSelectors: _c1, decls: 4, vars: 1, consts: [["hide-deprecation", "", 3, "form", "options", "model", "field", 4, "ngFor", "ngForOf"], ["content", ""], ["hide-deprecation", "", 3, "form", "options", "model", "field"]], template: function FormlyForm_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, FormlyForm_formly_field_0_Template, 1, 4, "formly-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, null, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.fields);
    } }, directives: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], FormlyField]; }, encapsulation: 2 });
/** @nocollapse */
FormlyForm.ctorParameters = () => [
    { type: FormlyFormBuilder },
    { type: FormlyConfig },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"], args: ['immutable',] }] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] }
];
FormlyForm.propDecorators = {
    form: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    model: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    fields: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    modelChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['content',] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyForm, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'formly-form',
                template: `
    <formly-field *ngFor="let field of fields"
      hide-deprecation
      [form]="field.form"
      [options]="field.options"
      [model]="field.model"
      [field]="field">
    </formly-field>
    <ng-container #content>
      <ng-content></ng-content>
    </ng-container>
  `,
                providers: [FormlyFormBuilder]
            }]
    }], function () { return [{ type: FormlyFormBuilder }, { type: FormlyConfig }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"],
                args: ['immutable']
            }] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }] }]; }, { modelChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }], model: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], fields: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], content: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['content']
        }], form: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyField {
    /**
     * @param {?} formlyConfig
     * @param {?} renderer
     * @param {?} resolver
     * @param {?} elementRef
     * @param {?} hideDeprecation
     */
    constructor(formlyConfig, renderer, resolver, elementRef, 
    // tslint:disable-next-line
    hideDeprecation) {
        this.formlyConfig = formlyConfig;
        this.renderer = renderer;
        this.resolver = resolver;
        this.elementRef = elementRef;
        this.warnDeprecation = false;
        this.modelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.hostObservers = [];
        this.componentRefs = [];
        this.hooksObservers = [];
        this.warnDeprecation = hideDeprecation === null;
    }
    /**
     * @param {?} m
     * @return {?}
     */
    set model(m) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'model' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'form' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'options' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.triggerHook('afterContentInit');
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.triggerHook('afterContentChecked');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.triggerHook('afterViewInit');
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.triggerHook('afterViewChecked');
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.triggerHook('doCheck');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.triggerHook('onInit');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.triggerHook('onChanges', changes);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resetRefs(this.field);
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.hooksObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.triggerHook('onDestroy');
    }
    /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    renderField(containerRef, f, wrappers = []) {
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field ? this.field.wrappers : [];
        }
        if (wrappers && wrappers.length > 0) {
            const [wrapper, ...wps] = wrappers;
            const { component } = this.formlyConfig.getWrapper(wrapper);
            /** @type {?} */
            const ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
            wrapProperty(ref.instance, 'fieldComponent', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, previousValue, currentValue }) => {
                if (currentValue) {
                    /** @type {?} */
                    const viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        this.renderField(currentValue, f, wps);
                    }
                    !firstChange && ref.changeDetectorRef.detectChanges();
                }
            }));
        }
        else if (f && f.type) {
            const { component } = this.formlyConfig.getType(f.type);
            /** @type {?} */
            const ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
        }
    }
    /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    triggerHook(name, changes) {
        if (this.field && this.field.hooks && this.field.hooks[name]) {
            if (!changes || changes.field) {
                /** @type {?} */
                const r = this.field.hooks[name](this.field);
                if (Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["isObservable"])(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    /** @type {?} */
                    const sub = r.subscribe();
                    this.hooksObservers.push((/**
                     * @return {?}
                     */
                    () => sub.unsubscribe()));
                }
            }
        }
        if (this.field && this.field.lifecycle && this.field.lifecycle[name]) {
            this.field.lifecycle[name](this.field.form, this.field, this.field.model, this.field.options);
        }
        if (name === 'onChanges' && changes.field) {
            this.resetRefs(changes.field.previousValue);
            this.render();
        }
    }
    /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    attachComponentRef(ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        Object.assign(ref.instance, { field });
    }
    /**
     * @private
     * @return {?}
     */
    render() {
        if (!this.field) {
            return;
        }
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.hostObservers = [
            wrapProperty(this.field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, currentValue }) => {
                if (!this.formlyConfig.extras.lazyRender) {
                    firstChange && this.renderField(this.containerRef, this.field);
                    if (!firstChange || (firstChange && currentValue)) {
                        this.renderer.setStyle(this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                    }
                }
                else {
                    if (currentValue) {
                        this.containerRef.clear();
                    }
                    else {
                        this.renderField(this.containerRef, this.field);
                    }
                }
            })),
            wrapProperty(this.field, 'className', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, currentValue }) => {
                if (!firstChange || (firstChange && currentValue)) {
                    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', currentValue);
                }
            })),
        ];
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    resetRefs(field) {
        if (field) {
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((/**
                 * @param {?} ref
                 * @return {?}
                 */
                ref => this.componentRefs.indexOf(ref) === -1));
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    }
}
FormlyField.ɵfac = function FormlyField_Factory(t) { return new (t || FormlyField)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](FormlyConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinjectAttribute"]('hide-deprecation')); };
FormlyField.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormlyField, selectors: [["formly-field"]], viewQuery: function FormlyField_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstaticViewQuery"](_c2, true, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.containerRef = _t.first);
    } }, inputs: { model: "model", form: "form", options: "options", field: "field" }, outputs: { modelChange: "modelChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 0, consts: [["container", ""]], template: function FormlyField_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, FormlyField_ng_template_0_Template, 0, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } }, encapsulation: 2 });
/** @nocollapse */
FormlyField.ctorParameters = () => [
    { type: FormlyConfig },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"], args: ['hide-deprecation',] }] }
];
FormlyField.propDecorators = {
    field: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    model: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    form: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    modelChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
    containerRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['container', (/** @type {?} */ ({ read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], static: true })),] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyField, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'formly-field',
                template: `<ng-template #container></ng-template>`
            }]
    }], function () { return [{ type: FormlyConfig }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"],
                args: ['hide-deprecation']
            }] }]; }, { modelChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }], model: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], form: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], field: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], containerRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['container', ( /** @type {?} */({ read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], static: true }))]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyAttributes {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} _document
     */
    constructor(renderer, elementRef, _document) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.uiAttributesCache = {};
        this.uiAttributes = [
            ...FORMLY_VALIDATORS,
            'tabindex',
            'placeholder',
            'readonly',
            'disabled',
            'step',
        ];
        /**
         * HostBinding doesn't register listeners conditionally which may produce some perf issues.
         *
         * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
         */
        this.uiEvents = {
            listeners: [],
            events: [
                'click',
                'keyup',
                'keydown',
                'keypress',
            ],
        };
        this.document = _document;
    }
    /**
     * @return {?}
     */
    get to() { return this.field.templateOptions || {}; }
    /**
     * @private
     * @return {?}
     */
    get fieldAttrElements() { return (this.field && this.field['_elementRefs']) || []; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            listener => listener()));
            this.uiEvents.events.forEach((/**
             * @param {?} eventName
             * @return {?}
             */
            eventName => {
                if (this.to && this.to[eventName]) {
                    this.uiEvents.listeners.push(this.renderer.listen(this.elementRef.nativeElement, eventName, (/**
                     * @param {?} e
                     * @return {?}
                     */
                    (e) => this.to[eventName](this.field, e))));
                }
            }));
            if (this.to && this.to.attributes) {
                wrapProperty(this.to, 'attributes', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ currentValue, previousValue }) => {
                    if (previousValue) {
                        Object.keys(previousValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        attr => this.removeAttribute(attr)));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        attr => this.setAttribute(attr, currentValue[attr])));
                    }
                }));
            }
            this.detachElementRef(changes.field.previousValue);
            this.attachElementRef(changes.field.currentValue);
            if (this.fieldAttrElements.length === 1) {
                !this.id && this.field.id && this.setAttribute('id', this.field.id);
                wrapProperty(this.field, 'focus', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ currentValue }) => {
                    this.toggleFocus(currentValue);
                }));
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    }
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    ngDoCheck() {
        this.uiAttributes.forEach((/**
         * @param {?} attr
         * @return {?}
         */
        attr => {
            /** @type {?} */
            const value = this.to[attr];
            if (this.uiAttributesCache[attr] !== value) {
                this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    this.setAttribute(attr, value === true ? attr : `${value}`);
                }
                else {
                    this.removeAttribute(attr);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.uiEvents.listeners.forEach((/**
         * @param {?} listener
         * @return {?}
         */
        listener => listener()));
        this.detachElementRef(this.field);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toggleFocus(value) {
        /** @type {?} */
        const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        /** @type {?} */
        const isFocused = !!this.document.activeElement
            && this.fieldAttrElements
                .some((/**
             * @param {?} __0
             * @return {?}
             */
            ({ nativeElement }) => this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement)));
        if (value && !isFocused) {
            element.nativeElement.focus();
        }
        else if (!value && isFocused) {
            element.nativeElement.blur();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFocus($event) {
        this.field['___$focus'] = true;
        if (this.to.focus) {
            this.to.focus(this.field, $event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onBlur($event) {
        this.field['___$focus'] = false;
        if (this.to.blur) {
            this.to.blur(this.field, $event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChange($event) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
        if (this.field.formControl) {
            this.field.formControl.markAsDirty();
        }
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    attachElementRef(f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs'] && f['_elementRefs'].indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    detachElementRef(f) {
        /** @type {?} */
        const index = f && f['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            this.field['_elementRefs'].splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    setAttribute(attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    }
    /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    removeAttribute(attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    }
}
FormlyAttributes.ɵfac = function FormlyAttributes_Factory(t) { return new (t || FormlyAttributes)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
FormlyAttributes.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: FormlyAttributes, selectors: [["", "formlyAttributes", ""]], hostBindings: function FormlyAttributes_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("focus", function FormlyAttributes_focus_HostBindingHandler($event) { return ctx.onFocus($event); })("blur", function FormlyAttributes_blur_HostBindingHandler($event) { return ctx.onBlur($event); })("change", function FormlyAttributes_change_HostBindingHandler($event) { return ctx.onChange($event); });
    } }, inputs: { field: ["formlyAttributes", "field"], id: "id" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]] });
/** @nocollapse */
FormlyAttributes.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] }
];
FormlyAttributes.propDecorators = {
    field: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['formlyAttributes',] }],
    id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyAttributes, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                selector: '[formlyAttributes]',
                host: {
                    '(focus)': 'onFocus($event)',
                    '(blur)': 'onBlur($event)',
                    '(change)': 'onChange($event)'
                }
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }]; }, { field: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['formlyAttributes']
        }], id: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
class FieldType {
    /**
     * @return {?}
     */
    get model() { return this.field.model; }
    /**
     * @param {?} m
     * @return {?}
     */
    set model(m) { console.warn(`NgxFormly: passing 'model' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get form() { return (/** @type {?} */ (this.field.parent.formControl)); }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) { console.warn(`NgxFormly: passing 'form' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get options() { return this.field.options; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) { console.warn(`NgxFormly: passing 'options' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get key() { return this.field.key; }
    /**
     * @return {?}
     */
    get formControl() { return this.field.formControl; }
    /**
     * @return {?}
     */
    get to() { return this.field.templateOptions || {}; }
    /**
     * @return {?}
     */
    get showError() { return this.options.showError(this); }
    /**
     * @return {?}
     */
    get id() { return this.field.id; }
    /**
     * @return {?}
     */
    get formState() { return this.options.formState || {}; }
}
FieldType.ɵfac = function FieldType_Factory(t) { return new (t || FieldType)(); };
FieldType.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: FieldType, inputs: { model: "model", form: "form", options: "options", field: "field" } });
FieldType.propDecorators = {
    field: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    model: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    form: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};

/**
 * @deprecated use `FieldType` instead
 * @abstract
 */
class Field extends FieldType {
    constructor() {
        super();
        console.warn(`NgxFormly: 'Field' has been renamed to 'FieldType', extend 'FieldType' instead.`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @param {?=} emitEvent
 * @return {?}
 */
function unregisterControl(field, emitEvent = false) {
    /** @type {?} */
    const form = (/** @type {?} */ (field.formControl.parent));
    if (!form) {
        return;
    }
    /** @type {?} */
    const control = field.formControl;
    /** @type {?} */
    const opts = { emitEvent };
    if (form instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormArray"]) {
        /** @type {?} */
        const key = form.controls.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        c => c === control));
        if (key !== -1) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            () => form.removeAt(key)));
        }
    }
    else if (form instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]) {
        /** @type {?} */
        const paths = getKeyPath(field);
        /** @type {?} */
        const key = paths[paths.length - 1];
        if (form.get([key]) === control) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            () => form.removeControl(key)));
        }
    }
    control.setParent(null);
}
/**
 * @param {?} field
 * @return {?}
 */
function findControl(field) {
    if (field.formControl) {
        return field.formControl;
    }
    if (field['shareFormControl'] === false) {
        return null;
    }
    /** @type {?} */
    const form = (/** @type {?} */ (field.parent.formControl));
    return form ? form.get(getKeyPath(field)) : null;
}
/**
 * @param {?} field
 * @param {?=} control
 * @param {?=} emitEvent
 * @return {?}
 */
function registerControl(field, control, emitEvent = false) {
    control = control || field.formControl;
    if (!control['_fields']) {
        defineHiddenProp(control, '_fields', []);
    }
    if (control['_fields'].indexOf(field) === -1) {
        control['_fields'].push(field);
    }
    if (!field.formControl && control) {
        defineHiddenProp(field, 'formControl', control);
        field.templateOptions.disabled = !!field.templateOptions.disabled;
        wrapProperty(field.templateOptions, 'disabled', (/**
         * @param {?} __0
         * @return {?}
         */
        ({ firstChange, currentValue }) => {
            if (!firstChange) {
                currentValue ? field.formControl.disable() : field.formControl.enable();
            }
        }));
        if (control.registerOnDisabledChange) {
            control.registerOnDisabledChange((/**
             * @param {?} value
             * @return {?}
             */
            (value) => field.templateOptions['___$disabled'] = value));
        }
    }
    /** @type {?} */
    let parent = (/** @type {?} */ (field.parent.formControl));
    if (!parent || !field.key) {
        return;
    }
    /** @type {?} */
    const paths = getKeyPath(field);
    if (!parent['_formlyControls']) {
        defineHiddenProp(parent, '_formlyControls', {});
    }
    parent['_formlyControls'][paths.join('.')] = control;
    for (let i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        const path = paths[i];
        if (!parent.get([path])) {
            registerControl({
                key: [path],
                formControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({}),
                parent: { formControl: parent },
            });
        }
        parent = (/** @type {?} */ (parent.get([path])));
    }
    /** @type {?} */
    const value = getFieldValue(field);
    if (!(isNullOrUndefined(control.value) && isNullOrUndefined(value))
        && control.value !== value
        && control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]) {
        control.patchValue(value);
    }
    /** @type {?} */
    const key = paths[paths.length - 1];
    if (!field._hide && parent.get([key]) !== control) {
        updateControl(parent, { emitEvent }, (/**
         * @return {?}
         */
        () => parent.setControl(key, control)));
    }
}
/**
 * @param {?} c
 * @return {?}
 */
function updateValidity(c) {
    /** @type {?} */
    const status = c.status;
    c.updateValueAndValidity({ emitEvent: false });
    if (status !== c.status) {
        ((/** @type {?} */ (c.statusChanges))).emit(c.status);
    }
}
/**
 * @param {?} form
 * @param {?} opts
 * @param {?} action
 * @return {?}
 */
function updateControl(form, opts, action) {
    /**
     *  workaround for https://github.com/angular/angular/issues/27679
     */
    if (form instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"] && !form['__patchForEachChild']) {
        defineHiddenProp(form, '__patchForEachChild', true);
        ((/** @type {?} */ (form)))._forEachChild = (/**
         * @param {?} cb
         * @return {?}
         */
        (cb) => {
            Object
                .keys(form.controls)
                .forEach((/**
             * @param {?} k
             * @return {?}
             */
            k => form.controls[k] && cb(form.controls[k], k)));
        });
    }
    /**
     * workaround for https://github.com/angular/angular/issues/20439
     * @type {?}
     */
    const updateValueAndValidity = form.updateValueAndValidity.bind(form);
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = (/**
         * @param {?} opts
         * @return {?}
         */
        (opts) => {
            updateValueAndValidity(Object.assign({}, (opts || {}), { emitEvent: false }));
        });
    }
    action();
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = updateValueAndValidity;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
class FieldArrayType extends FieldType {
    /**
     * @param {?=} builder
     */
    constructor(builder) {
        super();
        this.defaultOptions = {
            defaultValue: [],
        };
        if (builder instanceof FormlyFormBuilder) {
            console.warn(`NgxFormly: passing 'FormlyFormBuilder' to '${this.constructor.name}' type is not required anymore, you may remove it!`);
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.formControl && field.key) {
            /** @type {?} */
            const control = findControl(field);
            registerControl(field, control ? control : new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormArray"]([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        /** @type {?} */
        const length = field.model ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (let i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i]);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (let i = field.fieldGroup.length; i < length; i++) {
            /** @type {?} */
            const f = Object.assign({}, clone(field.fieldArray), { key: `${i}` });
            field.fieldGroup.push(f);
        }
    }
    /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    add(i, initialModel, { markAsDirty } = { markAsDirty: true }) {
        i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        ((/** @type {?} */ (this.options)))._buildForm(true);
        markAsDirty && this.formControl.markAsDirty();
    }
    /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    remove(i, { markAsDirty } = { markAsDirty: true }) {
        this.model.splice(i, 1);
        unregisterControl(this.field.fieldGroup[i], true);
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach((/**
         * @param {?} f
         * @param {?} key
         * @return {?}
         */
        (f, key) => f.key = `${key}`));
        ((/** @type {?} */ (this.options)))._buildForm(true);
        markAsDirty && this.formControl.markAsDirty();
    }
}
/** @nocollapse */
FieldArrayType.ctorParameters = () => [
    { type: FormlyFormBuilder, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [FORMLY_CONFIG,] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
class FieldWrapper extends FieldType {
}
FieldWrapper.ɵfac = function FieldWrapper_Factory(t) { return ɵFieldWrapper_BaseFactory(t || FieldWrapper); };
FieldWrapper.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: FieldWrapper, viewQuery: function FieldWrapper_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c3, true, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.fieldComponent = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]] });
FieldWrapper.propDecorators = {
    fieldComponent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['fieldComponent', (/** @type {?} */ ({ read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], static: false })),] }]
};
const ɵFieldWrapper_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](FieldWrapper);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyGroup extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            defaultValue: {},
        };
    }
}
FormlyGroup.ɵfac = function FormlyGroup_Factory(t) { return ɵFormlyGroup_BaseFactory(t || FormlyGroup); };
FormlyGroup.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormlyGroup, selectors: [["formly-group"]], hostVars: 2, hostBindings: function FormlyGroup_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.field.fieldGroupClassName || "");
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c1, decls: 2, vars: 1, consts: [[3, "field", 4, "ngFor", "ngForOf"], [3, "field"]], template: function FormlyGroup_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, FormlyGroup_formly_field_0_Template, 1, 1, "formly-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.field.fieldGroup);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], FormlyField], encapsulation: 2 });
const ɵFormlyGroup_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](FormlyGroup);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyGroup, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'formly-group',
                template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
    <ng-content></ng-content>
  `,
                host: {
                    '[class]': 'field.fieldGroupClassName || ""'
                }
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyValidationMessage {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.errorMessage$ = this.field.formControl.statusChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((/**
         * @return {?}
         */
        () => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["isObservable"])(this.errorMessage)
            ? this.errorMessage
            : Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(this.errorMessage))));
    }
    /**
     * @return {?}
     */
    get errorMessage() {
        /** @type {?} */
        const fieldForm = this.field.formControl;
        for (let error in fieldForm.errors) {
            if (fieldForm.errors.hasOwnProperty(error)) {
                /** @type {?} */
                let message = this.formlyConfig.getValidatorMessage(error);
                if (isObject(fieldForm.errors[error])) {
                    if (fieldForm.errors[error].errorPath) {
                        return;
                    }
                    if (fieldForm.errors[error].message) {
                        message = fieldForm.errors[error].message;
                    }
                }
                if (this.field.validation && this.field.validation.messages && this.field.validation.messages[error]) {
                    message = this.field.validation.messages[error];
                }
                if (this.field.validators && this.field.validators[error] && this.field.validators[error].message) {
                    message = this.field.validators[error].message;
                }
                if (this.field.asyncValidators && this.field.asyncValidators[error] && this.field.asyncValidators[error].message) {
                    message = this.field.asyncValidators[error].message;
                }
                if (typeof message === 'function') {
                    return message(fieldForm.errors[error], this.field);
                }
                return message;
            }
        }
    }
}
FormlyValidationMessage.ɵfac = function FormlyValidationMessage_Factory(t) { return new (t || FormlyValidationMessage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](FormlyConfig)); };
FormlyValidationMessage.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormlyValidationMessage, selectors: [["formly-validation-message"]], inputs: { field: "field" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 3, template: function FormlyValidationMessage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, ctx.errorMessage$));
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
FormlyValidationMessage.ctorParameters = () => [
    { type: FormlyConfig }
];
FormlyValidationMessage.propDecorators = {
    field: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyValidationMessage, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'formly-validation-message',
                template: `{{ errorMessage$ | async }}`,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush
            }]
    }], function () { return [{ type: FormlyConfig }]; }, { field: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyTemplateType extends FieldType {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        super();
        this.sanitizer = sanitizer;
        this.innerHtml = { content: null, template: null };
    }
    /**
     * @return {?}
     */
    get template() {
        if (this.field && (this.field.template !== this.innerHtml.template)) {
            this.innerHtml = {
                template: this.field.template,
                content: this.to.safeHtml
                    ? this.sanitizer.bypassSecurityTrustHtml(this.field.template)
                    : this.field.template,
            };
        }
        return this.innerHtml.content;
    }
}
FormlyTemplateType.ɵfac = function FormlyTemplateType_Factory(t) { return new (t || FormlyTemplateType)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"])); };
FormlyTemplateType.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormlyTemplateType, selectors: [["formly-template"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 1, vars: 1, consts: [[3, "innerHtml"]], template: function FormlyTemplateType_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHtml", ctx.template, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
    } }, encapsulation: 2 });
/** @nocollapse */
FormlyTemplateType.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyTemplateType, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'formly-template',
                template: `<div [innerHtml]="template"></div>`
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} expression
 * @param {?} argNames
 * @return {?}
 */
function evalStringExpression(expression, argNames) {
    try {
        if (expression.indexOf('this.field') !== -1) {
            console.warn(`NgxFormly: using 'this.field' in expressionProperties is deprecated since v5.1, use 'field' instead.`);
        }
        return (/** @type {?} */ (Function(...argNames, `return ${expression};`)));
    }
    catch (error) {
        console.error(error);
    }
}
/**
 * @param {?} expression
 * @param {?} thisArg
 * @param {?} argVal
 * @return {?}
 */
function evalExpression(expression, thisArg, argVal) {
    if (expression instanceof Function) {
        return expression.apply(thisArg, argVal);
    }
    else {
        return expression ? true : false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class FieldExpressionExtension {
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        if (field.parent || field.options._checkField) {
            return;
        }
        /** @type {?} */
        let checkLocked = false;
        field.options._checkField = (/**
         * @param {?} f
         * @param {?} ignoreCache
         * @return {?}
         */
        (f, ignoreCache) => {
            if (!checkLocked) {
                checkLocked = true;
                reduceFormUpdateValidityCalls(f.formControl, (/**
                 * @return {?}
                 */
                () => this.checkField(f, ignoreCache)));
                checkLocked = false;
            }
        });
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.parent || field._expressionProperties) {
            return;
        }
        // cache built expression
        defineHiddenProp(field, '_expressionProperties', {});
        if (field.expressionProperties) {
            for (const key in field.expressionProperties) {
                /** @type {?} */
                const expressionProperty = field.expressionProperties[key];
                if (typeof expressionProperty === 'string' || isFunction(expressionProperty)) {
                    field._expressionProperties[key] = {
                        expression: this._evalExpression(expressionProperty, key === 'templateOptions.disabled' && field.parent.expressionProperties && field.parent.expressionProperties.hasOwnProperty('templateOptions.disabled')
                            ? (/**
                             * @return {?}
                             */
                            () => field.parent.templateOptions.disabled)
                            : undefined),
                    };
                    if (key === 'templateOptions.disabled') {
                        Object.defineProperty(field._expressionProperties[key], 'expressionValue', {
                            get: (/**
                             * @return {?}
                             */
                            () => field.templateOptions.disabled),
                            set: (/**
                             * @return {?}
                             */
                            () => { }),
                            enumerable: true,
                            configurable: true,
                        });
                    }
                }
                else if (expressionProperty instanceof rxjs__WEBPACK_IMPORTED_MODULE_6__["Observable"]) {
                    /** @type {?} */
                    const subscribe = (/**
                     * @return {?}
                     */
                    () => ((/** @type {?} */ (expressionProperty)))
                        .subscribe((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => {
                        this.setExprValue(field, key, v);
                        if (field.options && field.options._markForCheck) {
                            field.options._markForCheck(field);
                        }
                    })));
                    /** @type {?} */
                    let subscription = subscribe();
                    /** @type {?} */
                    const onInit = field.hooks.onInit;
                    field.hooks.onInit = (/**
                     * @return {?}
                     */
                    () => {
                        if (subscription === null) {
                            subscription = subscribe();
                        }
                        return onInit && onInit(field);
                    });
                    /** @type {?} */
                    const onDestroy = field.hooks.onDestroy;
                    field.hooks.onDestroy = (/**
                     * @return {?}
                     */
                    () => {
                        onDestroy && onDestroy(field);
                        subscription.unsubscribe();
                        subscription = null;
                    });
                }
            }
        }
        if (field.hideExpression) {
            // delete hide value in order to force re-evaluate it in FormlyFormExpression.
            delete field.hide;
            /** @type {?} */
            let parent = field.parent;
            while (parent && !parent.hideExpression) {
                parent = parent.parent;
            }
            field.hideExpression = this._evalExpression(field.hideExpression, parent && parent.hideExpression ? (/**
             * @return {?}
             */
            () => parent.hide) : undefined);
        }
        else {
            wrapProperty(field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ currentValue, firstChange }) => {
                field._hide = currentValue;
                if (!firstChange || (firstChange && currentValue === true)) {
                    field.options._hiddenFieldsForCheck.push(field);
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} expression
     * @param {?=} parentExpression
     * @return {?}
     */
    _evalExpression(expression, parentExpression) {
        expression = expression || ((/**
         * @return {?}
         */
        () => false));
        if (typeof expression === 'string') {
            expression = evalStringExpression(expression, ['model', 'formState', 'field']);
        }
        return parentExpression
            ? (/**
             * @param {?} model
             * @param {?} formState
             * @param {?} field
             * @return {?}
             */
            (model, formState, field) => parentExpression() || expression(model, formState, field))
            : expression;
    }
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    checkField(field, ignoreCache = false) {
        this._checkField(field, ignoreCache);
        field.options._hiddenFieldsForCheck
            .sort((/**
         * @param {?} f
         * @return {?}
         */
        f => f.hide ? -1 : 1))
            .forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => this.toggleFormControl(f, !!f.hide, !ignoreCache)));
        field.options._hiddenFieldsForCheck = [];
    }
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    _checkField(field, ignoreCache = false) {
        /** @type {?} */
        let markForCheck = false;
        field.fieldGroup.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            this.checkFieldExpressionChange(f, ignoreCache) && (markForCheck = true);
            if (this.checkFieldVisibilityChange(f, ignoreCache)) {
                field.options._hiddenFieldsForCheck.push(f);
                markForCheck = true;
            }
            if (f.fieldGroup && f.fieldGroup.length > 0) {
                this._checkField(f, ignoreCache);
            }
        }));
        if (markForCheck && field.options && field.options._markForCheck) {
            field.options._markForCheck(field);
        }
    }
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    checkFieldExpressionChange(field, ignoreCache) {
        if (!field || !field._expressionProperties) {
            return false;
        }
        /** @type {?} */
        let markForCheck = false;
        /** @type {?} */
        const expressionProperties = field._expressionProperties;
        for (const key in expressionProperties) {
            /** @type {?} */
            let expressionValue = evalExpression(expressionProperties[key].expression, { field }, [field.model, field.options.formState, field]);
            if (key === 'templateOptions.disabled') {
                expressionValue = !!expressionValue;
            }
            if (ignoreCache || (expressionProperties[key].expressionValue !== expressionValue
                && (!isObject(expressionValue) || JSON.stringify(expressionValue) !== JSON.stringify(expressionProperties[key].expressionValue)))) {
                markForCheck = true;
                expressionProperties[key].expressionValue = expressionValue;
                this.setExprValue(field, key, expressionValue);
            }
        }
        return markForCheck;
    }
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    checkFieldVisibilityChange(field, ignoreCache) {
        if (!field || isNullOrUndefined(field.hideExpression)) {
            return false;
        }
        /** @type {?} */
        const hideExpressionResult = !!evalExpression(field.hideExpression, { field }, [field.model, field.options.formState, field]);
        /** @type {?} */
        let markForCheck = false;
        if (hideExpressionResult !== field.hide || ignoreCache) {
            markForCheck = true;
            // toggle hide
            field.hide = hideExpressionResult;
            field.templateOptions.hidden = hideExpressionResult;
        }
        return markForCheck;
    }
    /**
     * @private
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    setDisabledState(field, value) {
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.expressionProperties || !f.expressionProperties.hasOwnProperty('templateOptions.disabled')))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => this.setDisabledState(f, value)));
        }
        if (field.key && field.templateOptions.disabled !== value) {
            field.templateOptions.disabled = value;
        }
    }
    /**
     * @private
     * @param {?} field
     * @param {?} hide
     * @param {?} resetOnHide
     * @return {?}
     */
    toggleFormControl(field, hide, resetOnHide) {
        if (field.formControl && field.key) {
            defineHiddenProp(field, '_hide', !!(hide || field.hide));
            /** @type {?} */
            const c = field.formControl;
            if (c['_fields'].length > 1) {
                updateValidity(c);
            }
            if (hide === true && c['_fields'].every((/**
             * @param {?} f
             * @return {?}
             */
            f => !!f._hide))) {
                unregisterControl(field);
                if (resetOnHide && field['autoClear']) {
                    field.formControl.reset({ value: undefined, disabled: field.formControl.disabled });
                }
            }
            else if (hide === false) {
                if (field['autoClear'] && field.parent && !isUndefined(field.defaultValue) && isUndefined(getFieldValue(field))) {
                    assignFieldValue(field, field.defaultValue);
                }
                registerControl(field);
                if (field.fieldArray && (field.fieldGroup || []).length !== (field.model || []).length) {
                    ((/** @type {?} */ (field.options)))._buildForm(true);
                }
            }
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.hideExpression))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => this.toggleFormControl(f, hide, resetOnHide)));
        }
        if (field.options.fieldChanges) {
            field.options.fieldChanges.next((/** @type {?} */ ({ field, type: 'hidden', value: hide })));
        }
    }
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    setExprValue(field, prop, value) {
        try {
            /** @type {?} */
            let target = field;
            /** @type {?} */
            const paths = prop.split('.');
            /** @type {?} */
            const lastIndex = paths.length - 1;
            for (let i = 0; i < lastIndex; i++) {
                target = target[paths[i]];
            }
            target[paths[lastIndex]] = value;
        }
        catch (error) {
            error.message = `[Formly Error] [Expression "${prop}"] ${error.message}`;
            throw error;
        }
        if (prop === 'templateOptions.disabled' && field.key) {
            this.setDisabledState(field, value);
        }
        if (prop.indexOf('model.') === 0) {
            /** @type {?} */
            const path = prop.replace(/^model\./, '');
            /** @type {?} */
            const control = field.key && prop === path ? field.formControl : field.parent.formControl.get(path);
            if (control
                && !(isNullOrUndefined(control.value) && isNullOrUndefined(value))
                && control.value !== value) {
                control.patchValue(value, { emitEvent: false });
            }
        }
        this.emitExpressionChanges(field, prop, value);
    }
    /**
     * @private
     * @param {?} field
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    emitExpressionChanges(field, property, value) {
        if (!field.options.fieldChanges) {
            return;
        }
        field.options.fieldChanges.next({
            field: field,
            type: 'expressionChanges',
            property,
            value,
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class FieldValidationExtension {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        this.initFieldValidation(field, 'validators');
        this.initFieldValidation(field, 'asyncValidators');
    }
    /**
     * @private
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    initFieldValidation(field, type) {
        /** @type {?} */
        const validators = [];
        if (type === 'validators' && !(field.hasOwnProperty('fieldGroup') && !field.key)) {
            validators.push(this.getPredefinedFieldValidation(field));
        }
        if (field[type]) {
            for (const validatorName in field[type]) {
                if (validatorName === 'validation' && !Array.isArray(field[type].validation)) {
                    field[type].validation = [field[type].validation];
                    console.warn(`NgxFormly(${field.key}): passing a non array value to the 'validation' is deprecated, pass an array instead`);
                }
                validatorName === 'validation'
                    ? validators.push(...field[type].validation.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => this.wrapNgValidatorFn(field, v))))
                    : validators.push(this.wrapNgValidatorFn(field, field[type][validatorName], validatorName));
            }
        }
        defineHiddenProp(field, '_' + type, validators);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    getPredefinedFieldValidation(field) {
        /** @type {?} */
        let VALIDATORS = [];
        FORMLY_VALIDATORS.forEach((/**
         * @param {?} opt
         * @return {?}
         */
        opt => wrapProperty(field.templateOptions, opt, (/**
         * @param {?} __0
         * @return {?}
         */
        ({ currentValue, firstChange }) => {
            VALIDATORS = VALIDATORS.filter((/**
             * @param {?} o
             * @return {?}
             */
            o => o !== opt));
            if (currentValue != null && currentValue !== false) {
                VALIDATORS.push(opt);
            }
            if (!firstChange && field.formControl) {
                updateValidity(field.formControl);
            }
        }))));
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (VALIDATORS.length === 0) {
                return null;
            }
            return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose(VALIDATORS.map((/**
             * @param {?} opt
             * @return {?}
             */
            opt => (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const value = field.templateOptions[opt];
                switch (opt) {
                    case 'required':
                        return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required(control);
                    case 'pattern':
                        return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].pattern(value)(control);
                    case 'minLength':
                        return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(value)(control);
                    case 'maxLength':
                        return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].maxLength(value)(control);
                    case 'min':
                        return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].min(value)(control);
                    case 'max':
                        return _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].max(value)(control);
                }
            }))))(control);
        });
    }
    /**
     * @private
     * @param {?} field
     * @param {?} validator
     * @param {?=} validatorName
     * @return {?}
     */
    wrapNgValidatorFn(field, validator, validatorName) {
        /** @type {?} */
        let validatorOption = null;
        if (typeof validator === 'string') {
            validatorOption = clone(this.formlyConfig.getValidator(validator));
        }
        if (typeof validator === 'object' && validator.name) {
            validatorOption = clone(this.formlyConfig.getValidator(validator.name));
            if (validator.options) {
                validatorOption.options = validator.options;
            }
        }
        if (typeof validator === 'object' && validator.expression) {
            const { expression } = validator, options = Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__rest"])(validator, ["expression"]);
            validatorOption = {
                name: validatorName,
                validation: expression,
                options: Object.keys(options).length > 0 ? options : null,
            };
        }
        if (typeof validator === 'function') {
            validatorOption = {
                name: validatorName,
                validation: validator,
            };
        }
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const errors = validatorOption.validation(control, field, validatorOption.options);
            if (isPromise(errors)) {
                return errors.then((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => this.handleAsyncResult(field, validatorName ? !!v : v, validatorOption)));
            }
            if (Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["isObservable"])(errors)) {
                return errors.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => this.handleAsyncResult(field, validatorName ? !!v : v, validatorOption))));
            }
            return this.handleResult(field, validatorName ? !!errors : errors, validatorOption);
        });
    }
    /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} options
     * @return {?}
     */
    handleAsyncResult(field, errors, options) {
        // workaround for https://github.com/angular/angular/issues/13200
        if (field.options && field.options._markForCheck) {
            field.options._markForCheck(field);
        }
        return this.handleResult(field, errors, options);
    }
    /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} __2
     * @return {?}
     */
    handleResult(field, errors, { name, options }) {
        if (typeof errors === 'boolean') {
            errors = errors ? null : { [name]: options ? options : true };
        }
        /** @type {?} */
        const ctrl = field.formControl;
        ctrl['_childrenErrors'] && ctrl['_childrenErrors'][name] && ctrl['_childrenErrors'][name]();
        if (isObject(errors)) {
            Object.keys(errors).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => {
                /** @type {?} */
                const errorPath = errors[name].errorPath
                    ? errors[name].errorPath
                    : (options || {}).errorPath;
                /** @type {?} */
                const childCtrl = errorPath ? field.formControl.get(errorPath) : null;
                if (childCtrl) {
                    const _a = errors[name], opts = Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__rest"])(_a, ["errorPath"]);
                    childCtrl.setErrors(Object.assign({}, (childCtrl.errors || {}), { [name]: opts }));
                    !ctrl['_childrenErrors'] && defineHiddenProp(ctrl, '_childrenErrors', {});
                    ctrl['_childrenErrors'][name] = (/**
                     * @return {?}
                     */
                    () => {
                        const _a = childCtrl.errors || {}, _b = name, toDelete = _a[_b], childErrors = Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__rest"])(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                        childCtrl.setErrors(Object.keys(childErrors).length === 0 ? null : childErrors);
                    });
                }
            }));
        }
        return errors;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class FieldFormExtension {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.parent) {
            return;
        }
        if (field.fieldGroup && !field.key) {
            defineHiddenProp(field, 'formControl', field.parent.formControl);
        }
        else {
            this.addFormControl(field);
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        if (field.parent) {
            return;
        }
        /** @type {?} */
        const fieldsToUpdate = this.setValidators(field);
        if (fieldsToUpdate.length === 0) {
            return;
        }
        if (fieldsToUpdate.length === 1) {
            fieldsToUpdate[0].formControl.updateValueAndValidity();
        }
        else {
            ((/** @type {?} */ (field.formControl)))._updateTreeValidity();
        }
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    addFormControl(field) {
        /** @type {?} */
        let control = findControl(field);
        if (!control) {
            /** @type {?} */
            const controlOptions = { updateOn: field.modelOptions.updateOn };
            /** @type {?} */
            const value = field.key ? getFieldValue(field) : field.defaultValue;
            /** @type {?} */
            const ref = this.config ? this.config.resolveFieldTypeRef(field) : null;
            if (ref && ref.componentType && ref.componentType['createControl']) {
                /** @type {?} */
                const component = ref.componentType;
                console.warn(`NgxFormly: '${component.name}::createControl' is deprecated since v5.0, use 'prePopulate' hook instead.`);
                control = component['createControl'](value, field);
            }
            else if (field.fieldGroup) {
                // TODO: move to postPopulate
                control = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({}, controlOptions);
            }
            else {
                control = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](value, controlOptions);
            }
        }
        registerControl(field, control);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    setValidators(field) {
        /** @type {?} */
        let updateValidity$$1 = false;
        if (field.key || !field.parent) {
            const { formControl: c } = field;
            /** @type {?} */
            const disabled = field.templateOptions ? field.templateOptions.disabled : false;
            if (disabled && c.enabled) {
                c.disable({ emitEvent: false, onlySelf: true });
                updateValidity$$1 = true;
            }
            if (null === c.validator || null === c.asyncValidator) {
                c.setValidators((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const v = _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose(this.mergeValidators(field, '_validators'));
                    return v ? v(c) : null;
                }));
                c.setAsyncValidators((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const v = _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].composeAsync(this.mergeValidators(field, '_asyncValidators'));
                    return v ? v(c) : Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
                }));
                if (!c.parent) {
                    updateValidity(c);
                }
                else {
                    updateValidity$$1 = true;
                }
            }
        }
        /** @type {?} */
        const fieldsToUpdate = updateValidity$$1 ? [field] : [];
        (field.fieldGroup || []).forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            /** @type {?} */
            const childrenToUpdate = this.setValidators(f);
            if (!updateValidity$$1) {
                fieldsToUpdate.push(...childrenToUpdate);
            }
        }));
        return fieldsToUpdate;
    }
    /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    mergeValidators(field, type) {
        /** @type {?} */
        const validators = [];
        /** @type {?} */
        const c = field.formControl;
        if (c && c['_fields'] && c['_fields'].length > 1) {
            c['_fields']
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            (f) => !f._hide))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            (f) => validators.push(...f[type])));
        }
        else {
            validators.push(...field[type]);
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.key && f.fieldGroup))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => validators.push(...this.mergeValidators(f, type))));
        }
        return validators;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class CoreExtension {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
        this.formId = 0;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        this.getFieldComponentInstance(field).prePopulate();
        if (field.parent) {
            return;
        }
        /** @type {?} */
        const fieldTransforms = (field.options && field.options.fieldTransform) || this.formlyConfig.extras.fieldTransform;
        (Array.isArray(fieldTransforms) ? fieldTransforms : [fieldTransforms]).forEach((/**
         * @param {?} fieldTransform
         * @return {?}
         */
        fieldTransform => {
            if (fieldTransform) {
                console.warn(`NgxFormly: fieldTransform is deprecated since v5.0, use custom extension instead.`);
                /** @type {?} */
                const fieldGroup = fieldTransform(field.fieldGroup, field.model, (/** @type {?} */ (field.formControl)), field.options);
                if (!fieldGroup) {
                    throw new Error('fieldTransform must return an array of fields');
                }
            }
        }));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        this.initFieldOptions(field);
        this.getFieldComponentInstance(field).onPopulate();
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @param {?} index
             * @return {?}
             */
            (f, index) => {
                Object.defineProperty(f, 'parent', { get: (/**
                     * @return {?}
                     */
                    () => field), configurable: true });
                Object.defineProperty(f, 'index', { get: (/**
                     * @return {?}
                     */
                    () => index), configurable: true });
                this.formId++;
            }));
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        this.getFieldComponentInstance(field).postPopulate();
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    initFieldOptions(field) {
        /** @type {?} */
        const root = (/** @type {?} */ (field.parent));
        if (!root) {
            return;
        }
        Object.defineProperty(field, 'form', { get: (/**
             * @return {?}
             */
            () => root.formControl), configurable: true });
        Object.defineProperty(field, 'options', { get: (/**
             * @return {?}
             */
            () => root.options), configurable: true });
        Object.defineProperty(field, 'model', {
            get: (/**
             * @return {?}
             */
            () => field.key && field.fieldGroup ? getFieldValue(field) : root.model),
            configurable: true,
        });
        reverseDeepMerge(field, {
            id: getFieldId(`formly_${this.formId}`, field, field['index']),
            hooks: {},
            modelOptions: {},
            templateOptions: !field.type || !field.key ? {} : {
                label: '',
                placeholder: '',
                focus: false,
                disabled: false,
            },
        });
        if (this.formlyConfig.extras.resetFieldOnHide) {
            field['autoClear'] = true;
        }
        if (field.lifecycle) {
            console.warn(`NgxFormly: 'lifecycle' is deprecated since v5.0, use 'hooks' instead.`);
        }
        if (field.type !== 'formly-template'
            && (field.template
                || (field.expressionProperties && field.expressionProperties.template))) {
            if (field.type) {
                console.warn(`NgxFormly: passing 'type' property is not allowed when 'template' is set.`);
            }
            field.type = 'formly-template';
        }
        if (!field.type && field.fieldGroup) {
            field.type = 'formly-group';
        }
        if (field.type) {
            this.formlyConfig.getMergedField(field);
        }
        if (field.parent) {
            /** @type {?} */
            let setDefaultValue = !isUndefined(field.key)
                && !isUndefined(field.defaultValue)
                && isUndefined(getFieldValue(field))
                && (!field['autoClear'] || !(field.hide || field.hideExpression));
            if (setDefaultValue && field['autoClear']) {
                /** @type {?} */
                let parent = field.parent;
                while (parent && !parent.hideExpression && !parent.hide) {
                    parent = parent.parent;
                }
                setDefaultValue = !parent || !(parent.hideExpression || parent.hide);
            }
            if (setDefaultValue) {
                assignFieldValue(field, field.defaultValue);
            }
        }
        this.initFieldWrappers(field);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    initFieldWrappers(field) {
        field.wrappers = field.wrappers || [];
        /** @type {?} */
        const fieldTemplateManipulators = Object.assign({ preWrapper: [], postWrapper: [] }, (field.templateOptions.templateManipulators || {}));
        field.wrappers = [
            ...this.formlyConfig.templateManipulators.preWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...fieldTemplateManipulators.preWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...field.wrappers,
            ...this.formlyConfig.templateManipulators.postWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...fieldTemplateManipulators.postWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
        ].filter((/**
         * @param {?} el
         * @param {?} i
         * @param {?} a
         * @return {?}
         */
        (el, i, a) => el && i === a.indexOf(el)));
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    getFieldComponentInstance(field) {
        /** @type {?} */
        const componentRef = this.formlyConfig.resolveFieldTypeRef(field);
        /** @type {?} */
        const instance = componentRef ? (/** @type {?} */ (componentRef.instance)) : {};
        return {
            prePopulate: (/**
             * @return {?}
             */
            () => instance.prePopulate && instance.prePopulate(field)),
            onPopulate: (/**
             * @return {?}
             */
            () => instance.onPopulate && instance.onPopulate(field)),
            postPopulate: (/**
             * @return {?}
             */
            () => instance.postPopulate && instance.postPopulate(field)),
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} formlyConfig
 * @return {?}
 */
function defaultFormlyConfig(formlyConfig) {
    return {
        types: [
            { name: 'formly-group', component: FormlyGroup },
            { name: 'formly-template', component: FormlyTemplateType },
        ],
        extensions: [
            { name: 'core', extension: new CoreExtension(formlyConfig) },
            { name: 'field-validation', extension: new FieldValidationExtension(formlyConfig) },
            { name: 'field-form', extension: new FieldFormExtension(formlyConfig) },
            { name: 'field-expression', extension: new FieldExpressionExtension() },
        ],
    };
}
class FormlyModule {
    /**
     * @param {?} configService
     * @param {?=} configs
     */
    constructor(configService, configs = []) {
        if (!configs) {
            return;
        }
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        config => configService.addConfig(config)));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_FOR_ENTRY_COMPONENTS"], useValue: config, multi: true },
                FormlyConfig,
                FormlyFormBuilder,
            ],
        };
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_FOR_ENTRY_COMPONENTS"], useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    }
}
FormlyModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: FormlyModule });
FormlyModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function FormlyModule_Factory(t) { return new (t || FormlyModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](FormlyConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](FORMLY_CONFIG, 8)); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]] });
/** @nocollapse */
FormlyModule.ctorParameters = () => [
    { type: FormlyConfig },
    { type: Array, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [FORMLY_CONFIG,] }] }
];
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FormlyModule, { declarations: function () { return [FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage, FormlyTemplateType]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]; }, exports: function () { return [FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FormlyModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    FormlyForm,
                    FormlyField,
                    FormlyAttributes,
                    FormlyGroup,
                    FormlyValidationMessage,
                    FormlyTemplateType,
                ],
                entryComponents: [FormlyGroup, FormlyTemplateType],
                exports: [FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
            }]
    }], function () { return [{ type: FormlyConfig }, { type: Array, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [FORMLY_CONFIG]
            }] }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-core.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/core/node_modules/tslib/tslib.es6.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@ngx-formly/core/node_modules/tslib/tslib.es6.js ***!
  \***********************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-checkbox.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-checkbox.js ***!
  \*************************************************************************************************/
/*! exports provided: FormlyMatCheckboxModule, FormlyFieldCheckbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatCheckboxModule", function() { return FormlyMatCheckboxModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFieldCheckbox", function() { return FormlyFieldCheckbox; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */






function FormlyFieldCheckbox_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
class FormlyFieldCheckbox extends _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FieldType"] {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.defaultOptions = {
            templateOptions: {
                hideFieldUnderline: true,
                indeterminate: true,
                floatLabel: 'always',
                hideLabel: true,
                align: 'start',
                // start or end
                color: 'accent',
            },
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        this.checkbox.focus();
        super.onContainerClick(event);
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.required !== this._required && this.checkbox && this.checkbox._inputElement) {
            this._required = this.required;
            /** @type {?} */
            const inputElement = this.checkbox._inputElement.nativeElement;
            if (this.required) {
                this.renderer.setAttribute(inputElement, 'required', 'required');
            }
            else {
                this.renderer.removeAttribute(inputElement, 'required');
            }
        }
    }
}
FormlyFieldCheckbox.ɵfac = function FormlyFieldCheckbox_Factory(t) { return new (t || FormlyFieldCheckbox)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"])); };
FormlyFieldCheckbox.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: FormlyFieldCheckbox, selectors: [["formly-field-mat-checkbox"]], viewQuery: function FormlyFieldCheckbox_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckbox"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.checkbox = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 9, consts: [[3, "formControl", "id", "formlyAttributes", "tabindex", "indeterminate", "color", "labelPosition"], ["class", "mat-form-field-required-marker", 4, "ngIf"], [1, "mat-form-field-required-marker"]], template: function FormlyFieldCheckbox_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-checkbox", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, FormlyFieldCheckbox_span_2_Template, 2, 0, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.formControl)("id", ctx.id)("formlyAttributes", ctx.field)("tabindex", ctx.to.tabindex)("indeterminate", ctx.to.indeterminate && ctx.formControl.value === null)("color", ctx.to.color)("labelPosition", ctx.to.align || ctx.to.labelPosition);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.to.label, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.to.required && ctx.to.hideRequiredMarker !== true);
    } }, directives: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckbox"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyAttributes"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"]], encapsulation: 2 });
/** @nocollapse */
FormlyFieldCheckbox.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] }
];
FormlyFieldCheckbox.propDecorators = {
    checkbox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckbox"],] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyFieldCheckbox, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'formly-field-mat-checkbox',
                template: `
    <mat-checkbox
      [formControl]="formControl"
      [id]="id"
      [formlyAttributes]="field"
      [tabindex]="to.tabindex"
      [indeterminate]="to.indeterminate && formControl.value === null"
      [color]="to.color"
      [labelPosition]="to.align || to.labelPosition">
      {{ to.label }}
      <span *ngIf="to.required && to.hideRequiredMarker !== true" class="mat-form-field-required-marker">*</span>
    </mat-checkbox>
  `
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] }]; }, { checkbox: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckbox"]]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatCheckboxModule {
}
FormlyMatCheckboxModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: FormlyMatCheckboxModule });
FormlyMatCheckboxModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function FormlyMatCheckboxModule_Factory(t) { return new (t || FormlyMatCheckboxModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FormlyMatFormFieldModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"].forChild({
                types: [
                    {
                        name: 'checkbox',
                        component: FormlyFieldCheckbox,
                        wrappers: ['form-field']
                    },
                ]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](FormlyMatCheckboxModule, { declarations: function () { return [FormlyFieldCheckbox]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
        _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FormlyMatFormFieldModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyMatCheckboxModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                declarations: [FormlyFieldCheckbox],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FormlyMatFormFieldModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"].forChild({
                        types: [
                            {
                                name: 'checkbox',
                                component: FormlyFieldCheckbox,
                                wrappers: ['form-field']
                            },
                        ]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-checkbox.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js ***!
  \***************************************************************************************************/
/*! exports provided: FormlyMatFormFieldModule, FieldType, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatFormFieldModule", function() { return FormlyMatFormFieldModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return FieldType$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return FormlyWrapperFormField; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/a11y.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */






const _c0 = ["matPrefix"];
const _c1 = ["matSuffix"];
const _c2 = ["fieldComponent"];
function FormlyWrapperFormField_mat_label_3_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function FormlyWrapperFormField_mat_label_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, FormlyWrapperFormField_mat_label_3_span_2_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.to.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.to.required && ctx_r1.to.hideRequiredMarker !== true);
} }
function FormlyWrapperFormField_ng_container_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainer"](0);
} }
function FormlyWrapperFormField_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, FormlyWrapperFormField_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngTemplateOutlet", ctx_r2.to.prefix ? ctx_r2.to.prefix : ctx_r2.formlyField._matprefix);
} }
function FormlyWrapperFormField_ng_container_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainer"](0);
} }
function FormlyWrapperFormField_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, FormlyWrapperFormField_ng_container_5_ng_container_1_Template, 1, 0, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngTemplateOutlet", ctx_r3.to.suffix ? ctx_r3.to.suffix : ctx_r3.formlyField._matsuffix);
} }
function FormlyWrapperFormField_mat_hint_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-hint", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r4.to.description);
} }
class FormlyErrorStateMatcher {
    /**
     * @param {?} field
     */
    constructor(field) {
        this.field = field;
    }
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    isErrorState(control, form) {
        return this.field && this.field.showError;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
class FieldType$1 extends _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FieldType"] {
    constructor() {
        super(...arguments);
        this.errorStateMatcher = new FormlyErrorStateMatcher(this);
        this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this._errorState = false;
    }
    /**
     * @return {?}
     */
    get formFieldControl() { return this._control || this; }
    /**
     * @param {?} control
     * @return {?}
     */
    set formFieldControl(control) {
        this._control = control;
        if (this.formField && control !== this.formField._control) {
            this.formField._control = control;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.formField) {
            this.formField._control = this.formFieldControl;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.matPrefix || this.matSuffix) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                Object(_ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["ɵdefineHiddenProp"])(this.field, '_matprefix', this.matPrefix);
                Object(_ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["ɵdefineHiddenProp"])(this.field, '_matsuffix', this.matSuffix);
                ((/** @type {?} */ (this.options)))._markForCheck(this.field);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.formField) {
            delete this.formField._control;
        }
        this.stateChanges.complete();
    }
    /**
     * @param {?} ids
     * @return {?}
     */
    setDescribedByIds(ids) { }
    /**
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        this.field.focus = true;
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get errorState() {
        /** @type {?} */
        const showError = (/** @type {?} */ ((/** @type {?} */ (this.options)).showError))(this);
        if (showError !== this._errorState) {
            this._errorState = showError;
            this.stateChanges.next();
        }
        return showError;
    }
    /**
     * @return {?}
     */
    get controlType() {
        if (this.to.type) {
            return this.to.type;
        }
        if (((/** @type {?} */ (this.field.type))) instanceof _angular_core__WEBPACK_IMPORTED_MODULE_4__["Type"]) {
            return (/** @type {?} */ (this.field.type)).constructor.name;
        }
        return (/** @type {?} */ (this.field.type));
    }
    /**
     * @return {?}
     */
    get focused() { return !!this.field.focus && !this.disabled; }
    /**
     * @return {?}
     */
    get disabled() { return !!this.to.disabled; }
    /**
     * @return {?}
     */
    get required() { return !!this.to.required; }
    /**
     * @return {?}
     */
    get placeholder() { return this.to.placeholder || ''; }
    /**
     * @return {?}
     */
    get shouldPlaceholderFloat() { return this.shouldLabelFloat; }
    /**
     * @return {?}
     */
    get value() { return this.formControl.value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this.formControl.patchValue(value); }
    /**
     * @return {?}
     */
    get ngControl() { return (/** @type {?} */ (this.formControl)); }
    /**
     * @return {?}
     */
    get empty() { return this.value === undefined || this.value === null || this.value === ''; }
    /**
     * @return {?}
     */
    get shouldLabelFloat() { return this.focused || !this.empty; }
    /**
     * @return {?}
     */
    get formField() { return this.field ? ((/** @type {?} */ (this.field)))['__formField__'] : null; }
}
FieldType$1.ɵfac = function FieldType$1_Factory(t) { return ɵFieldType$1_BaseFactory(t || FieldType$1); };
FieldType$1.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineDirective"]({ type: FieldType$1, viewQuery: function FieldType$1_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.matPrefix = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.matSuffix = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]] });
FieldType$1.propDecorators = {
    matPrefix: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: ['matPrefix',] }],
    matSuffix: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: ['matSuffix',] }]
};
const ɵFieldType$1_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetInheritedFactory"](FieldType$1);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyWrapperFormField extends _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FieldWrapper"] {
    /**
     * @param {?} config
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} focusMonitor
     */
    constructor(config, renderer, elementRef, focusMonitor) {
        super();
        this.config = config;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this._errorState = false;
        this.initialGapCalculated = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formField._control = this;
        Object(_ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["ɵdefineHiddenProp"])(this.field, '__formField__', this.formField);
        /** @type {?} */
        const ref = this.config.resolveFieldTypeRef(this.formlyField);
        if (ref && !(ref.instance instanceof FieldType$1)) {
            console.warn(`Component '${ref.componentType.name}' must extend 'FieldType' from '@ngx-formly/material/form-field'.`);
        }
        // fix for https://github.com/angular/material2/issues/11437
        if (this.formlyField.hide && (/** @type {?} */ (this.formlyField.templateOptions)).appearance === 'outline') {
            this.initialGapCalculated = true;
        }
        this.focusMonitor.monitor(this.elementRef, true).subscribe((/**
         * @param {?} origin
         * @return {?}
         */
        origin => {
            if (!origin && this.field.focus) {
                this.field.focus = false;
            }
            this.stateChanges.next();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (!this.initialGapCalculated || this.formlyField.hide) {
            return;
        }
        this.formField.updateOutlineGap();
        this.initialGapCalculated = true;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // temporary fix for https://github.com/angular/material2/issues/7891
        if (this.formField.appearance !== 'outline' && this.to.hideFieldUnderline === true) {
            /** @type {?} */
            const underlineElement = this.formField._elementRef.nativeElement.querySelector('.mat-form-field-underline');
            underlineElement && this.renderer.removeChild(underlineElement.parentNode, underlineElement);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        delete this.formlyField.__formField__;
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
    /**
     * @param {?} ids
     * @return {?}
     */
    setDescribedByIds(ids) { }
    /**
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        this.formlyField.focus = true;
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get errorState() {
        /** @type {?} */
        const showError = (/** @type {?} */ ((/** @type {?} */ (this.options)).showError))(this);
        if (showError !== this._errorState) {
            this._errorState = showError;
            this.stateChanges.next();
        }
        return showError;
    }
    /**
     * @return {?}
     */
    get controlType() { return this.to.type; }
    /**
     * @return {?}
     */
    get focused() { return !!this.formlyField.focus && !this.disabled; }
    /**
     * @return {?}
     */
    get disabled() { return !!this.to.disabled; }
    /**
     * @return {?}
     */
    get required() { return !!this.to.required; }
    /**
     * @return {?}
     */
    get placeholder() { return this.to.placeholder || ''; }
    /**
     * @return {?}
     */
    get shouldPlaceholderFloat() { return this.shouldLabelFloat; }
    /**
     * @return {?}
     */
    get value() { return this.formControl.value; }
    /**
     * @return {?}
     */
    get ngControl() { return (/** @type {?} */ (this.formControl)); }
    /**
     * @return {?}
     */
    get empty() { return !this.formControl.value; }
    /**
     * @return {?}
     */
    get shouldLabelFloat() { return this.focused || !this.empty; }
    /**
     * @return {?}
     */
    get formlyField() { return (/** @type {?} */ (this.field)); }
}
FormlyWrapperFormField.ɵfac = function FormlyWrapperFormField_Factory(t) { return new (t || FormlyWrapperFormField)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FormlyConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["FocusMonitor"])); };
FormlyWrapperFormField.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FormlyWrapperFormField, selectors: [["formly-wrapper-mat-form-field"]], viewQuery: function FormlyWrapperFormField_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstaticViewQuery"](_c2, true, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstaticViewQuery"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.fieldComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.formField = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([{ provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], useExisting: FormlyWrapperFormField }]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 11, consts: [[3, "hideRequiredMarker", "floatLabel", "appearance", "color"], ["fieldComponent", ""], [4, "ngIf"], ["matPrefix", "", 4, "ngIf"], ["matSuffix", "", 4, "ngIf"], [3, "field"], [3, "id", 4, "ngIf"], ["class", "mat-form-field-required-marker", 4, "ngIf"], [1, "mat-form-field-required-marker"], ["matPrefix", ""], [4, "ngTemplateOutlet"], ["matSuffix", ""], [3, "id"]], template: function FormlyWrapperFormField_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainer"](1, null, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, FormlyWrapperFormField_mat_label_3_Template, 3, 2, "mat-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, FormlyWrapperFormField_ng_container_4_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, FormlyWrapperFormField_ng_container_5_Template, 2, 1, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "formly-validation-message", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, FormlyWrapperFormField_mat_hint_8_Template, 2, 2, "mat-hint", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("width", "100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("hideRequiredMarker", true)("floatLabel", ctx.to.floatLabel)("appearance", ctx.to.appearance)("color", ctx.to.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.to.label && ctx.to.hideLabel !== true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.to.prefix || ctx.formlyField._matprefix);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.to.suffix || ctx.formlyField._matsuffix);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("field", ctx.field);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.to.description);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["ɵc"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatLabel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatPrefix"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgTemplateOutlet"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatSuffix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatHint"]], encapsulation: 2 });
/** @nocollapse */
FormlyWrapperFormField.ctorParameters = () => [
    { type: _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FormlyConfig"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Renderer2"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["FocusMonitor"] }
];
FormlyWrapperFormField.propDecorators = {
    fieldComponent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: ['fieldComponent', (/** @type {?} */ ({ read: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"], static: true })),] }],
    formField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], (/** @type {?} */ ({ static: true })),] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](FormlyWrapperFormField, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"],
        args: [{
                selector: 'formly-wrapper-mat-form-field',
                template: `
    <!-- fix https://github.com/angular/material2/pull/7083 by setting width to 100% -->
    <mat-form-field
      [hideRequiredMarker]="true"
      [floatLabel]="to.floatLabel"
      [appearance]="to.appearance"
      [color]="to.color"
      [style.width]="'100%'">
      <ng-container #fieldComponent></ng-container>
      <mat-label *ngIf="to.label && to.hideLabel !== true">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true" class="mat-form-field-required-marker">*</span>
      </mat-label>

      <ng-container matPrefix *ngIf="to.prefix || formlyField._matprefix">
        <ng-container *ngTemplateOutlet="to.prefix ? to.prefix : formlyField._matprefix"></ng-container>
      </ng-container>

      <ng-container matSuffix *ngIf="to.suffix || formlyField._matsuffix">
        <ng-container *ngTemplateOutlet="to.suffix ? to.suffix : formlyField._matsuffix"></ng-container>
      </ng-container>

      <mat-error>
        <formly-validation-message [field]="field"></formly-validation-message>
      </mat-error>
      <!-- fix https://github.com/angular/material2/issues/7737 by setting id to null  -->
      <mat-hint *ngIf="to.description" [id]="null">{{ to.description }}</mat-hint>
    </mat-form-field>
  `,
                providers: [{ provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], useExisting: FormlyWrapperFormField }]
            }]
    }], function () { return [{ type: _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FormlyConfig"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["FocusMonitor"] }]; }, { fieldComponent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"],
            args: ['fieldComponent', ( /** @type {?} */({ read: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"], static: true }))]
        }], formField: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"],
            args: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], ( /** @type {?} */({ static: true }))]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatFormFieldModule {
}
FormlyMatFormFieldModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: FormlyMatFormFieldModule });
FormlyMatFormFieldModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function FormlyMatFormFieldModule_Factory(t) { return new (t || FormlyMatFormFieldModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FormlyModule"].forChild({
                wrappers: [{
                        name: 'form-field',
                        component: FormlyWrapperFormField
                    }]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](FormlyMatFormFieldModule, { declarations: function () { return [FormlyWrapperFormField]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](FormlyMatFormFieldModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"],
        args: [{
                declarations: [FormlyWrapperFormField],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__["FormlyModule"].forChild({
                        wrappers: [{
                                name: 'form-field',
                                component: FormlyWrapperFormField
                            }]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-form-field.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-input.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-input.js ***!
  \**********************************************************************************************/
/*! exports provided: FormlyMatInputModule, FormlyFieldInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatInputModule", function() { return FormlyMatInputModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFieldInput", function() { return FormlyFieldInput; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */






function FormlyFieldInput_input_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "input", 2);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("id", ctx_r0.id)("type", ctx_r0.type || "text")("readonly", ctx_r0.to.readonly)("required", ctx_r0.to.required)("errorStateMatcher", ctx_r0.errorStateMatcher)("formControl", ctx_r0.formControl)("formlyAttributes", ctx_r0.field)("tabindex", ctx_r0.to.tabindex)("placeholder", ctx_r0.to.placeholder);
} }
function FormlyFieldInput_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "input", 3);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("id", ctx_r2.id)("readonly", ctx_r2.to.readonly)("required", ctx_r2.to.required)("errorStateMatcher", ctx_r2.errorStateMatcher)("formControl", ctx_r2.formControl)("formlyAttributes", ctx_r2.field)("tabindex", ctx_r2.to.tabindex)("placeholder", ctx_r2.to.placeholder);
} }
class FormlyFieldInput extends _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FieldType"] {
    /**
     * @return {?}
     */
    get type() {
        return this.to.type || 'text';
    }
}
FormlyFieldInput.ɵfac = function FormlyFieldInput_Factory(t) { return ɵFormlyFieldInput_BaseFactory(t || FormlyFieldInput); };
FormlyFieldInput.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: FormlyFieldInput, selectors: [["formly-field-mat-input"]], viewQuery: function FormlyFieldInput_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.formFieldControl = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 2, consts: [["matInput", "", 3, "id", "type", "readonly", "required", "errorStateMatcher", "formControl", "formlyAttributes", "tabindex", "placeholder", 4, "ngIf", "ngIfElse"], ["numberTmp", ""], ["matInput", "", 3, "id", "type", "readonly", "required", "errorStateMatcher", "formControl", "formlyAttributes", "tabindex", "placeholder"], ["matInput", "", "type", "number", 3, "id", "readonly", "required", "errorStateMatcher", "formControl", "formlyAttributes", "tabindex", "placeholder"]], template: function FormlyFieldInput_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, FormlyFieldInput_input_0_Template, 1, 9, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, FormlyFieldInput_ng_template_1_Template, 1, 8, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.type !== "number")("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyAttributes"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"]], encapsulation: 2 });
FormlyFieldInput.propDecorators = {
    formFieldControl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], (/** @type {?} */ ({ static: false })),] }]
};
const ɵFormlyFieldInput_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetInheritedFactory"](FormlyFieldInput);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyFieldInput, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'formly-field-mat-input',
                template: `
    <input *ngIf="type !== 'number'; else numberTmp"
      matInput
      [id]="id"
      [type]="type || 'text'"
      [readonly]="to.readonly"
      [required]="to.required"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabindex]="to.tabindex"
      [placeholder]="to.placeholder">
    <ng-template #numberTmp>
      <input matInput
             [id]="id"
             type="number"
             [readonly]="to.readonly"
             [required]="to.required"
             [errorStateMatcher]="errorStateMatcher"
             [formControl]="formControl"
             [formlyAttributes]="field"
             [tabindex]="to.tabindex"
             [placeholder]="to.placeholder">
    </ng-template>
  `
            }]
    }], null, { formFieldControl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], ( /** @type {?} */({ static: false }))]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatInputModule {
}
FormlyMatInputModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: FormlyMatInputModule });
FormlyMatInputModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function FormlyMatInputModule_Factory(t) { return new (t || FormlyMatInputModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"].forChild({
                types: [
                    {
                        name: 'input',
                        component: FormlyFieldInput,
                        wrappers: ['form-field']
                    },
                ]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](FormlyMatInputModule, { declarations: function () { return [FormlyFieldInput]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
        _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyMatInputModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                declarations: [FormlyFieldInput],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"].forChild({
                        types: [
                            {
                                name: 'input',
                                component: FormlyFieldInput,
                                wrappers: ['form-field']
                            },
                        ]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-input.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-multicheckbox.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-multicheckbox.js ***!
  \******************************************************************************************************/
/*! exports provided: FormlyMatMultiCheckboxModule, FormlyFieldMultiCheckbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatMultiCheckboxModule", function() { return FormlyMatMultiCheckboxModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFieldMultiCheckbox", function() { return FormlyFieldMultiCheckbox; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/core/select */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core-select.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */






function FormlyFieldMultiCheckbox_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-checkbox", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function FormlyFieldMultiCheckbox_ng_container_0_Template_mat_checkbox_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const option_r1 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r3.onChange(option_r1.value, $event.checked); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", ctx_r0.id + "_" + i_r2)("formlyAttributes", ctx_r0.field)("tabindex", ctx_r0.to.tabindex)("color", ctx_r0.to.color)("labelPosition", ctx_r0.to.labelPosition)("checked", ctx_r0.isChecked(option_r1))("disabled", ctx_r0.formControl.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", option_r1.label, " ");
} }
class FormlyFieldMultiCheckbox extends _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FieldType"] {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                hideFieldUnderline: true,
                floatLabel: 'always',
                options: [],
                color: 'accent',
            },
        };
    }
    /**
     * @param {?} value
     * @param {?} checked
     * @return {?}
     */
    onChange(value, checked) {
        if (this.to.type === 'array') {
            this.formControl.patchValue(checked
                ? [...(this.formControl.value || []), value]
                : [...(this.formControl.value || [])].filter((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => o !== value)));
        }
        else {
            this.formControl.patchValue(Object.assign({}, this.formControl.value, { [value]: checked }));
        }
        this.formControl.markAsTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        if (this.checkboxes.length) {
            this.checkboxes.first.focus();
        }
        super.onContainerClick(event);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    isChecked(option) {
        /** @type {?} */
        const value = this.formControl.value;
        return value && (this.to.type === 'array'
            ? (value.indexOf(option.value) !== -1)
            : value[option.value]);
    }
}
FormlyFieldMultiCheckbox.ɵfac = function FormlyFieldMultiCheckbox_Factory(t) { return ɵFormlyFieldMultiCheckbox_BaseFactory(t || FormlyFieldMultiCheckbox); };
FormlyFieldMultiCheckbox.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FormlyFieldMultiCheckbox, selectors: [["formly-field-mat-multicheckbox"]], viewQuery: function FormlyFieldMultiCheckbox_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.checkboxes = _t);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 6, consts: [[4, "ngFor", "ngForOf"], [3, "id", "formlyAttributes", "tabindex", "color", "labelPosition", "checked", "disabled", "change"]], template: function FormlyFieldMultiCheckbox_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, FormlyFieldMultiCheckbox_ng_container_0_Template, 3, 8, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "formlySelectOptions");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 3, ctx.to.options, ctx.field)));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyAttributes"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"], _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["ɵa"]], encapsulation: 2 });
FormlyFieldMultiCheckbox.propDecorators = {
    checkboxes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChildren"], args: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"],] }]
};
const ɵFormlyFieldMultiCheckbox_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetInheritedFactory"](FormlyFieldMultiCheckbox);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](FormlyFieldMultiCheckbox, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"],
        args: [{
                selector: 'formly-field-mat-multicheckbox',
                template: `
    <ng-container *ngFor="let option of to.options | formlySelectOptions:field | async; let i = index;">
      <mat-checkbox
        [id]="id + '_' + i"
        [formlyAttributes]="field"
        [tabindex]="to.tabindex"
        [color]="to.color"
        [labelPosition]="to.labelPosition"
        [checked]="isChecked(option)"
        [disabled]="formControl.disabled"
        (change)="onChange(option.value, $event.checked)">
          {{ option.label }}
      </mat-checkbox>
    </ng-container>
  `
            }]
    }], null, { checkboxes: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChildren"],
            args: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"]]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatMultiCheckboxModule {
}
FormlyMatMultiCheckboxModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: FormlyMatMultiCheckboxModule });
FormlyMatMultiCheckboxModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function FormlyMatMultiCheckboxModule_Factory(t) { return new (t || FormlyMatMultiCheckboxModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
            _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["FormlySelectModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forChild({
                types: [
                    {
                        name: 'multicheckbox',
                        component: FormlyFieldMultiCheckbox,
                        wrappers: ['form-field']
                    },
                ]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](FormlyMatMultiCheckboxModule, { declarations: function () { return [FormlyFieldMultiCheckbox]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
        _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
        _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["FormlySelectModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](FormlyMatMultiCheckboxModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"],
        args: [{
                declarations: [FormlyFieldMultiCheckbox],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
                    _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["FormlySelectModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forChild({
                        types: [
                            {
                                name: 'multicheckbox',
                                component: FormlyFieldMultiCheckbox,
                                wrappers: ['form-field']
                            },
                        ]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-multicheckbox.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-radio.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-radio.js ***!
  \**********************************************************************************************/
/*! exports provided: FormlyMatRadioModule, FormlyFieldRadio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatRadioModule", function() { return FormlyMatRadioModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFieldRadio", function() { return FormlyFieldRadio; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-formly/core/select */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core-select.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/radio.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */







function FormlyFieldRadio_mat_radio_button_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-radio-button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("id", ctx_r0.id + "_" + i_r2)("color", ctx_r0.to.color)("labelPosition", ctx_r0.to.labelPosition)("disabled", option_r1.disabled)("value", option_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", option_r1.label, " ");
} }
class FormlyFieldRadio extends _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FieldType"] {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                hideFieldUnderline: true,
                floatLabel: 'always',
                options: [],
                tabindex: -1,
            },
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.focusObserver = Object(_ngx_formly_core__WEBPACK_IMPORTED_MODULE_6__["ɵwrapProperty"])(this.field, 'focus', (/**
         * @param {?} __0
         * @return {?}
         */
        ({ currentValue }) => {
            if (this.to.tabindex === -1
                && currentValue
                && this.radioGroup._radios.length > 0) {
                /** @type {?} */
                const radio = this.radioGroup.selected
                    ? this.radioGroup.selected
                    : this.radioGroup._radios.first;
                radio.focus();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusObserver && this.focusObserver();
    }
}
FormlyFieldRadio.ɵfac = function FormlyFieldRadio_Factory(t) { return ɵFormlyFieldRadio_BaseFactory(t || FormlyFieldRadio); };
FormlyFieldRadio.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: FormlyFieldRadio, selectors: [["formly-field-mat-radio"]], viewQuery: function FormlyFieldRadio_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioGroup"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.radioGroup = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 10, consts: [[3, "formControl", "formlyAttributes", "required", "tabindex"], [3, "id", "color", "labelPosition", "disabled", "value", 4, "ngFor", "ngForOf"], [3, "id", "color", "labelPosition", "disabled", "value"]], template: function FormlyFieldRadio_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-radio-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, FormlyFieldRadio_mat_radio_button_1_Template, 2, 6, "mat-radio-button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "formlySelectOptions");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.formControl)("formlyAttributes", ctx.field)("required", ctx.to.required)("tabindex", ctx.to.tabindex);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](3, 7, ctx.to.options, ctx.field)));
    } }, directives: [_angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_6__["FormlyAttributes"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["RequiredValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"], _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_2__["ɵa"]], encapsulation: 2 });
FormlyFieldRadio.propDecorators = {
    radioGroup: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioGroup"],] }]
};
const ɵFormlyFieldRadio_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetInheritedFactory"](FormlyFieldRadio);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyFieldRadio, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'formly-field-mat-radio',
                template: `
    <mat-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field"
      [required]="to.required"
      [tabindex]="to.tabindex">
      <mat-radio-button *ngFor="let option of to.options | formlySelectOptions:field | async; let i = index;"
        [id]="id + '_' + i"
        [color]="to.color"
        [labelPosition]="to.labelPosition"
        [disabled]="option.disabled"
        [value]="option.value">
        {{ option.label }}
      </mat-radio-button>
    </mat-radio-group>
  `
            }]
    }], null, { radioGroup: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioGroup"]]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatRadioModule {
}
FormlyMatRadioModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: FormlyMatRadioModule });
FormlyMatRadioModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function FormlyMatRadioModule_Factory(t) { return new (t || FormlyMatRadioModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FormlyMatFormFieldModule"],
            _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_2__["FormlySelectModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_6__["FormlyModule"].forChild({
                types: [{
                        name: 'radio',
                        component: FormlyFieldRadio,
                        wrappers: ['form-field']
                    }]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](FormlyMatRadioModule, { declarations: function () { return [FormlyFieldRadio]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
        _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FormlyMatFormFieldModule"],
        _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_2__["FormlySelectModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_6__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyMatRadioModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                declarations: [FormlyFieldRadio],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_4__["FormlyMatFormFieldModule"],
                    _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_2__["FormlySelectModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_6__["FormlyModule"].forChild({
                        types: [{
                                name: 'radio',
                                component: FormlyFieldRadio,
                                wrappers: ['form-field']
                            }]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-radio.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-select.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-select.js ***!
  \***********************************************************************************************/
/*! exports provided: FormlyMatSelectModule, FormlyFieldSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatSelectModule", function() { return FormlyMatSelectModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFieldSelect", function() { return FormlyFieldSelect; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/core/select */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core-select.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/select.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */








function FormlyFieldSelect_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FormlyFieldSelect_ng_template_0_Template_mat_option_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5); const selectOptions_r3 = ctx.selectOptions; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r4.toggleSelectAll(selectOptions_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "mat-pseudo-checkbox", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const selectOptions_r3 = ctx.selectOptions;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("state", ctx_r1.getSelectAllState(selectOptions_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.to.selectAllOption, " ");
} }
const _c0 = function (a0) { return { selectOptions: a0 }; };
function FormlyFieldSelect_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainer"](0, 7);
} if (rf & 2) {
    const selectOptions_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngTemplateOutlet", _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](2, _c0, selectOptions_r6));
} }
function FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const child_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", child_r14.value)("disabled", child_r14.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", child_r14.label, " ");
} }
function FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-optgroup", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_mat_option_1_Template, 2, 3, "mat-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("label", item_r10.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", item_r10.group);
} }
function FormlyFieldSelect_ng_container_3_ng_container_2_mat_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", item_r10.value)("disabled", item_r10.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r10.label);
} }
function FormlyFieldSelect_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, FormlyFieldSelect_ng_container_3_ng_container_2_mat_option_2_Template, 2, 3, "mat-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r10.group);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !item_r10.group);
} }
function FormlyFieldSelect_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, FormlyFieldSelect_ng_container_3_ng_container_1_Template, 1, 4, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, FormlyFieldSelect_ng_container_3_ng_container_2_Template, 3, 2, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const selectOptions_r6 = ctx.ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.to.multiple && ctx_r2.to.selectAllOption);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", selectOptions_r6);
} }
class FormlyFieldSelect extends _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_6__["FieldType"] {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                options: [],
                /**
                 * @param {?} o1
                 * @param {?} o2
                 * @return {?}
                 */
                compareWith(o1, o2) {
                    return o1 === o2;
                },
            },
        };
    }
    /**
     * @param {?} options
     * @return {?}
     */
    getSelectAllState(options) {
        if (this.empty || this.value.length === 0) {
            return '';
        }
        return this.value.length !== this.getSelectAllValue(options).length
            ? 'indeterminate'
            : 'checked';
    }
    /**
     * @param {?} options
     * @return {?}
     */
    toggleSelectAll(options) {
        /** @type {?} */
        const selectAllValue = this.getSelectAllValue(options);
        this.formControl.setValue(!this.value || this.value.length !== selectAllValue.length
            ? selectAllValue
            : []);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    change($event) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
    }
    /**
     * @return {?}
     */
    _getAriaLabelledby() {
        if (this.to.attributes && this.to.attributes['aria-labelledby']) {
            return this.to.attributes['aria-labelledby'];
        }
        if (this.formField && this.formField._labelId) {
            return this.formField._labelId;
        }
        return null;
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    getSelectAllValue(options) {
        if (!this.selectAllValue || options !== this.selectAllValue.options) {
            /** @type {?} */
            const flatOptions = [];
            options.forEach((/**
             * @param {?} o
             * @return {?}
             */
            o => o.group
                ? flatOptions.push(...o.group)
                : flatOptions.push(o)));
            this.selectAllValue = {
                options,
                value: flatOptions.map((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => o.value)),
            };
        }
        return this.selectAllValue.value;
    }
}
FormlyFieldSelect.ɵfac = function FormlyFieldSelect_Factory(t) { return ɵFormlyFieldSelect_BaseFactory(t || FormlyFieldSelect); };
FormlyFieldSelect.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FormlyFieldSelect, selectors: [["formly-field-mat-select"]], viewQuery: function FormlyFieldSelect_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstaticViewQuery"](_angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelect"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.formFieldControl = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 6, vars: 17, consts: [["selectAll", ""], [3, "id", "formControl", "formlyAttributes", "placeholder", "tabindex", "required", "compareWith", "multiple", "errorStateMatcher", "aria-labelledby", "disableOptionCentering", "selectionChange"], [4, "ngIf"], [3, "click"], [1, "mat-option-pseudo-checkbox", 3, "state"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "label", 4, "ngIf"], [3, "value", "disabled", 4, "ngIf"], [3, "label"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "disabled"]], template: function FormlyFieldSelect_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, FormlyFieldSelect_ng_template_0_Template, 3, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "mat-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectionChange", function FormlyFieldSelect_Template_mat_select_selectionChange_2_listener($event) { return ctx.change($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, FormlyFieldSelect_ng_container_3_Template, 3, 2, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "formlySelectOptions");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", ctx.id)("formControl", ctx.formControl)("formlyAttributes", ctx.field)("placeholder", ctx.to.placeholder)("tabindex", ctx.to.tabindex)("required", ctx.to.required)("compareWith", ctx.to.compareWith)("multiple", ctx.to.multiple)("errorStateMatcher", ctx.errorStateMatcher)("aria-labelledby", ctx._getAriaLabelledby())("disableOptionCentering", ctx.to.disableOptionCentering);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 12, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](5, 14, ctx.to.options, ctx.field)));
    } }, directives: [_angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyAttributes"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["RequiredValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatPseudoCheckbox"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgTemplateOutlet"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatOptgroup"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"], _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["ɵa"]], encapsulation: 2 });
FormlyFieldSelect.propDecorators = {
    formFieldControl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: [_angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelect"], (/** @type {?} */ ({ static: true })),] }]
};
const ɵFormlyFieldSelect_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetInheritedFactory"](FormlyFieldSelect);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](FormlyFieldSelect, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"],
        args: [{
                selector: 'formly-field-mat-select',
                template: `
    <ng-template #selectAll let-selectOptions="selectOptions">
      <mat-option (click)="toggleSelectAll(selectOptions)">
        <mat-pseudo-checkbox class="mat-option-pseudo-checkbox"
          [state]="getSelectAllState(selectOptions)">
        </mat-pseudo-checkbox>
        {{ to.selectAllOption }}
      </mat-option>
    </ng-template>

    <mat-select [id]="id"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder"
      [tabindex]="to.tabindex"
      [required]="to.required"
      [compareWith]="to.compareWith"
      [multiple]="to.multiple"
      (selectionChange)="change($event)"
      [errorStateMatcher]="errorStateMatcher"
      [aria-labelledby]="_getAriaLabelledby()"
      [disableOptionCentering]="to.disableOptionCentering"
      >
      <ng-container *ngIf="to.options | formlySelectOptions:field | async as selectOptions">
        <ng-container *ngIf="to.multiple && to.selectAllOption" [ngTemplateOutlet]="selectAll" [ngTemplateOutletContext]="{ selectOptions: selectOptions }">
        </ng-container>
        <ng-container *ngFor="let item of selectOptions">
          <mat-optgroup *ngIf="item.group" [label]="item.label">
            <mat-option *ngFor="let child of item.group" [value]="child.value" [disabled]="child.disabled">
              {{ child.label }}
            </mat-option>
          </mat-optgroup>
          <mat-option *ngIf="!item.group" [value]="item.value" [disabled]="item.disabled">{{ item.label }}</mat-option>
        </ng-container>
      </ng-container>
    </mat-select>
  `
            }]
    }], null, { formFieldControl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"],
            args: [_angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelect"], ( /** @type {?} */({ static: true }))]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatSelectModule {
}
FormlyMatSelectModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: FormlyMatSelectModule });
FormlyMatSelectModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function FormlyMatSelectModule_Factory(t) { return new (t || FormlyMatSelectModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatPseudoCheckboxModule"],
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_6__["FormlyMatFormFieldModule"],
            _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["FormlySelectModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forChild({
                types: [{
                        name: 'select',
                        component: FormlyFieldSelect,
                        wrappers: ['form-field']
                    }]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](FormlyMatSelectModule, { declarations: function () { return [FormlyFieldSelect]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatPseudoCheckboxModule"],
        _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_6__["FormlyMatFormFieldModule"],
        _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["FormlySelectModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](FormlyMatSelectModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"],
        args: [{
                declarations: [FormlyFieldSelect],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatPseudoCheckboxModule"],
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_6__["FormlyMatFormFieldModule"],
                    _ngx_formly_core_select__WEBPACK_IMPORTED_MODULE_3__["FormlySelectModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forChild({
                        types: [{
                                name: 'select',
                                component: FormlyFieldSelect,
                                wrappers: ['form-field']
                            }]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-select.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-textarea.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-textarea.js ***!
  \*************************************************************************************************/
/*! exports provided: FormlyMatTextAreaModule, FormlyFieldTextArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMatTextAreaModule", function() { return FormlyMatTextAreaModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyFieldTextArea", function() { return FormlyFieldTextArea; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/text-field.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */





class FormlyFieldTextArea extends _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FieldType"] {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                cols: 1,
                rows: 1,
            },
        };
    }
}
FormlyFieldTextArea.ɵfac = function FormlyFieldTextArea_Factory(t) { return ɵFormlyFieldTextArea_BaseFactory(t || FormlyFieldTextArea); };
FormlyFieldTextArea.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: FormlyFieldTextArea, selectors: [["formly-field-mat-textarea"]], viewQuery: function FormlyFieldTextArea_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstaticViewQuery"](_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.formFieldControl = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([
            // fix for https://github.com/ngx-formly/ngx-formly/issues/1688
            // rely on formControl value instead of elementRef which return empty value in Firefox.
            { provide: _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MAT_INPUT_VALUE_ACCESSOR"], useExisting: FormlyFieldTextArea },
        ]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 15, consts: [["matInput", "", 3, "id", "readonly", "required", "formControl", "errorStateMatcher", "cols", "rows", "formlyAttributes", "placeholder", "tabindex", "cdkTextareaAutosize", "cdkAutosizeMinRows", "cdkAutosizeMaxRows"]], template: function FormlyFieldTextArea_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "textarea", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "    ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("cdk-textarea-autosize", ctx.to.autosize);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("id", ctx.id)("readonly", ctx.to.readonly)("required", ctx.to.required)("formControl", ctx.formControl)("errorStateMatcher", ctx.errorStateMatcher)("cols", ctx.to.cols)("rows", ctx.to.rows)("formlyAttributes", ctx.field)("placeholder", ctx.to.placeholder)("tabindex", ctx.to.tabindex)("cdkTextareaAutosize", ctx.to.autosize)("cdkAutosizeMinRows", ctx.to.autosizeMinRows)("cdkAutosizeMaxRows", ctx.to.autosizeMaxRows);
    } }, directives: [_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__["CdkTextareaAutosize"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyAttributes"]], encapsulation: 2 });
FormlyFieldTextArea.propDecorators = {
    formFieldControl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], (/** @type {?} */ ({ static: true })),] }]
};
const ɵFormlyFieldTextArea_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetInheritedFactory"](FormlyFieldTextArea);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyFieldTextArea, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'formly-field-mat-textarea',
                template: `
    <textarea matInput
      [id]="id"
      [readonly]="to.readonly"
      [required]="to.required"
      [formControl]="formControl"
      [errorStateMatcher]="errorStateMatcher"
      [cols]="to.cols"
      [rows]="to.rows"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder"
      [tabindex]="to.tabindex"
      [cdkTextareaAutosize]="to.autosize"
      [cdkAutosizeMinRows]="to.autosizeMinRows"
      [cdkAutosizeMaxRows]="to.autosizeMaxRows"
      [class.cdk-textarea-autosize]="to.autosize"
      >
    </textarea>
  `,
                providers: [
                    // fix for https://github.com/ngx-formly/ngx-formly/issues/1688
                    // rely on formControl value instead of elementRef which return empty value in Firefox.
                    { provide: _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MAT_INPUT_VALUE_ACCESSOR"], useExisting: FormlyFieldTextArea },
                ]
            }]
    }], null, { formFieldControl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], ( /** @type {?} */({ static: true }))]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMatTextAreaModule {
}
FormlyMatTextAreaModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: FormlyMatTextAreaModule });
FormlyMatTextAreaModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function FormlyMatTextAreaModule_Factory(t) { return new (t || FormlyMatTextAreaModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"].forChild({
                types: [
                    {
                        name: 'textarea',
                        component: FormlyFieldTextArea,
                        wrappers: ['form-field']
                    },
                ]
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](FormlyMatTextAreaModule, { declarations: function () { return [FormlyFieldTextArea]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
        _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](FormlyMatTextAreaModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                declarations: [FormlyFieldTextArea],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_5__["FormlyMatFormFieldModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["FormlyModule"].forChild({
                        types: [
                            {
                                name: 'textarea',
                                component: FormlyFieldTextArea,
                                wrappers: ['form-field']
                            },
                        ]
                    }),
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material-textarea.js.map

/***/ }),

/***/ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material.js ***!
  \****************************************************************************************/
/*! exports provided: FieldType, FormlyMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlyMaterialModule", function() { return FormlyMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-formly/material/form-field */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-form-field.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_1__["FieldType"]; });

/* harmony import */ var _ngx_formly_material_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-formly/material/input */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-input.js");
/* harmony import */ var _ngx_formly_material_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/material/textarea */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-textarea.js");
/* harmony import */ var _ngx_formly_material_radio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-formly/material/radio */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-radio.js");
/* harmony import */ var _ngx_formly_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/material/checkbox */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-checkbox.js");
/* harmony import */ var _ngx_formly_material_multicheckbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-formly/material/multicheckbox */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-multicheckbox.js");
/* harmony import */ var _ngx_formly_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-formly/material/select */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material-select.js");











/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyMaterialModule {
}
FormlyMaterialModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: FormlyMaterialModule });
FormlyMaterialModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function FormlyMaterialModule_Factory(t) { return new (t || FormlyMaterialModule)(); }, imports: [[
            _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_1__["FormlyMatFormFieldModule"],
            _ngx_formly_material_input__WEBPACK_IMPORTED_MODULE_2__["FormlyMatInputModule"],
            _ngx_formly_material_textarea__WEBPACK_IMPORTED_MODULE_3__["FormlyMatTextAreaModule"],
            _ngx_formly_material_radio__WEBPACK_IMPORTED_MODULE_4__["FormlyMatRadioModule"],
            _ngx_formly_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["FormlyMatCheckboxModule"],
            _ngx_formly_material_multicheckbox__WEBPACK_IMPORTED_MODULE_6__["FormlyMatMultiCheckboxModule"],
            _ngx_formly_material_select__WEBPACK_IMPORTED_MODULE_7__["FormlyMatSelectModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FormlyMaterialModule, { imports: function () { return [_ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_1__["FormlyMatFormFieldModule"],
        _ngx_formly_material_input__WEBPACK_IMPORTED_MODULE_2__["FormlyMatInputModule"],
        _ngx_formly_material_textarea__WEBPACK_IMPORTED_MODULE_3__["FormlyMatTextAreaModule"],
        _ngx_formly_material_radio__WEBPACK_IMPORTED_MODULE_4__["FormlyMatRadioModule"],
        _ngx_formly_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["FormlyMatCheckboxModule"],
        _ngx_formly_material_multicheckbox__WEBPACK_IMPORTED_MODULE_6__["FormlyMatMultiCheckboxModule"],
        _ngx_formly_material_select__WEBPACK_IMPORTED_MODULE_7__["FormlyMatSelectModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormlyMaterialModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _ngx_formly_material_form_field__WEBPACK_IMPORTED_MODULE_1__["FormlyMatFormFieldModule"],
                    _ngx_formly_material_input__WEBPACK_IMPORTED_MODULE_2__["FormlyMatInputModule"],
                    _ngx_formly_material_textarea__WEBPACK_IMPORTED_MODULE_3__["FormlyMatTextAreaModule"],
                    _ngx_formly_material_radio__WEBPACK_IMPORTED_MODULE_4__["FormlyMatRadioModule"],
                    _ngx_formly_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["FormlyMatCheckboxModule"],
                    _ngx_formly_material_multicheckbox__WEBPACK_IMPORTED_MODULE_6__["FormlyMatMultiCheckboxModule"],
                    _ngx_formly_material_select__WEBPACK_IMPORTED_MODULE_7__["FormlyMatSelectModule"],
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-formly-material.js.map

/***/ }),

/***/ "./src/custom/components/pages/login/login-content/login-content.component.ts":
/*!************************************************************************************!*\
  !*** ./src/custom/components/pages/login/login-content/login-content.component.ts ***!
  \************************************************************************************/
/*! exports provided: LoginContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginContentComponent", function() { return LoginContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _custom_components_pages_login_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/login/login.service */ "./src/custom/components/pages/login/login.service.ts");
/* harmony import */ var _custom_entities_user_service_service_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/entities/user/service/service.user */ "./src/custom/entities/user/service/service.user.ts");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @custom/components/pages/shared/forms/form-simple/form-simple.component */ "./src/custom/components/pages/shared/forms/form-simple/form-simple.component.ts");








class LoginContentComponent {
    constructor(loginService, serviceUser) {
        this.loginService = loginService;
        this.serviceUser = serviceUser;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({});
    }
    login() {
        this.serviceUser.login(this.form.value).subscribe((res) => { console.log(res); });
    }
}
LoginContentComponent.ɵfac = function LoginContentComponent_Factory(t) { return new (t || LoginContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_custom_components_pages_login_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_custom_entities_user_service_service_user__WEBPACK_IMPORTED_MODULE_3__["ServiceUser"])); };
LoginContentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginContentComponent, selectors: [["app-login-content"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_custom_components_pages_login_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]])], decls: 5, vars: 4, consts: [[3, "form", "fields", "submitLabel", "submitIcon", "onSubmit"]], template: function LoginContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "app-form-simple", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSubmit", function LoginContentComponent_Template_app_form_simple_onSubmit_4_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx.form)("fields", ctx.loginService.fields)("submitLabel", "Login")("submitIcon", "login");
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardTitle"], _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_5__["FormSimpleComponent"]], styles: [".mat-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jdXN0b20vY29tcG9uZW50cy9wYWdlcy9sb2dpbi9sb2dpbi1jb250ZW50L2xvZ2luLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2N1c3RvbS9jb21wb25lbnRzL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbnRlbnQvbG9naW4tY29udGVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtY2FyZCB7XG4gICAgcGFkZGluZzogMjRweDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginContentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login-content',
                templateUrl: './login-content.component.html',
                styleUrls: ['./login-content.component.scss'],
                providers: [_custom_components_pages_login_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]],
            }]
    }], function () { return [{ type: _custom_components_pages_login_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"] }, { type: _custom_entities_user_service_service_user__WEBPACK_IMPORTED_MODULE_3__["ServiceUser"] }]; }, null); })();


/***/ }),

/***/ "./src/custom/components/pages/login/login-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/custom/components/pages/login/login-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _custom_components_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/login/login.component */ "./src/custom/components/pages/login/login.component.ts");





const routes = [
    {
        path: '',
        component: _custom_components_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
    },
    {
        path: 'register',
        loadChildren: () => __webpack_require__.e(/*! import() | custom-components-pages-register-register-module */ "custom-components-pages-register-register-module").then(__webpack_require__.bind(null, /*! @custom/components/pages/register/register.module */ "./src/custom/components/pages/register/register.module.ts")).then(m => m.RegisterModule)
    },
];
class LoginRoutingModule {
}
LoginRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LoginRoutingModule });
LoginRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LoginRoutingModule_Factory(t) { return new (t || LoginRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LoginRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/custom/components/pages/login/login.component.ts":
/*!**************************************************************!*\
  !*** ./src/custom/components/pages/login/login.component.ts ***!
  \**************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _custom_components_pages_shared_base_page_simple_page_simple_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-simple/page-simple.component */ "./src/custom/components/pages/shared/base/page-simple/page-simple.component.ts");
/* harmony import */ var _custom_components_pages_shared_navs_nav_list_simple_nav_list_simple_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/shared/navs/nav-list-simple/nav-list-simple.component */ "./src/custom/components/pages/shared/navs/nav-list-simple/nav-list-simple.component.ts");
/* harmony import */ var _custom_components_pages_login_login_content_login_content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/login/login-content/login-content.component */ "./src/custom/components/pages/login/login-content/login-content.component.ts");





class LoginComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 3, vars: 0, consts: [["appPageFormly", ""], ["nav-list", ""], ["content", ""]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-page-simple", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-nav-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-login-content", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_custom_components_pages_shared_base_page_simple_page_simple_component__WEBPACK_IMPORTED_MODULE_1__["PageSimpleComponent"], _custom_components_pages_shared_navs_nav_list_simple_nav_list_simple_component__WEBPACK_IMPORTED_MODULE_2__["NavListSimpleComponent"], _custom_components_pages_login_login_content_login_content_component__WEBPACK_IMPORTED_MODULE_3__["LoginContentComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY3VzdG9tL2NvbXBvbmVudHMvcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/custom/components/pages/login/login.module.ts":
/*!***********************************************************!*\
  !*** ./src/custom/components/pages/login/login.module.ts ***!
  \***********************************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-formly/page-formly.module */ "./src/custom/components/pages/shared/base/page-formly/page-formly.module.ts");
/* harmony import */ var _custom_components_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @custom/components/pages/login/login.component */ "./src/custom/components/pages/login/login.component.ts");
/* harmony import */ var _custom_components_pages_login_login_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/login/login-routing.module */ "./src/custom/components/pages/login/login-routing.module.ts");
/* harmony import */ var _custom_components_pages_login_login_content_login_content_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @custom/components/pages/login/login-content/login-content.component */ "./src/custom/components/pages/login/login-content/login-content.component.ts");






class LoginModule {
}
LoginModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LoginModule });
LoginModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LoginModule_Factory(t) { return new (t || LoginModule)(); }, imports: [[_custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_1__["PageFormlyModule"], _custom_components_pages_login_login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LoginModule, { declarations: [_custom_components_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"], _custom_components_pages_login_login_content_login_content_component__WEBPACK_IMPORTED_MODULE_4__["LoginContentComponent"]], imports: [_custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_1__["PageFormlyModule"], _custom_components_pages_login_login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_custom_components_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"], _custom_components_pages_login_login_content_login_content_component__WEBPACK_IMPORTED_MODULE_4__["LoginContentComponent"]],
                imports: [_custom_components_pages_shared_base_page_formly_page_formly_module__WEBPACK_IMPORTED_MODULE_1__["PageFormlyModule"], _custom_components_pages_login_login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"]],
                exports: [],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/custom/components/pages/login/login.service.ts":
/*!************************************************************!*\
  !*** ./src/custom/components/pages/login/login.service.ts ***!
  \************************************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _custom_components_pages_shared_base_page_formly_page_formly_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-formly/page-formly.service */ "./src/custom/components/pages/shared/base/page-formly/page-formly.service.ts");



class LoginService {
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
}
LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_custom_components_pages_shared_base_page_formly_page_formly_service__WEBPACK_IMPORTED_MODULE_1__["PageFormlyService"])); };
LoginService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoginService, factory: LoginService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _custom_components_pages_shared_base_page_formly_page_formly_service__WEBPACK_IMPORTED_MODULE_1__["PageFormlyService"] }]; }, null); })();


/***/ }),

/***/ "./src/custom/components/pages/shared/base/page-formly/page-formly.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/custom/components/pages/shared/base/page-formly/page-formly.module.ts ***!
  \***********************************************************************************/
/*! exports provided: PageFormlyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFormlyModule", function() { return PageFormlyModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _kernel_pages_base_base_form_page_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kernel/pages/base/base.form-page.module */ "./src/kernel/pages/base/base.form-page.module.ts");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/material */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @custom/components/pages/shared/base/page-simple/page-simple.module */ "./src/custom/components/pages/shared/base/page-simple/page-simple.module.ts");
/* harmony import */ var _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @custom/components/pages/shared/forms/form-simple/form-simple.component */ "./src/custom/components/pages/shared/forms/form-simple/form-simple.component.ts");









class PageFormlyModule {
}
PageFormlyModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PageFormlyModule });
PageFormlyModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PageFormlyModule_Factory(t) { return new (t || PageFormlyModule)(); }, imports: [[
            _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__["PageSimpleModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _kernel_pages_base_base_form_page_module__WEBPACK_IMPORTED_MODULE_1__["BaseFormPageModule"],
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forRoot({ extras: { lazyRender: true } }),
            _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
        ], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"],
        _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
        _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__["PageSimpleModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PageFormlyModule, { declarations: [_custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__["FormSimpleComponent"]], imports: [_custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__["PageSimpleModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        _kernel_pages_base_base_form_page_module__WEBPACK_IMPORTED_MODULE_1__["BaseFormPageModule"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"], _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"]], exports: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"],
        _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
        _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__["PageSimpleModule"],
        _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__["FormSimpleComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageFormlyModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__["FormSimpleComponent"]],
                imports: [
                    _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__["PageSimpleModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                    _kernel_pages_base_base_form_page_module__WEBPACK_IMPORTED_MODULE_1__["BaseFormPageModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forRoot({ extras: { lazyRender: true } }),
                    _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
                ],
                exports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"],
                    _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
                    _custom_components_pages_shared_base_page_simple_page_simple_module__WEBPACK_IMPORTED_MODULE_5__["PageSimpleModule"],
                    _custom_components_pages_shared_forms_form_simple_form_simple_component__WEBPACK_IMPORTED_MODULE_6__["FormSimpleComponent"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/custom/components/pages/shared/base/page-formly/page-formly.service.ts":
/*!************************************************************************************!*\
  !*** ./src/custom/components/pages/shared/base/page-formly/page-formly.service.ts ***!
  \************************************************************************************/
/*! exports provided: PageFormlyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFormlyService", function() { return PageFormlyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");



class PageFormlyService {
    constructor() {
        this.requiredValidator = {
            expression: (c) => _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required(c) == null,
            message: (error, field) => `"${field.templateOptions.label}" field is required`,
        };
        this.emailValidator = {
            expression: (c) => _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email(c) == null,
            message: (error, field) => `"${field.templateOptions.label}" needs to be a valid email`,
        };
        this.minLengthValidator = (count) => {
            return {
                expression: (c) => _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(count)(c) == null,
                message: (error, field) => `"${field.templateOptions.label}" needs to be at least ${count} characters long`,
            };
        };
        this.minValidator = (value) => {
            return {
                expression: (c) => _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(value)(c) == null,
                message: (error, field) => `"${field.templateOptions.label}" needs to be minimum ${value}`,
            };
        };
    }
}
PageFormlyService.ɵfac = function PageFormlyService_Factory(t) { return new (t || PageFormlyService)(); };
PageFormlyService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PageFormlyService, factory: PageFormlyService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageFormlyService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/custom/components/pages/shared/forms/form-simple/form-simple.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/custom/components/pages/shared/forms/form-simple/form-simple.component.ts ***!
  \***************************************************************************************/
/*! exports provided: FormSimpleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSimpleComponent", function() { return FormSimpleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");







class FormSimpleComponent {
    constructor() {
        this.onSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
}
FormSimpleComponent.ɵfac = function FormSimpleComponent_Factory(t) { return new (t || FormSimpleComponent)(); };
FormSimpleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormSimpleComponent, selectors: [["app-form-simple"]], inputs: { form: "form", fields: "fields", submitLabel: "submitLabel", submitIcon: "submitIcon" }, outputs: { onSubmit: "onSubmit" }, decls: 9, vars: 6, consts: [[3, "formGroup", "ngSubmit"], ["formDirective", "ngForm"], [3, "form", "fields"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"]], template: function FormSimpleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function FormSimpleComponent_Template_form_ngSubmit_0_listener() { return ctx.onSubmit.emit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "formly-form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx.form)("fields", ctx.fields);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.form.valid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.submitIcon);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.submitLabel, " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardContent"], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__["FormlyForm"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY3VzdG9tL2NvbXBvbmVudHMvcGFnZXMvc2hhcmVkL2Zvcm1zL2Zvcm0tc2ltcGxlL2Zvcm0tc2ltcGxlLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormSimpleComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-form-simple',
                templateUrl: './form-simple.component.html',
                styleUrls: ['./form-simple.component.scss']
            }]
    }], function () { return []; }, { onSubmit: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], form: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fields: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], submitLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], submitIcon: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/final/pages/login/page.login-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/final/pages/login/page.login-routing.module.ts ***!
  \************************************************************/
/*! exports provided: PageLoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageLoginRoutingModule", function() { return PageLoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [
    {
        path: "",
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @custom/components/pages/login/login.module */ "./src/custom/components/pages/login/login.module.ts")).then(m => m.LoginModule)
    },
    {
        path: "register",
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @custom/components/pages/login/login.module */ "./src/custom/components/pages/login/login.module.ts")).then(m => m.LoginModule)
    }
];
class PageLoginRoutingModule {
}
PageLoginRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PageLoginRoutingModule });
PageLoginRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PageLoginRoutingModule_Factory(t) { return new (t || PageLoginRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PageLoginRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageLoginRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/final/pages/login/page.login.module.ts":
/*!****************************************************!*\
  !*** ./src/final/pages/login/page.login.module.ts ***!
  \****************************************************/
/*! exports provided: PageLoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageLoginModule", function() { return PageLoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _final_pages_login_page_login_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @final/pages/login/page.login-routing.module */ "./src/final/pages/login/page.login-routing.module.ts");
/* harmony import */ var _custom_components_pages_login_login_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @custom/components/pages/login/login.module */ "./src/custom/components/pages/login/login.module.ts");





class PageLoginModule {
}
PageLoginModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PageLoginModule });
PageLoginModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PageLoginModule_Factory(t) { return new (t || PageLoginModule)(); }, imports: [[_custom_components_pages_login_login_module__WEBPACK_IMPORTED_MODULE_3__["LoginModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _final_pages_login_page_login_routing_module__WEBPACK_IMPORTED_MODULE_2__["PageLoginRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PageLoginModule, { imports: [_custom_components_pages_login_login_module__WEBPACK_IMPORTED_MODULE_3__["LoginModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _final_pages_login_page_login_routing_module__WEBPACK_IMPORTED_MODULE_2__["PageLoginRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageLoginModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_custom_components_pages_login_login_module__WEBPACK_IMPORTED_MODULE_3__["LoginModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _final_pages_login_page_login_routing_module__WEBPACK_IMPORTED_MODULE_2__["PageLoginRoutingModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/kernel/pages/base/base.form-page.module.ts":
/*!********************************************************!*\
  !*** ./src/kernel/pages/base/base.form-page.module.ts ***!
  \********************************************************/
/*! exports provided: BaseFormPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseFormPageModule", function() { return BaseFormPageModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-formly/core */ "./node_modules/@ngx-formly/core/__ivy_ngcc__/fesm2015/ngx-formly-core.js");
/* harmony import */ var _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/material */ "./node_modules/@ngx-formly/material/__ivy_ngcc__/fesm2015/ngx-formly-material.js");






class BaseFormPageModule {
}
BaseFormPageModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: BaseFormPageModule });
BaseFormPageModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function BaseFormPageModule_Factory(t) { return new (t || BaseFormPageModule)(); }, imports: [[
            _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forRoot({ extras: { lazyRender: true } }),
            _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
        ], _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"], _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](BaseFormPageModule, { imports: [_ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"], _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"]], exports: [_ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"], _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](BaseFormPageModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [
                    _ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"].forRoot({ extras: { lazyRender: true } }),
                    _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"],
                ],
                exports: [_ngx_formly_core__WEBPACK_IMPORTED_MODULE_2__["FormlyModule"], _ngx_formly_material__WEBPACK_IMPORTED_MODULE_3__["FormlyMaterialModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=final-pages-login-page-login-module.js.map