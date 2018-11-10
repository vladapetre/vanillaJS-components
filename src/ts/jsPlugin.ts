import * as jsCore from './jsComponent.core'
import * as jsUI from './jsComponent.ui'
import { SliderComponent } from './jsComponent.slider'

var sliderElement = document.getElementById("slider");

if (sliderElement != undefined && sliderElement != null)
    new SliderComponent(sliderElement).buildComponent({
        initClass: "jsSlider",
        currentValue: 82,
        stepValue: 3,
        maxValue: 100,
        minValue: 0
    });


    var sliderElement2 = document.getElementById("slider2");

    if (sliderElement2 != undefined && sliderElement2 != null)
        new SliderComponent(sliderElement2).buildComponent();


console.log('loaded2'); 