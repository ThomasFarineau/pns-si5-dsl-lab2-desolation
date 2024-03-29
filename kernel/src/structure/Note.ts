import PatternElementI from "./PatternElement.i";
import NoteName from "./NoteName";
import TrackElementI from "./TrackElement.i";
import AccidentalType from "./AccidentalType";

class Note implements TrackElementI, PatternElementI {
    type = "Note";
    note: NoteName;
    octave: number;
    duration: string;
    accidental: AccidentalType;

    constructor(note: NoteName, octave: number, duration: string, accidental: AccidentalType) {
        this.note = note;
        this.octave = octave;
        this.duration = duration;
        this.accidental = accidental;
    }
}

export default Note;