import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import Instrument from "./Instrument";
import Pattern from "./Pattern";

let trackNumber: number = 0;

type PatternMap = {
    [id: string]: Pattern
}

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;
    elements: TrackElementI[] = [];
    patterns: { [id: string]: Pattern} = {};

    constructor(instrument: Instrument) {
        this.id = ++trackNumber;
        this.instrument = instrument;
    }

    addElement(element: MusicElementI) {
        this.elements.push(element);
    }

    addPattern(pattern: Pattern) {
        this.patterns[pattern.id] = pattern;
    }
}

export default Track;