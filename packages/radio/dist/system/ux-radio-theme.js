System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxRadioTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxRadioTheme = /** @class */ (function () {
                function UxRadioTheme() {
                    this.themeKey = 'radio';
                    this.border = "solid 2px " + core_1.swatches.grey.p700;
                    this.hoverBorder = 'solid 2px var(--ux-design--accent, #FF4081)';
                    this.checkedBackground = 'var(--ux-design--accent, #FF4081)';
                    this.checkmarkColor = core_1.swatches.white;
                    this.disabledBorder = "solid 2px " + core_1.swatches.grey.p500;
                    this.disabledBackground = core_1.swatches.grey.p500;
                    this.disabledForeground = core_1.swatches.grey.p300;
                }
                return UxRadioTheme;
            }());
            exports_1("UxRadioTheme", UxRadioTheme);
        }
    };
});
