import * as jsCore from './jsComponent.core'

export abstract class UIComponent extends jsCore.Component {
    /**
     *
     */
    constructor(domElement: HTMLElement, options?: jsCore.jsSettings) {
        super(domElement, options);

    }

    public abstract buildComponent(options?:jsCore.jsSettings): HTMLElement;
}