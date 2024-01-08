import Note from "./Note";
import PatternElementI from "./PatternElement.i";
import TrackElementI from "./TrackElement.i";

class Chord implements TrackElementI, PatternElementI {
    type = "Chord"
    notes: Note[] = [];

    addNote(note: Note) {
        this.notes.push(note);
    }
}

export default Chord;