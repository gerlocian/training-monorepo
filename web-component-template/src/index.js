export class BaseElement extends HTMLElement {
    /**
     * The shadow root for the element. If this is defined as a ShadowRoot, the element will have a shadow dom.
     * @protected
     * @type {ShadowRoot | undefined}
     * @default undefined */
    _shadow;

    #css;
    #html;
    #slots = new Map();

    // Blacklist values for tags and attributes that should be cleaned from strings to be rendered.
    #elementBL = [
        'script',
        'style'
    ];

    #attributeBL = [
        // Remove all inline javascript attributes.
        // Users extending from this class should be utilizing addEventListener after the render.
        'onbeforetoggle',
        'oncancel',
        'onchange',
        'oncopy',
        'oncut',
        'ondrag',
        'ondragend',
        'ondragenter',
        'ondragleave',
        'ondragover',
        'ondragstart',
        'ondrop',
        'onerror',
        'onload',
        'onpaste',
        'onsubmit',
        'ontoggle',
    ];

    /**
     * @param {string | {toString: () => string} | [toString: () => string] | undefined} h 
     * @param {string | {toString: () => string} | [toString: () => string] | undefined} c 
     */
    constructor(h = null, c = null) { 
        super();
        this.#css = c || '';    // default to empty string so we have a toString method
        this.#html = h || '';   // default to empty string so we have a toString method
    }

    /**
     * Standard lifecycle hook for when this element is added to the dom.
     */
    connectedCallback() {
        this._render();
    }

    /**
     * Sanitized a string value to remove any harmful tags or attributes.
     * @protected
     * @param {string} value 
     * @returns {string}
     */
    _sanitize(value) {
        // Plug the string into a div to make finding problem tags and attributes easier.
        let elements = document.createElement('div');
        elements.innerHTML = value;

        // Clear away dangerous elements.
        this.#elementBL.forEach(bl => {
            elements.querySelectorAll(bl).forEach(element => element.remove());
        });

        // Clear away dangerous attributes.
        this.#attributeBL.forEach(bl => {
            elements.querySelectorAll(`[${bl}]`).forEach(element => element.removeAttribute(bl));
        });

        // Take the value of the div's innerHTML and plug it into a textarea to remove html entities.
        let sanitized = document.createElement('textarea');
        sanitized.innerHTML = elements.innerHTML;

        // Get the value of the string as a string sans entities.
        const cleanedString = sanitized.value.trim();

        // Kill the div and the textarea.
        elements.remove();
        sanitized.remove();
        elements = sanitized = undefined;

        // Return the doctored string.
        return cleanedString;
    }

    /**
     * Sets the value of a slot element in the ui, located by name.
     * @protected
     * @param {string} slotName 
     * @param {
            string 
            | (defaultString: string, slot: HTMLSlotElement) => string 
            | {toString: (defaultString: string, slot: HTMLSlotElement) => string} 
            | [toString: (defaultString: string, slot: HTMLSlotElement) => string] 
            | Promise
        } slotValue 
     * @return {void}
     */
    _setSlotValue(slotName, slotValue) {
        this.#slots.set(slotName, slotValue);
    }

    /**
     * Renders the element. Override to change default behavior.
     * @protected
     * @return {void}
    */
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
            style.innerHTML = this._sanitize(this.#css.toString().trim());
            this.#getRoot().append(style);
        }

        this.#getRoot().innerHTML += this._sanitize(this.#html.toString().trim());
    }

    async #renderSlots() {
        this.#slots.forEach(async (value, key) => {
            this.#getRoot().querySelectorAll(`slot[name=${key}]`).forEach(async (slot) => {
                if (slot && value instanceof Promise) {
                    slot.innerHTML = this._sanitize(await value);
                } else if (slot && typeof value === 'function') {
                    slot.innerHTML = this._sanitize(value(slot.innerHTML, slot));
                } else if (slot && value.toString) {
                    slot.innerHTML = this._sanitize(value.toString(slot.innerHTML, slot));
                } else if (slot) {
                    slot.innerHTML = this._sanitize(value);
                }
            });
        });
    }
}
