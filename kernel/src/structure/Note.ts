import Duration from "./Duration";
import KeySignature from "./KeySignature";
import PatternElementI from "./PatternElement.i";
import NoteName from "./NoteName";

class Note implements TrackElementI, PatternElementI {
    type = "Note"
    note: NoteName;
    octave: number;
    duration: Duration;
    keySignature: KeySignature;

    constructor(note: NoteName, octave: number, duration: Duration, keySignature: KeySignature) {
        this.note = note;
        this.octave = octave;
        this.duration = duration;
        this.keySignature = keySignature;
    }
}

export default Note;