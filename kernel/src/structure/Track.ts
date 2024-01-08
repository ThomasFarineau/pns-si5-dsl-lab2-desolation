import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import Instrument from "./Instrument";

let trackNumber: number = 0;

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;
    elements: TrackElementI[] = [];

    constructor(instrument: Instrument) {
        this.id = ++trackNumber;
        this.instrument = instrument;
    }
    
    addElement(element: MusicElementI) {
        this.elements.push(element);
    }
}