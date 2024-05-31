/*
    This works well for simple imports of base html and css, but there is no way
    to manage templating in the html. For example, there is no clean way to do string
    replacements for property values in the class.

    TODO:
        1. Try to figure out templating. (look into templates and slots)
        2. 
*/

export class BaseElement extends HTMLElement {
    _shadow;
    #css;
    #html;

    constructor(h, c) { 
        super();
        this.#css = c || '';
        this.#html = h || '';
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        const me = this._shadow ? this._shadow : this;
        me.innerHTML = `
            <style>${this.#css.toString()}</style>
            ${this.#html}
        `;
    }
}
