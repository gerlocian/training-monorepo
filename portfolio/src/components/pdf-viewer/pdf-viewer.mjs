import ComponentElement from "../component-element.mjs";
import html from './pdf-viewer.html';
import styles from './pdf-viewer.css';

import * as pdfjs from 'pdfjs-dist/build/pdf.mjs';

const VIEWPORT_SCALE = 1.0;

export default class PdfViewerElement extends ComponentElement {
    #resizeHandler;
    #canvas;
    #context;

    constructor() { 
        super(html, styles);
        this.#resizeHandler = this.#resize.bind(this);

        if (!pdfjs) throw new Error('pdfjsLib not defined');
        console.log( new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString());
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
    }

    _afterRender() {
        super._afterRender();
        this.#getPdfDocument();
        this.addEventListener('ger-component-resize', this.#resizeHandler);
    }

    _onDestroy() {
        super._onDestroy();
        this.removeEventListener('ger-component-resize', this.#resizeHandler);
    }

    async #getPdfDocument() {
        try {
            const pdf = await pdfjsLib.getDocument('/assets/scalacookbook.pdf').promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({scale: VIEWPORT_SCALE});
            const outputScale = window.devicePixelRatio || 1;

            this.#canvas = this.querySelector('canvas');
            this.#context = this.#canvas.getContext('2d');

            this.#canvas.width = Math.floor(viewport.width * outputScale);
            this.#canvas.height = Math.floor(viewport.height * outputScale);
            this.#canvas.style.width = Math.floor(viewport.width) + 'px';
            this.#canvas.style.height = Math.floor(viewport.height) + 'px';

            const transform = outputScale !== 1
                ? [outputScale, 0, 0, outputScale, 0, 0]
                : null;

            const renderContext = {
                canvasContext: this.#context,
                transform,
                viewport,
            }

            page.render(renderContext);
        } catch(e) {
            console.error(e.toString());
        }
    }

    #resize() {
    }
}
