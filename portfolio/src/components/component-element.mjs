import sanitize from './services/sanitizer.service.mjs';
import replaceSlots from './services/slot-replacer.service.mjs';

export default class ComponentElement extends HTMLElement {
    /**
     * @property {{[name: string]: string}[]} _slots
     * @protected
     */
    _slots;
    
    #css;       // CSS to apply to the component.
    #html;      // HTML to apply to the component.
    #resizeObs; // This element resize observer.
    #shadow;    // The ShadowDom if needed.

    /**
     * @param {string | {toString: () => string}} h
     * @param {string | {toString: () => string}} c
     * @param {'open' | 'close' | null}
     */
    constructor(html = '', css = '', shadow = null) {
        super();
        this._slots = [];

        this.#css =  css.toString() || null;
        this.#html = html.toString() || null;
        this.#resizeObs = new ResizeObserver(this.#handleResize.bind(this));
        this.#shadow = (shadow === 'open' || shadow === 'closed')
            ? this.attachShadow({ mode: shadow }) 
            : null;
    }
    
    connectedCallback() {
        this._beforeRender();

        const me = this.#shadow instanceof ShadowRoot ? this.#shadow : this;
        me.append(this.#buildStyles());
        me.innerHTML += Array.isArray(this._slots) && this._slots.length > 0 
            ? replaceSlots(this.#buildHTML()) 
            : this.#buildHTML();

        this.#resizeObs.observe(this);

        this._afterRender();
    }

    disconnectedCallback() {
        this.#resizeObs.disconnect();

        this._onDestroy();
    }

    /**
     * Lifecycle: called before render process starts.
     * Useful for setting up slot data.
     */
    _beforeRender() {}

    /**
     * Lifecycle: called after render process ends.
     * Useful for setting up event listeners.
     */
    _afterRender() {}

    /**
     * Lifecycle: called before the element is removed from the dom or disconnected.
     * Useful for removing event listeners.
     */
    _onDestroy() {}

    #buildHTML() {
        return this.#html ? sanitize(this.#html) : '';
    }

    #buildStyles() {
        if (!this.#css || this.#css === '') return '';

        const style = document.createElement('style');
        style.innerHTML = sanitize(this.#css.toString().trim());
        return style;
    }

    #handleResize(entries) {
        if (!Array.isArray(entries) || entries.length < 1) return;
        
        entries.forEach((entry) => {
            if (entry.element instanceof ComponentElement) {
                this.dispatchEvent(new ComponentResizeEvent());
            }
        });
    }
}

export class ComponentResizeEvent extends Event {
    constructor() { super('ger-component-resize', { bubbles: true, cancelable: true, composed: false }); }
}
