import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import Instrument from "./Instrument";
import Pattern from "./Pattern";

let trackNumber: number = 0;

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;
    elements: TrackElementI[] = [];
    patterns: Map<string, Pattern> = new Map<string, Pattern>();

    constructor(instrument: Instrument) {
        this.id = ++trackNumber;
        this.instrument = instrument;
    }

    addElement(element: MusicElementI) {
        this.elements.push(element);
    }

    addPattern(pattern: Pattern) {
        this.patterns.set(pattern.id, pattern);
    }
}

export default Track;