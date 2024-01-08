import Duration from "./Duration";
import KeySignature from "./KeySignature";

class Note {
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