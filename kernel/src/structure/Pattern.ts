import PatternElementI from "./PatternElement.i";

class Pattern {
    id: string
    elements: PatternElementI[] = [];

    constructor(id: string) {
        this.id = id;
    }

    addElement(element: PatternElementI) {
        this.elements.push(element);
    }
}

export default Pattern;