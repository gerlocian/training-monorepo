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
        this.#shadow = (shadow === 'open' || shadow === 'closed')
            ? this.attachShadow({ mode: shadow }) 
            : null;
    }
    
    connectedCallback() {
        this._beforeRender();

        const me = this.#shadow instanceof ShadowRoot ? this.#shadow : this;
        me.innerHTML = this.#buildStyles();
        me.innerHTML = Array.isArray(this._slots) && this._slots.length > 0 
            ? replaceSlots(this.#buildHTML()) 
            : this.#buildHTML();

        this._afterRender();
    }

    disconnectedCallback() {
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
     * @returns 
     */

    #buildHTML() {
        return this.#html ? sanitize(this.#html) : '';
    }

    #buildStyles() {
        if (!this.#css || this.#css === '') return '';

        const style = document.createElement('style');
        style.innerHTML = sanitize(this.#css);
        return style;
    }
}
