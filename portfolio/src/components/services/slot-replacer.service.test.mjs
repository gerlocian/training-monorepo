import { expect } from 'chai';
import { describe, it } from 'mocha';
import { replaceSlotsTest } from './slot-replacer.service.mjs';
import { MockDocument } from '../../utilities/mock.utils.mjs';

const replaceSlots = replaceSlotsTest.bind(this, MockDocument);

function createSlot(name) {
    const slot = MockDocument.createElement('slot');
    slot.setAttribute('name', name);
    slot.innerHTML = `${name} value`;
    return slot;
}

describe('replaceslots method', () => {
    it('should exist as a function',  () => {
        expect(replaceSlots).to.be.a('function', 'replaceSlots was not a function');
    });

    it('should expect exactly two arguments', () => {
        expect(replaceSlots.length).to.equal(2, 'the number of arguments for replaceSlots is expected to be 2');
    });

    it('should throw an exception if the document is not provided', () => {
        const noDocReplaceSlots = replaceSlotsTest.bind(this, null);
        try {
            noDocReplaceSlots('test');
            expect.fail('Document not defined error did not get thrown');
        } catch(e) {
            expect(e.toString()).to.equal('TypeError: Document is not defined.');
        }
    });

    it('should replace the contents of slot elements with the provided text', () => {
        const testSlots = [
            {name: 'slot-1', value: 'this is the test content for slot 1'},
            {name: 'slot-2', value: 'this is the test content for slot 2'},
            {name: 'slot-3', value: 'this is the test content for slot 3'},
        ];
        
        const elementBuilder = MockDocument.createElement('div');
        testSlots.forEach(slot => elementBuilder.append(createSlot(slot.name)));

        const testElement = MockDocument.createElement('div');
        const testValue = replaceSlots(testSlots, elementBuilder.innerHTML);
        testElement.innerHTML = testValue;

        testElement.querySelectorAll('[name]').forEach((slot, i) => 
            expect(slot.innerHTML).to.equal(testSlots[i])
        );
    })
});
