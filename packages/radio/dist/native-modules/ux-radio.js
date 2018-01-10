var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';
var theme = new UxRadioTheme();
var UxRadio = /** @class */ (function () {
    function UxRadio(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = null;
        this.tabindex = 0;
        // tslint:disable
        this.matcher = function (a, b) { return a === b; };
        // tslint: enable
        this.checked = false;
        this.value = null;
        this.ripple = null;
        styleEngine.ensureDefaultTheme(theme);
    }
    Object.defineProperty(UxRadio.prototype, "isDisabled", {
        get: function () {
            return normalizeBooleanAttribute('disabled', this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    UxRadio.prototype.bind = function () {
        this.themeChanged(this.theme);
        if (this.checked) {
            this.checkedChanged();
        }
        if (normalizeBooleanAttribute('disabled', this.disabled) && !this.element.classList.contains('disabled')) {
            this.element.classList.add('disabled');
        }
        else if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
        }
    };
    UxRadio.prototype.attached = function () {
        var _this = this;
        if (this.id) {
            var labelElement = document.querySelector("label[for=" + this.id + "]");
            if (labelElement != null) {
                labelElement.addEventListener('click', function () {
                    _this.toggleRadio();
                });
            }
        }
    };
    UxRadio.prototype.detached = function () {
        var _this = this;
        if (this.id) {
            var labelElement = document.querySelector("label[for=" + this.id + "]");
            if (labelElement != null) {
                labelElement.removeEventListener('click', function () {
                    _this.toggleRadio();
                });
            }
        }
    };
    UxRadio.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'radio';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxRadio.prototype.disabledChanged = function (newValue) {
        if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
            this.element.classList.add('disabled');
        }
        else if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
        }
    };
    UxRadio.prototype.checkedChanged = function () {
        var elementValue = this.model ? this.model : this.value;
        var isChecked = this.checked;
        if (isChecked && isChecked === elementValue) {
            this.element.classList.add('checked');
            this.element.setAttribute('aria-checked', 'true');
        }
        else {
            this.element.classList.remove('checked');
            this.element.setAttribute('aria-checked', 'false');
        }
    };
    UxRadio.prototype.toggleRadio = function () {
        if (this.isDisabled) {
            return;
        }
        var elementValue = this.model ? this.model : this.value;
        if (elementValue != null && typeof elementValue !== 'boolean') {
            this.checked = elementValue;
        }
        else {
            this.checked = !this.checked;
        }
    };
    UxRadio.prototype.onKeydown = function (e) {
        var key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            e.preventDefault();
            this.toggleRadio();
        }
        return true;
    };
    UxRadio.prototype.onMouseDown = function (e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.radio.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new PaperRipple();
                var container = this.element.querySelector('.ripplecontainer');
                if (container != null) {
                    container.appendChild(this.ripple.$);
                }
            }
            this.ripple.center = true;
            this.ripple.round = true;
            this.ripple.downAction(e);
        }
        this.toggleRadio();
        e.preventDefault();
    };
    UxRadio.prototype.onMouseUp = function (e) {
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.radio.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
    };
    __decorate([
        bindable
    ], UxRadio.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "id", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "label", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "model", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "tabindex", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxRadio.prototype, "matcher", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        bindable
    ], UxRadio.prototype, "checked", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        bindable
    ], UxRadio.prototype, "value", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxRadio.prototype, "isDisabled", null);
    UxRadio = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-radio')
    ], UxRadio);
    return UxRadio;
}());
export { UxRadio };
