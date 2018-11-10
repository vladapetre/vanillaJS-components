export interface jsSettings {
    initClass: string;
}

export abstract class Component {

    protected _defaults: jsSettings = {
        initClass: "jsComponent"
    }
    protected _settings: jsSettings;
    protected _domElement: HTMLElement;
    /**
     *
     */
    constructor(domElement: HTMLElement, options?: jsSettings) {
        this._settings = { ...this._defaults, ...options };
        this._domElement = domElement;

        if (this._domElement != undefined && this._domElement != null)
            this._domElement.classList.add(this._settings.initClass);
    }
}