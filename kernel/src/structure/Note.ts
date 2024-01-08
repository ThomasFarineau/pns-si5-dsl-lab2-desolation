import Duration from "./Duration";
import KeySignature from "./KeySignature";

class Note {
    note: NoteName;
    octave: number;
    duration: Duration;
    keySignature: KeySignature;
}

export default Note;