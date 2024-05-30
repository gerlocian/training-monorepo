/*

NOTES:

1. Allowing the use of a visits attribute ends up polluting the dom with our visit data since it has to be JSON.stringified to pass properly. Recomment passing in visit data with a method or setter.

*/

import * as D3 from 'd3';

export class VisitGraph extends HTMLElement {
    // Constants
    #SVG_CLASS_NAME = 'visit-graph';
    #VISIT_WIDTH = 400;
    #VISIT_HEIGHT = 50;
    #VISIT_MARGIN = 100;

    #positionX;
    #positionY;

    #background;
    #shadow;
    #svg;
    #visits;
    #visualization;

    #backgroundDragBehavior;
    
    constructor() { 
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        this.#positionX = 300;
        this.#positionY = this.clientHeight / 2;

        this.#createSvg();
        this.#createBackground();
        this.#setSvgSize();

        this.#createTree();
        this.#setVisualizationPosition();

        this.#shadow.append(this.#svg.node());
    }

    setVisits(visits) {
        this.#visits = visits;
        this.#createTree();
        this.#setVisualizationPosition();
    }

    #createBackground() {
        this.#backgroundDragBehavior = D3.drag().on('drag', this.#handleBackgroundDrag.bind(this));

        this.#background = this.#svg.append('rect')
            .attr('class', 'background')
            .attr('fill', 'transparent')
            .call(this.#backgroundDragBehavior);
    }

    #createSvg() {
        this.#svg = D3.create('svg')
            .attr('class', this.#SVG_CLASS_NAME);
    }

    #createTree() {
        if (!this.#svg) return;

        if (this.#visualization) {
            this.#visualization.remove();
            this.#visualization = undefined;
        }

        this.#visualization = this.#svg
            .append('g')
            .attr('class', 'visualization');

        const createParentChildRelations = D3.stratify()
            .parentId((visit) => visit.parent)
            .id((visit) => visit.id)

        const pcr = createParentChildRelations(this.#visits);
        const root = D3.hierarchy(pcr);
        const tree = D3.tree().nodeSize([this.#VISIT_HEIGHT + this.#VISIT_MARGIN / 4, this.#VISIT_WIDTH + this.#VISIT_MARGIN]);

        tree(root);

        this.#visualization
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "#500")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 2.5)
            .selectAll()
            .data(root.links())
            .join("path")
                .attr("d", D3.link(D3.curveBumpX)
                    .source(({ source }) => ({ ...source, y: source.y + this.#VISIT_WIDTH / 2 }))
                    .target(({ target }) => ({ ...target, y: target.y - this.#VISIT_WIDTH / 2 }))
                    .x(d => d.y)
                    .y(d => d.x)
                );

        const nodeGroup = this.#visualization
            .append("g")
            .attr('class', 'visit-group')
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll()
            .data(root.descendants())
            .join("g")
                .attr('class', 'visit')
                .attr("transform", d => `translate(${d.y},${d.x})`)
                .on('click', this.#handleVisitClick.bind(this));
        
        nodeGroup.append('rect')   // create a circle as the node
            .attr('id', (_, index) => index)
            .attr("fill", 'transparent')
            .attr('stroke', '#000')
            .attr('width', this.#VISIT_WIDTH)
            .attr('height', this.#VISIT_HEIGHT)
            .style('transform', `translate(${this.#VISIT_WIDTH / 2 * -1}px, ${this.#VISIT_HEIGHT / 2 * -1}px)`);

        nodeGroup.append("text")     // text for the node
            .attr('dy', '0.33em')
            .attr("text-anchor", 'middle')
            .text(d => d.data.id)
            .attr("stroke", "white")
            .attr("paint-order", "stroke");
    }

    #handleBackgroundDrag(event) {
        this.#positionX = this.#positionX + event.dx;
        this.#positionY = this.#positionY + event.dy;
        this.#setVisualizationPosition();
    }

    #handleVisitClick(clickEvent, { data: visit}) {
        const visNode = this.#visualization.node();
        visNode.querySelectorAll('g.visit > rect').forEach(element => element.setAttribute('fill', 'transparent'));
        clickEvent.currentTarget.querySelector('rect').setAttribute('fill', '#ddd');

        this.dispatchEvent(new VisitClickEvent(visit.data));
    }

    #setSvgSize() {
        this.#svg
            .attr('width', `${this.clientWidth}px`)
            .attr('height', `${this.clientHeight}px`)
            .attr('viewBox', [0, 0, this.clientWidth, this.clientHeight]);

        this.#background
            .attr('width', `${this.clientWidth}px`)
            .attr('height', `${this.clientHeight}px`);
    }

    #setVisualizationPosition() {
        if (!this.#svg) return;

        this.#visualization
            .attr('transform', `translate(${this.#positionX}, ${this.#positionY})`);
    }
}

export class VisitClickEvent extends MouseEvent {
    #visit;
    get visit() {
        return this.#visit;
    }

    constructor(visit) {
        super('ger-visit-click', { bubbles: true, cancelable: true, composed: true });
        this.#visit = visit;
    }
}

customElements.define('ger-visit-graph', VisitGraph);
