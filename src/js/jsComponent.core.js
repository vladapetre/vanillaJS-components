"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var JSObject = (function () {
    function JSObject(options) {
        this.settings = __assign({}, this.defaults, options);
        console.log(this);
    }
    return JSObject;
}());
var JSComponent = (function (_super) {
    __extends(JSComponent, _super);
    function JSComponent(domElement, options) {
        var _this = _super.call(this, options) || this;
        _this.domElement = domElement;
        _this.domElement.classList.add(_this.settings.domElementClass);
        return _this;
    }
    return JSComponent;
}(JSObject));
exports.JSComponent = JSComponent;
var JSElement = (function (_super) {
    __extends(JSElement, _super);
    function JSElement(domElementTag, options) {
        var _this = _super.call(this, options) || this;
        _this.domElement = document.createElement(domElementTag);
        _this.domElement.classList.add(_this.settings.domElementClass);
        return _this;
    }
    return JSElement;
}(JSObject));
exports.JSElement = JSElement;
//# sourceMappingURL=jsComponent.core.js.map