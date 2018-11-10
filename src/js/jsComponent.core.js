"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(domElement, options) {
        this._defaults = {
            initClass: "jsComponent"
        };
        this._settings = __assign({}, this._defaults, options);
        this._domElement = domElement;
        if (this._domElement != undefined && this._domElement != null)
            this._domElement.classList.add(this._settings.initClass);
    }
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=jsComponent.core.js.map