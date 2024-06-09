import sanitize from './sanitizer.service.mjs';

/**
 * @param {Document} doc
 * @param {{[key: string]: string}[]} slots 
 * @param {string} innerHTML 
 */
export function replaceSlotsTest(doc, slots, innerHTML) {
    const replacer = doc.createElement('div');
    const decoder = doc.createElement('textarea');

    replacer.innerHTML = innerHTML;
    replacer.querySelectorAll('slot[name]').forEach(element => 
        element.innerHTML = sanitize(slots[element.getAttribute('name')])
    );

    decoder.innerHTML = replacer.innerHTML;
    return decoder.value;
}

/**
 * @param {{}} slots
 * @param {string} innerHTML
 */
export default replaceSlotsTest.bind(this, this?.document || {});
