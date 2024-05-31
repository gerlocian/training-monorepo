export class BaseElement extends HTMLElement {
    /**
     * A method called when taking a value and applying it to the innerHTML of either this or another element.
     * @protected
     * @type {(value: string) => string}
     * @default undefined */
    _sanitizer;

    /**
     * The shadow root for the element. If this is defined as a ShadowRoot, the element will have a shadow dom.
     * @protected
     * @type {ShadowRoot | undefined}
     * @default undefined */
    _shadow;

    /**
     * @private
     * @type {string}*/
    #css;

    /**
     * @private 
     * @type {string} */
    #html;

    /**
     * @protected
     * @type {Map<string, any>} */
    #slots;

    /**
     * @param {string | {toString: () => string} | [toString: () => string] | undefined} h 
     * @param {string | {toString: () => string} | [toString: () => string] | undefined} c 
     */
    constructor(h = null, c = null) { 
        super();

        this.#slots = new Map();
        this.#css = c || '';    // default to empty string so we have a toString method
        this.#html = h || '';   // default to empty string so we have a toString method
    }

    connectedCallback() {
        this._render();
    }

    /**
     * @param {string} slotName 
     * @param {string | (string, HTMLSlotElement) => string | {toString: (string, HTMLSlotElement) => string} | [toString: (string, HTMLSlotElement) => string] | Promise} slotValue 
     */
    _setSlotValue(slotName, slotValue) {
        this.#slots.set(slotName, slotValue);
    }

    async _render() {
        this.#renderHTML();
        this.#renderSlots();
    }

    #getRoot() {
        return this.#hasShadowDom() ? this._shadow : this;
    }

    #hasShadowDom() {
        return this._shadow && this._shadow instanceof ShadowRoot;
    }
 
    #renderHTML() {
        this.#getRoot().innerHTML = '';

        if (this.#css) {
            const style = document.createElement('style');
            style.innerHTML = this.#sanitize(this.#css.toString().trim());
            this.#getRoot().append(style);
        }

        this.#getRoot().innerHTML += this.#sanitize(this.#html.toString().trim());
    }

    async #renderSlots() {
        this.#slots.forEach(async (value, key) => {
            this.#getRoot().querySelectorAll(`slot[name=${key}]`).forEach(async (slot) => {
                if (slot && value instanceof Promise) {
                    slot.innerHTML = this.#sanitize(await value);
                } else if (slot && typeof value === 'function') {
                    slot.innerHTML = this.#sanitize(value(slot.innerHTML, slot));
                } else if (slot && value.toString) {
                    slot.innerHTML = this.#sanitize(value.toString(slot.innerHTML, slot));
                } else if (slot) {
                    slot.innerHTML = this.#sanitize(value);
                }
            });
        });
    }

    #sanitize(value) {
        // Prefer to use the provided sanitizer if available.
        if (this._sanitizer) return this._sanitizer(value);

        const elements = document.createElement('textarea');
        elements.innerHTML = value;

        elements.querySelectorAll('script').forEach(element => element.remove());
        elements.querySelectorAll('style').forEach(element => element.remove());
        elements.querySelectorAll('[onbeforetoggle]').forEach(element => element.removeAttribute('onbeforetoggle'));
        elements.querySelectorAll('[oncancel]').forEach(element => element.removeAttribute('oncancel'));
        elements.querySelectorAll('[onchange]').forEach(element => element.removeAttribute('onchange'));
        elements.querySelectorAll('[oncopy]').forEach(element => element.removeAttribute('oncopy'));
        elements.querySelectorAll('[oncut]').forEach(element => element.removeAttribute('oncut'));
        elements.querySelectorAll('[ondrag]').forEach(element => element.removeAttribute('ondrag'));
        elements.querySelectorAll('[ondragend]').forEach(element => element.removeAttribute('ondragend'));
        elements.querySelectorAll('[ondragenter]').forEach(element => element.removeAttribute('ondragenter'));
        elements.querySelectorAll('[ondragleave]').forEach(element => element.removeAttribute('ondragleave'));
        elements.querySelectorAll('[ondragover]').forEach(element => element.removeAttribute('ondragover'));
        elements.querySelectorAll('[ondragstart]').forEach(element => element.removeAttribute('ondragstart'));
        elements.querySelectorAll('[ondrop]').forEach(element => element.removeAttribute('ondrop'));
        elements.querySelectorAll('[onerror]').forEach(element => element.removeAttribute('onerror'));
        elements.querySelectorAll('[onload]').forEach(element => element.removeAttribute('onload'));
        elements.querySelectorAll('[onpaste]').forEach(element => element.removeAttribute('onpaste'));
        elements.querySelectorAll('[onsubmit]').forEach(element => element.removeAttribute('onsubmit'));
        elements.querySelectorAll('[ontoggle]').forEach(element => element.removeAttribute('ontoggle'));
        
        return elements.value.trim();
    }
}
