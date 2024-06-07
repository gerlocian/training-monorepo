import sanitize from './sanitizer.service.mjs';

/**
 * @param {{[key: string]: string}[]} slots 
 * @param {string} innerHTML 
 */
export default function replaceSlots(slots, innerHTML) {
    const replacer = document.createElement('div');
    const decoder = document.createElement('textarea');

    replacer.innerHTML = innerHTML;
    replacer.querySelectorAll('slot[name]').forEach(element => 
        element.innerHTML = sanitize(slots[element.getAttribute('name')])
    );

    decoder.innerHTML = replacer.innerHTML;
    return decoder.value;
}
