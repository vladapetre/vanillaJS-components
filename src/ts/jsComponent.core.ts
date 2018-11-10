export interface JSSettings {
    domElementClass:string;
}

abstract class JSObject {
    public abstract domElement: HTMLElement;
    protected defaults: any;
    protected settings: any;
    /**
     *
     */
    constructor(options?: any) {
        this.settings = { ...this.defaults, ...options };
        console.log(this);
    }

    public abstract build():void;
}

export abstract class JSComponent extends JSObject {
    public domElement: HTMLElement;

    /**
     *
     */
    constructor(domElement: HTMLElement, options?: any) {
        super(options);
        this.domElement = domElement;
        this.domElement.classList.add(this.settings.domElementClass);
    }
}

export abstract class JSElement extends JSObject {
    public domElement: HTMLElement;

    /**
     *
     */
    constructor(domElementTag: string, options?: any) {
        super(options);
        this.domElement = document.createElement(domElementTag);
        this.domElement.classList.add(this.settings.domElementClass);
    }
}