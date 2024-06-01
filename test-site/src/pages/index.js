import {BaseElement} from 'web-component-template';

import html from './index.html';
import css from './index.css';

class IndexPage extends BaseElement {
    constructor() { super(html, css); }

    _render() {
        // this._setSlotValue('page-title', 'Content generated as a string');
        this._setSlotValue('string-content', this.#createStringContent());
        this._setSlotValue('object-content', this.#createObjectContent());
        this._setSlotValue('array-content', this.#createArrayContent());
        this._setSlotValue('function-content', this.#createFunctionContent());
        this._setSlotValue('promise-content', this.#createPromiseContent());

        super._render(); // Call the prototype _render method.
    }

    #createStringContent() {
        return 'Content generated as a string';
    }

    #createObjectContent() {
        return { toString: () => 'Content generated as an object' };
    }

    #createArrayContent() {
        return [ 'Content generated as an array' ];
    }

    #createFunctionContent() {
        return () => 'Content generated as a function';
    }

    #createPromiseContent() {
        return new Promise((resolve) => resolve('Content generated as a Promise'));
    }
}

customElements.define('ger-index', IndexPage);
document.body.append(document.createElement('ger-index'));
