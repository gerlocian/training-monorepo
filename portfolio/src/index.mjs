import PdfViewerElement from "./components/pdf-viewer/pdf-viewer.mjs";
customElements.define('ger-pdf-viewer', PdfViewerElement);

document.body.style.setProperty('margin', 0);
document.body.style.setProperty('padding', 0);
document.body.style.setProperty('overflow', 'hidden');

const pdfViewer = document.createElement('ger-pdf-viewer');
pdfViewer.style.setProperty('width', '50vw');
pdfViewer.style.setProperty('height', '100vh');
document.body.append(pdfViewer);
