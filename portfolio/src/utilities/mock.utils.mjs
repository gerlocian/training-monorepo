export class MockDocument {
    constructor() { throw new Error('MockDocument is static.'); }

    static createElement(tagName) {
        return new MockElement({tagName});        
    }
}

export class MockElement {
    #attributes;
    #children;
    parent;
    tagName;

    set innerHTML(children) {
        this.#children = this.#processIncomingInnerHTML(children);
    }

    get attributes() {
        return this.#attributes;
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
        this.tagName = tagName;
        this.#attributes = attributes;
        this.#children = this.#processIncomingInnerHTML(children);
    }

    append(element) {
        element.parent = this;
        this.#children = [...this.#children, element];
    }

    cloneNode(deep=false) {
        let children = this.#children.length > 0 && deep ? this.#children.map(child => child.cloneNode(deep)) : [];
        return new MockElement(this.tagName, [...this.#attributes], children);
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

    setAttribute(name) {
        if (!this.#attributes.includes(name))
            this.#attributes = [...this.#attributes, name];
    }

    remove() {
        this.#children.forEach(child => child.remove());
        this.parent.removeChild(this);
    }

    removeAttribute(name) {
        this.#attributes = this.#attributes.filter(attr => attr !== name);
    }

    removeChild(element) {
        this.#children = this.#children.filter(child => child !== element);
        return element;
    }

    #processIncomingInnerHTML(children) {
        return children?.map(this.#setChildsParent.bind(this)) || [];
    }

    #setChildsParent(child) {
        child.parent = this;
        return child;
    }
}
