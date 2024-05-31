import { BaseElement } from '../components/base/base';
import html from './index.html';
import css from './index.css';

class IndexPage extends BaseElement {
    constructor() {super(html, css);}
}

customElements.define('ger-index', IndexPage);
document.body.append(document.createElement('ger-index'));
