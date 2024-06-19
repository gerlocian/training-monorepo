const blacklistElements = [
    'script', 'style'
];

const blacklistAttributes = [
    'onbeforetoggle','oncancel','onchange','oncopy','oncut','ondrag','ondragend','ondragenter','ondragleave',
    'ondragover','ondragstart','ondrop','onerror','onload','onpaste','onsubmit','ontoggle'
];

export function sanitizeTest(doc, blacklist, stringToSanitize) {
    if (!doc) throw new TypeError('Document is not defined.');

    const { elements, attributes } = blacklist;
    const searchParams = [
        ...elements,
        ...attributes.map(attr => `[${attr}]`)
    ].join(',');

    const sanitizer = doc.createElement('div');
    sanitizer.innerHTML = stringToSanitize;

    sanitizer.querySelectorAll(searchParams).forEach(
        element => {
            elements.includes(element.tagName)
                ? element.remove()
                : attributes.forEach(attr => element.removeAttribute(attr))
        }
    );

    const decoder = doc.createElement('textarea');
    decoder.innerHTML = sanitizer.innerHTML;
    return decoder.value;
}

/**
 * @param {string | {toString: () => string}} stringToSanitize
 */
export default sanitizeTest.bind(this, document || null, {
    elements: blacklistElements,
    attributes: blacklistAttributes
});
