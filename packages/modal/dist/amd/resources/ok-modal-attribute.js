var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "./modal-util"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, modal_util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OkModalAttribute = /** @class */ (function () {
        function OkModalAttribute(element) {
            this.element = element;
        }
        OkModalAttribute.prototype.bind = function () {
            this.element.addEventListener('click', this);
        };
        OkModalAttribute.prototype.unbind = function () {
            this.element.removeEventListener('click', this);
        };
        OkModalAttribute.prototype.handleEvent = function () {
            var modal = modal_util_1.findModal(this.element);
            if (modal !== null) {
                modal.ok(this.value);
            }
        };
        OkModalAttribute = __decorate([
            aurelia_dependency_injection_1.inject(Element),
            aurelia_templating_1.customAttribute('ok-modal')
        ], OkModalAttribute);
        return OkModalAttribute;
    }());
    exports.OkModalAttribute = OkModalAttribute;
});
