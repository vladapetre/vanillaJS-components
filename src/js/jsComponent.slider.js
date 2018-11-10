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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsUI = __importStar(require("./jsComponent.ui"));
var SliderComponent = (function (_super) {
    __extends(SliderComponent, _super);
    function SliderComponent(domElement) {
        var _this = _super.call(this, domElement) || this;
        _this._defaults = {
            initClass: "jsSlider",
            currentValue: 50,
            stepValue: 1,
            maxValue: 100,
            minValue: 0
        };
        _this._sliderButtonClass = "jsSliderButton";
        _this._sliderBarClass = "jsSliderBar";
        _this._sliderLabelClass = "jsSliderLabel";
        _this.onWindowResize = function (event) {
            _this._sliderButton.style.left = ((_this._settings.currentValue / _this._settings.maxValue) * _this._sliderBar.offsetWidth) + 'px';
            _this._sliderLabel.innerHTML = String(_this._settings.currentValue);
        };
        _this.onStart = function (event) {
            event.preventDefault();
            document.addEventListener('mousemove', _this.onMove);
            document.addEventListener('mouseup', _this.onStop);
            document.addEventListener('touchmove', _this.onMove);
            document.addEventListener('touchend', _this.onStop);
        };
        _this.onMove = function (event) {
            var minXPosition = 0;
            var maxXPosition = _this._sliderBar.offsetWidth;
            var xPosition = 0;
            if (event instanceof MouseEvent) {
                xPosition = event.pageX - _this._sliderBar.offsetLeft;
            }
            else if (event instanceof TouchEvent) {
                xPosition = event.touches[0].pageX - _this._sliderBar.offsetLeft;
            }
            if (xPosition < minXPosition)
                xPosition = minXPosition;
            if (xPosition > maxXPosition)
                xPosition = maxXPosition;
            var valueRange = _this._settings.maxValue - _this._settings.minValue;
            var xPositionPercent = xPosition / maxXPosition;
            var currentValue = Math.max(valueRange * xPositionPercent + _this._settings.minValue);
            if (currentValue == _this._settings.minValue || currentValue == _this._settings.maxValue) {
                _this._sliderLabel.innerHTML = String(currentValue);
                _this._settings.currentValue = currentValue;
            }
            else {
                var stepValue = Math.floor(currentValue / _this._settings.stepValue) * _this._settings.stepValue;
                _this._sliderLabel.innerHTML = String(stepValue);
                _this._settings.currentValue = stepValue;
            }
            _this._sliderButton.style.left = xPosition - _this._sliderButton.offsetWidth / 2 + 'px';
        };
        _this.onStop = function (event) {
            document.removeEventListener('mousemove', _this.onMove);
            document.removeEventListener('mouseup', _this.onStop);
            document.removeEventListener('touchmove', _this.onMove);
            document.removeEventListener('touchend', _this.onStop);
        };
        return _this;
    }
    SliderComponent.prototype.buildComponent = function (options) {
        if (options != undefined && options != null) {
            this._settings = __assign({}, this._defaults, options);
        }
        else {
            var domSettings = {
                minValue: Number(this._domElement.dataset.minvalue),
                maxValue: Number(this._domElement.dataset.maxvalue),
                currentValue: Number(this._domElement.dataset.currentvalue),
                stepValue: Number(this._domElement.dataset.stepvalue),
            };
            this._settings = __assign({}, this._defaults, domSettings);
        }
        this._sliderBar = document.createElement("div");
        this._sliderBar.classList.add(this._sliderBarClass);
        this._sliderButton = document.createElement("span");
        this._sliderButton.classList.add(this._sliderButtonClass);
        this._sliderLabel = document.createElement("label");
        this._sliderLabel.classList.add(this._sliderLabelClass);
        this._sliderBar.appendChild(this._sliderButton);
        this._domElement.appendChild(this._sliderBar);
        this._domElement.appendChild(this._sliderLabel);
        this._sliderButton.addEventListener('mousedown', this.onStart);
        this._sliderButton.addEventListener('touchstart', this.onStart);
        this._sliderButton.style.left = ((this._settings.currentValue / this._settings.maxValue) * this._sliderBar.offsetWidth) + 'px';
        this._sliderLabel.innerHTML = String(this._settings.currentValue);
        window.addEventListener('resize', this.onWindowResize);
        return this._domElement;
    };
    return SliderComponent;
}(jsUI.UIComponent));
exports.SliderComponent = SliderComponent;
//# sourceMappingURL=jsComponent.slider.js.map