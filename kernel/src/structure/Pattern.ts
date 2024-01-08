import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import PatternElementI from "./PatternElement.i";

class Pattern implements MusicElementI, TrackElementI {
    type = "Pattern";

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