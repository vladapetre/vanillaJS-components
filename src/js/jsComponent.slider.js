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
var jsCore = __importStar(require("./jsComponent.core"));
var SliderButtonElement = (function (_super) {
    __extends(SliderButtonElement, _super);
    function SliderButtonElement(sliderBar, options) {
        var _this = _super.call(this, "div", __assign({}, options, { domElementClass: 'jsSliderButton' })) || this;
        _this.value = 0;
        _this.onWindowsResize = function (event) {
            _this.domElement.style.left = ((_this.value / _this.settings.maxValue) * _this.sliderBar.domElement.offsetWidth) + 'px';
        };
        _this.onStart = function (event) {
            event.preventDefault();
            document.addEventListener('mousemove', _this.onMove, false);
            document.addEventListener('mouseup', _this.onStop, false);
            document.addEventListener('touchmove', _this.onMove, false);
            document.addEventListener('touchend', _this.onStop, false);
        };
        _this.onMove = function (event) {
            var minXPosition = 0;
            var maxXPosition = _this.sliderBar.domElement.offsetWidth;
            var xPosition = 0;
            if (event instanceof MouseEvent) {
                xPosition = event.pageX - _this.sliderBar.domElement.offsetLeft;
            }
            else if (event instanceof TouchEvent) {
                xPosition = event.touches[0].pageX - _this.sliderBar.domElement.offsetLeft;
            }
            if (xPosition < minXPosition)
                xPosition = minXPosition;
            if (xPosition > maxXPosition)
                xPosition = maxXPosition;
            var valueRange = _this.settings.maxValue - _this.settings.minValue;
            var xPositionPercent = xPosition / maxXPosition;
            var currentValue = Math.max(valueRange * xPositionPercent + _this.settings.minValue);
            if (currentValue == _this.settings.minValue || currentValue == _this.settings.maxValue) {
                _this.value = currentValue;
            }
            else {
                var stepValue = Math.floor(currentValue / _this.settings.stepValue) * _this.settings.stepValue;
                _this.value = stepValue;
            }
            _this.domElement.style.left = xPosition - _this.domElement.offsetWidth / 2 + 'px';
        };
        _this.onStop = function (event) {
            document.removeEventListener('mousemove', _this.onMove, false);
            document.removeEventListener('mouseup', _this.onStop, false);
            document.removeEventListener('touchmove', _this.onMove, false);
            document.removeEventListener('touchend', _this.onStop, false);
        };
        _this.sliderBar = sliderBar;
        return _this;
    }
    SliderButtonElement.prototype.build = function () {
        this.domElement.addEventListener('mousedown', this.onStart, false);
        this.domElement.addEventListener('touchstart', this.onStart, false);
        this.value = this.settings.currentValue;
        this.domElement.style.left = ((this.value / this.settings.maxValue) * this.sliderBar.domElement.offsetWidth) + 'px';
        window.addEventListener('resize', this.onWindowsResize);
    };
    return SliderButtonElement;
}(jsCore.JSElement));
var SliderBarElement = (function (_super) {
    __extends(SliderBarElement, _super);
    function SliderBarElement(options) {
        var _this = _super.call(this, "div", __assign({}, options, { domElementClass: 'jsSliderBar' })) || this;
        _this.sliderButtons = [];
        var buttonIndex = 0;
        if (_this.settings.numberOfButtons <= 1) {
            _this.sliderButtons.push(new SliderButtonElement(_this, _this.settings));
        }
        else {
            for (buttonIndex; buttonIndex < _this.settings.numberOfButtons; buttonIndex++) {
                var currentValue = _this.settings.currentValues[buttonIndex];
                _this.sliderButtons.push(new SliderButtonElement(_this, __assign({}, _this.settings, { currentValue: currentValue })));
            }
        }
        return _this;
    }
    SliderBarElement.prototype.build = function () {
        for (var _i = 0, _a = this.sliderButtons; _i < _a.length; _i++) {
            var sliderButton = _a[_i];
            this.domElement.appendChild(sliderButton.domElement);
            sliderButton.build();
        }
    };
    return SliderBarElement;
}(jsCore.JSElement));
var SliderElement = (function (_super) {
    __extends(SliderElement, _super);
    function SliderElement(options) {
        var _this = _super.call(this, "div", __assign({}, options, { domElementClass: 'jsSlider' })) || this;
        _this.sliderBar = new SliderBarElement(options);
        return _this;
    }
    SliderElement.prototype.build = function () {
        this.domElement.appendChild(this.sliderBar.domElement);
        this.sliderBar.build();
    };
    return SliderElement;
}(jsCore.JSElement));
var SliderComponent = (function (_super) {
    __extends(SliderComponent, _super);
    function SliderComponent(domElement, options) {
        var _this = _super.call(this, domElement, __assign({}, options, { domElementClass: 'jsComponent' })) || this;
        var defaults = {
            numberOfButtons: 10,
            currentValues: [20, 45, 25, 66, 60, 79],
            minValue: 0,
            maxValue: 100,
            stepValue: 5
        };
        _this.slider = new SliderElement(__assign({}, options, defaults));
        return _this;
    }
    SliderComponent.prototype.build = function () {
        this.domElement.appendChild(this.slider.domElement);
        this.slider.build();
    };
    return SliderComponent;
}(jsCore.JSComponent));
exports.SliderComponent = SliderComponent;
//# sourceMappingURL=jsComponent.slider.js.map