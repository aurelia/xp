import { __decorate } from "tslib";
import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { DOM, ElementEvents, useView, PLATFORM } from 'aurelia-framework';
var UxSwitch = /** @class */ (function () {
    function UxSwitch(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.effect = 'ripple';
        this.ripple = null;
        Object.setPrototypeOf(element, uxSwitchElementProto);
    }
    Object.defineProperty(UxSwitch.prototype, "isDisabled", {
        get: function () {
            return normalizeBooleanAttribute('disabled', this.disabled);
        },
        enumerable: false,
        configurable: true
    });
    UxSwitch.prototype.bind = function () {
        if (this.element.hasAttribute('id')) {
            var attributeValue = this.element.getAttribute('id');
            if (attributeValue != null) {
                this.checkbox.setAttribute('id', attributeValue);
            }
        }
        if (this.element.hasAttribute('tabindex')) {
            var attributeValue = this.element.getAttribute('tabindex');
            if (attributeValue != null) {
                this.checkbox.setAttribute('tabindex', attributeValue);
            }
        }
        if (this.element.hasAttribute('checked')) {
            var attributeValue = this.element.getAttribute('checked');
            if (attributeValue || attributeValue === '') {
                this.element.checked = true;
            }
        }
        this.valueChanged(this.value);
        this.disabledChanged(this.checkbox.disabled);
        this.themeChanged(this.theme);
    };
    UxSwitch.prototype.attached = function () {
        this.checkbox.addEventListener('change', stopEvent);
    };
    UxSwitch.prototype.detached = function () {
        this.checkbox.removeEventListener('change', stopEvent);
    };
    UxSwitch.prototype.getChecked = function () {
        return this.checked;
    };
    UxSwitch.prototype.setChecked = function (value) {
        var oldValue = this.checked;
        var newValue = !!value;
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.ignoreValueChanges = true;
            this.value = newValue;
            this.ignoreValueChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    UxSwitch.prototype.checkedChanged = function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        if (newValue === true) {
            this.element.classList.add('ux-switch--checked');
        }
        else {
            this.element.classList.remove('ux-switch--checked');
        }
    };
    UxSwitch.prototype.focusedChanged = function (newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-switch--focused');
        }
        else {
            this.element.classList.remove('ux-switch--focused');
        }
    };
    UxSwitch.prototype.valueChanged = function (newValue) {
        if (this.ignoreValueChanges) {
            return;
        }
        this.setChecked(newValue);
    };
    UxSwitch.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'switch';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxSwitch.prototype.disabledChanged = function (newValue) {
        if (newValue === true) {
            this.element.classList.add('ux-switch--disabled');
        }
        else {
            this.element.classList.remove('ux-switch--disabled');
        }
    };
    UxSwitch.prototype.onMouseDown = function (e) {
        var _this = this;
        if (e.button !== 0 || this.isDisabled) {
            return;
        }
        if (this.element.classList.contains('ripple')) {
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
            var winEvents_1 = new ElementEvents(window);
            var upAction = function () {
                _this.ripple.upAction();
                winEvents_1.disposeAll();
            };
            winEvents_1.subscribe('blur', upAction);
            winEvents_1.subscribe('mouseup', upAction, true);
        }
        e.preventDefault();
    };
    __decorate([
        bindable
    ], UxSwitch.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxSwitch.prototype, "effect", void 0);
    __decorate([
        bindable
    ], UxSwitch.prototype, "id", void 0);
    __decorate([
        bindable
    ], UxSwitch.prototype, "theme", void 0);
    __decorate([
        observable()
    ], UxSwitch.prototype, "checked", void 0);
    __decorate([
        observable({ initializer: function () { return false; } })
    ], UxSwitch.prototype, "value", void 0);
    __decorate([
        observable()
    ], UxSwitch.prototype, "focused", void 0);
    __decorate([
        computedFrom('disabled')
    ], UxSwitch.prototype, "isDisabled", null);
    UxSwitch = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-switch'),
        useView(PLATFORM.moduleName('./ux-switch.html'))
    ], UxSwitch);
    return UxSwitch;
}());
export { UxSwitch };
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var uxSwitchElementProto = Object.create(HTMLElement.prototype, {
    type: {
        value: 'checkbox',
    },
    checked: {
        get: function () {
            return getVm(this).getChecked();
        },
        set: function (value) {
            getVm(this).setChecked(value);
        }
    }
});
//# sourceMappingURL=ux-switch.js.map