import * as jsCore from './jsComponent.core'
import * as jsUI from './jsComponent.ui'

export interface sliderSettings extends jsCore.jsSettings {
    minValue: number;
    maxValue: number;
    currentValue: number;
    stepValue: number;
}

export class SliderComponent extends jsUI.UIComponent {

    protected _defaults: sliderSettings = {
        initClass: "jsSlider",
        currentValue: 50,
        stepValue: 1,
        maxValue: 100,
        minValue: 0
    }
    protected _settings!: sliderSettings;

    private _sliderButton!: HTMLElement;
    private _sliderButtonClass: string = "jsSliderButton";
    private _sliderBar!: HTMLElement;
    private _sliderBarClass: string = "jsSliderBar";
    private _sliderLabel!: HTMLElement;
    private _sliderLabelClass: string = "jsSliderLabel";
    /**
     *
     */
    constructor(domElement: HTMLElement) {
        super(domElement);

    }

    public buildComponent(options?: sliderSettings): HTMLElement {
        if (options != undefined && options != null) {
            this._settings = { ...this._defaults, ...options };
        } else {
            var domSettings = {
                minValue: Number(this._domElement.dataset.minvalue),
                maxValue: Number(this._domElement.dataset.maxvalue),
                currentValue: Number(this._domElement.dataset.currentvalue),
                stepValue: Number(this._domElement.dataset.stepvalue),
            };
            this._settings = { ...this._defaults, ...domSettings };
        }


        this._sliderBar = document.createElement("div");
        this._sliderBar.classList.add(this._sliderBarClass)

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
    }

    private onWindowResize = (event: Event) => {
        this._sliderButton.style.left = ((this._settings.currentValue / this._settings.maxValue) * this._sliderBar.offsetWidth) + 'px';
        this._sliderLabel.innerHTML = String(this._settings.currentValue);
    }

    private onStart = (event: Event) => {
        event.preventDefault();
        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('mouseup', this.onStop);

        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('touchend', this.onStop);
    }

    private onMove = (event: Event) => {

        var minXPosition = 0;
        var maxXPosition = this._sliderBar.offsetWidth;
        var xPosition = 0;
        if (event instanceof MouseEvent) {
            xPosition = event.pageX - this._sliderBar.offsetLeft;
        } else if (event instanceof TouchEvent) {
            xPosition = event.touches[0].pageX - this._sliderBar.offsetLeft;
        }

        if (xPosition < minXPosition) xPosition = minXPosition;
        if (xPosition > maxXPosition) xPosition = maxXPosition;


        var valueRange = this._settings.maxValue - this._settings.minValue;
        var xPositionPercent = xPosition / maxXPosition;

        var currentValue = Math.max(valueRange * xPositionPercent + this._settings.minValue);

        if (currentValue == this._settings.minValue || currentValue == this._settings.maxValue) {
            this._sliderLabel.innerHTML = String(currentValue);
            this._settings.currentValue = currentValue;
        } else {
            var stepValue = Math.floor(currentValue / this._settings.stepValue) * this._settings.stepValue;
            this._sliderLabel.innerHTML = String(stepValue);
            this._settings.currentValue = stepValue;
        }

        this._sliderButton.style.left = xPosition - this._sliderButton.offsetWidth / 2 + 'px';
    }

    private onStop = (event: Event) => {
        document.removeEventListener('mousemove', this.onMove);
        document.removeEventListener('mouseup', this.onStop);

        document.removeEventListener('touchmove', this.onMove);
        document.removeEventListener('touchend', this.onStop);
    }

}
