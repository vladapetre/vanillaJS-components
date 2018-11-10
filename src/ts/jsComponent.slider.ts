import * as jsCore from './jsComponent.core'

class SliderButtonElement extends jsCore.JSElement {
    protected sliderBar: SliderBarElement;
    public value: number = 0;
    /**
     *
     */
    constructor(sliderBar: SliderBarElement, options?: any) {
        super("div", { ...options, ...{ domElementClass: 'jsSliderButton' } });
        this.sliderBar = sliderBar;


    }

    public build(): void {
        this.domElement.addEventListener('mousedown', this.onStart, false);
        this.domElement.addEventListener('touchstart', this.onStart, false);

        this.value = this.settings.currentValue;
        this.domElement.style.left = ((this.value / this.settings.maxValue) * this.sliderBar.domElement.offsetWidth) + 'px';

        window.addEventListener('resize', this.onWindowsResize);
    }

    private onWindowsResize = (event: Event) => {
        this.domElement.style.left = ((this.value / this.settings.maxValue) * this.sliderBar.domElement.offsetWidth) + 'px';
    }

    private onStart = (event: Event) => {
        event.preventDefault();
        document.addEventListener('mousemove', this.onMove, false);
        document.addEventListener('mouseup', this.onStop, false);

        document.addEventListener('touchmove', this.onMove, false);
        document.addEventListener('touchend', this.onStop, false);
    }

    private onMove = (event: Event) => {
        var minXPosition = 0;
        var maxXPosition = this.sliderBar.domElement.offsetWidth;
        var xPosition = 0;
        if (event instanceof MouseEvent) {
            xPosition = event.pageX - this.sliderBar.domElement.offsetLeft;
        } else if (event instanceof TouchEvent) {
            xPosition = event.touches[0].pageX - this.sliderBar.domElement.offsetLeft;
        }

        if (xPosition < minXPosition) xPosition = minXPosition;
        if (xPosition > maxXPosition) xPosition = maxXPosition;


        var valueRange = this.settings.maxValue - this.settings.minValue;
        var xPositionPercent = xPosition / maxXPosition;

        var currentValue = Math.max(valueRange * xPositionPercent + this.settings.minValue);

        if (currentValue == this.settings.minValue || currentValue == this.settings.maxValue) {
            this.value = currentValue;
        } else {
            var stepValue = Math.floor(currentValue / this.settings.stepValue) * this.settings.stepValue;
            this.value = stepValue;
        }

        this.domElement.style.left = xPosition - this.domElement.offsetWidth / 2 + 'px';
    }

    private onStop = (event: Event) => {

        document.removeEventListener('mousemove', this.onMove, false);
        document.removeEventListener('mouseup', this.onStop, false);

        document.removeEventListener('touchmove', this.onMove, false);
        document.removeEventListener('touchend', this.onStop, false);
    }
}

class SliderBarElement extends jsCore.JSElement {
    protected sliderButtons: SliderButtonElement[] = [];
    /**
     *
     */
    constructor(options?: any) {
        super("div", { ...options, ...{ domElementClass: 'jsSliderBar' } });

        var buttonIndex = 0;
        if (this.settings.numberOfButtons <= 1) {
            this.sliderButtons.push(new SliderButtonElement(this, this.settings));
        } else {
            for (buttonIndex; buttonIndex < this.settings.numberOfButtons; buttonIndex++) {
                var currentValue = this.settings.currentValues[buttonIndex];
                this.sliderButtons.push(new SliderButtonElement(this, { ...this.settings, ...{ currentValue: currentValue } }));
            }
        }
    }

    public build(): void {
        for (let sliderButton of this.sliderButtons) {
            this.domElement.appendChild(sliderButton.domElement);
            sliderButton.build();
        }
    }
}

class SliderElement extends jsCore.JSElement {
    protected sliderBar: SliderBarElement;
    /**
     *
     */
    constructor(options?: any) {
        super("div", { ...options, ...{ domElementClass: 'jsSlider' } });

        this.sliderBar = new SliderBarElement(options);
    }

    public build(): void {
        this.domElement.appendChild(this.sliderBar.domElement);
        this.sliderBar.build();
    }
}

export class SliderComponent extends jsCore.JSComponent {

    protected slider: SliderElement;
    /**
     *
     */
    constructor(domElement: HTMLElement, options?: any) {
        super(domElement, { ...options, ...{ domElementClass: 'jsComponent' } });

        var defaults = {
            numberOfButtons: 10,
            currentValues: [20, 45, 25, 66, 60, 79],
            minValue: 0,
            maxValue: 100,
            stepValue: 5
        }
        this.slider = new SliderElement({ ...options, ...defaults });
    }

    public build(): void {
        this.domElement.appendChild(this.slider.domElement);
        this.slider.build();
    }
}