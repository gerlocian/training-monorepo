export class MockDocument {
    constructor() { throw new Error('MockDocument is static.'); }

    static createElement(tagName) {
        return new MockElement({tagName});        
    }
}

export class MockElement {
    parent;
    tagName;
    #attributes;
    #children;

    set innerHTML(children) {
        this.#children = Array.isArray(children) 
            ? this.#processIncomingInnerHTMLArray(children)
            : this.#processIncomingInnerHTMLString(children);
    }

    get attributes() {
        const children = [];
        this.#attributes.forEach((value, key) => children.push({name: key, value}));
        return children;
    }

    get children() {
        return this.#children;
    }

    get innerHTML() {
        return [...this.#children];
    }

    get value() {
        return this.innerHTML;
    }

    constructor({tagName, attributes=[], children=[]}) {
        const attrs = new Map();
        attributes.forEach(attr => attrs.set(attr.name, attr.value));

        this.tagName = tagName;
        this.#attributes = attrs;
        this.#children = this.#processIncomingInnerHTMLArray(children);
    }

    append(element) {
        element.parent = this;
        this.#children = [...this.#children, element];
    }

    cloneNode(deep=false) {
        let children = this.#children.length > 0 && deep ? this.#children.map(child => child.cloneNode(deep)) : [];
        return new MockElement(this.tagName, [...this.#attributes], children);
    }

    getAttribute(name) {
        return this.#attributes.get(name);
    }

    querySelectorAll(query) {
        const {tags, attrs} = query.split(',').reduce(
            (acc, q) => q[0] === '[' 
                ? {...acc, attrs: [...acc.attrs, q.replace(/^\[/,'').replace(/\]$/, '')]} 
                : {...acc, tags: [...acc.tags, q]},
            {tags:[], attrs:[]}
        );

        return this.#children?.filter(child => {
            return tags.includes(child.tagName)
                || attrs.some(attr => child.attributes.includes(attr))
        }) || [];
    }

    setAttribute(name, value) {
        this.#attributes.set(name, value);
    }

    remove() {
        this.#children.forEach(child => child.remove());
        this.parent.removeChild(this);
    }

    removeAttribute(name) {
        this.#attributes = this.#attributes.delete(name);
    }

    removeChild(element) {
        this.#children = this.#children.filter(child => child !== element);
        return element;
    }

    #processIncomingInnerHTMLArray(children) {
        return children?.map(this.#setChildsParent.bind(this)) || [];
    }

    #processIncomingInnerHTMLString(children) {
        return new MockTextNode(children);
    }

    #setChildsParent(child) {
        child.parent = this;
        return child;
    }
}

export class MockTextNode {
    parent;
    #str;

    constructor(str) {
        this.#str = str
    }

    toString() {
        return this.#str;
    }
}
