import PatternElementI from "./PatternElement.i";
import Note from "./Note";
import Chord from "./Chord";
import Wait from "./Wait";

const typeClassMapping: { [type: string]: any } = {
    "Note": Note, "Chord": Chord, "Wait": Wait
};

class Pattern {
    id: string
    elements: PatternElementI[] = [];

    constructor(id: string, elements: any) {
        this.id = id;
        this.elements = this.parseElements(elements);
    }

    parseElements(elements: any) {
        let toReturn = [];
        for (let element of elements) {
            const eClass = typeClassMapping[element.type];
            if (!eClass) {
                console.log(`Unknown element type: ${element.type}`);
                continue;
            }
            const {type, ...params} = element;
            toReturn.push(new eClass(...Object.values(params)));
        }
        return toReturn;
    }
}

export default Pattern;