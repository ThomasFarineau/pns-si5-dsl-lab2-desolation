import Duration from "./Duration";
import PatternElementI from "./PatternElement.i";
import NoteName from "./NoteName";
import TrackElementI from "./TrackElement.i";

import MidiWriter from 'midi-writer-js';
import AccidentalType from "./AccidentalType";
import NoteEventElementI from "./NoteEventElement.i";

class Note implements TrackElementI, PatternElementI, NoteEventElementI {
    type = "Note"
    note: NoteName;
    octave: number;
    duration: Duration;
    accidentalType: AccidentalType;

    constructor(note: NoteName, octave: number, duration: Duration, keySignature: AccidentalType) {
        this.note = note;
        this.octave = octave;
        this.duration = duration;
        this.accidentalType = keySignature;
    }

    get parsedNote() {
        return this.note + (this.accidentalType) + this.octave;
    }

    noteEvent() {
        return new MidiWriter.NoteEvent({
            pitch: [this.parsedNote], duration: this.duration,
        });
    }
}

export default Note;