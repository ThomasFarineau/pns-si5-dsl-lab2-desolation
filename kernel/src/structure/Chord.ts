import Note from "./Note";
import PatternElementI from "./PatternElement.i";
import TrackElementI from "./TrackElement.i";

class Chord implements TrackElementI, PatternElementI {
    type = "Chord"
    notes: Note[] = [];

    constructor(notes: Note[]) {
        this.notes = notes;
    }
}

export default Chord;