import { expect } from 'chai';
import { describe, it } from 'mocha';
import { MockDocument } from '../../utilities/mock.utils.mjs';
import { sanitizeTest } from './sanitizer.service.mjs';

const sanitizer = sanitizeTest.bind(this, MockDocument);

describe('sanitize method', () => {
    it('should exist as a function', () => {
        const sanitize = sanitizer.bind(this, { elements: [], attributes: [] });
        expect(sanitize).to.be.a('function', 'sanitize was not a function');
    });

    it('should expect exactly one argument', () => {
        const sanitize = sanitizer.bind(this, { elements: [], attributes: [] });
        expect(sanitize.length).to.equal(1, 'the number of arguments for sanitize is expected to be 1');
    });

    it('should throw an exception if the document is not provided', () => {
        const noDocSanitizer = sanitizeTest.bind(this, null);
        try {
            noDocSanitizer('test');
            expect.fail('Document not defined error did not get thrown');
        } catch(e) {
            expect(e.toString()).to.equal('TypeError: Document is not defined.');
        }
    });

    it('should strip a blacklist element from the string if only one is defined', () => {
        // Create an element from which to derive an unclean string. 
        const elementBuilder = MockDocument.createElement('div');
        elementBuilder.append(MockDocument.createElement('img'));
        elementBuilder.append(MockDocument.createElement('div'));
        elementBuilder.append(MockDocument.createElement('style'));
        elementBuilder.append(MockDocument.createElement('span'));
        
        // Create the sanitize method, the dirty string, and a testable cleaned string.
        const sanitize = sanitizer.bind(this, { elements: ['img'], attributes: [] });
        const dirtyString = elementBuilder.innerHTML;
        const cleanedString = sanitize(dirtyString);

        // Create an element to test the cleaned string.
        const elementViewer = MockDocument.createElement('div');
        elementViewer.innerHTML = cleanedString;
        
        expect(elementViewer.querySelectorAll('img').length).to.equal(0, 'img tag was found');
        expect(elementViewer.querySelectorAll('div').length).to.equal(1, 'div tag is missing');
        expect(elementViewer.querySelectorAll('style').length).to.equal(1, 'style tag is missing');
        expect(elementViewer.querySelectorAll('span').length).to.equal(1, 'span tag is missing');
    });

    it('should strip multiple blacklist elements from the string if many are defined', () => {
        // Create an element from which to derive an unclean string. 
        const elementBuilder = MockDocument.createElement('div');
        elementBuilder.append(MockDocument.createElement('img'));
        elementBuilder.append(MockDocument.createElement('div'));
        elementBuilder.append(MockDocument.createElement('style'));
        elementBuilder.append(MockDocument.createElement('span'));
        
        // Create the sanitize method, the dirty string, and a testable cleaned string.
        const sanitize = sanitizer.bind(this, { elements: ['img', 'style'], attributes: [] });
        const dirtyString = elementBuilder.innerHTML;
        const cleanedString = sanitize(dirtyString);

        // Create an element to test the cleaned string.
        const elementViewer = MockDocument.createElement('div');
        elementViewer.innerHTML = cleanedString;
        
        expect(elementViewer.querySelectorAll('img').length).to.equal(0, 'img tag was found');
        expect(elementViewer.querySelectorAll('div').length).to.equal(1, 'div tag is missing');
        expect(elementViewer.querySelectorAll('style').length).to.equal(0, 'style tag was found');
        expect(elementViewer.querySelectorAll('span').length).to.equal(1, 'span tag is missing');
    });
});
