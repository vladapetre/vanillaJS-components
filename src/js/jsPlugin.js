"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsComponent_slider_1 = require("./jsComponent.slider");
var sliderElement = document.getElementById("slider");
if (sliderElement != undefined && sliderElement != null)
    new jsComponent_slider_1.SliderComponent(sliderElement).buildComponent({
        initClass: "jsSlider",
        currentValue: 82,
        stepValue: 3,
        maxValue: 100,
        minValue: 0
    });
var sliderElement2 = document.getElementById("slider2");
if (sliderElement2 != undefined && sliderElement2 != null)
    new jsComponent_slider_1.SliderComponent(sliderElement2).buildComponent();
console.log('loaded2');
//# sourceMappingURL=jsPlugin.js.map