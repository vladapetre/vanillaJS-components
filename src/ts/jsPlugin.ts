import * as jsCore from './jsComponent.core'
import { SliderComponent } from './jsComponent.slider'

var sliderElement = document.getElementById("slider");

if (sliderElement != undefined && sliderElement != null)
    new SliderComponent(sliderElement).build();


console.log('loaded4'); 