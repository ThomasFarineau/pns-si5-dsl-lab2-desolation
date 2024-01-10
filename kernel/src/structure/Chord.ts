import Note from "./Note";
import PatternElementI from "./PatternElement.i";
import TrackElementI from "./TrackElement.i";

import MidiWriter from 'midi-writer-js';

class Chord implements TrackElementI, PatternElementI {
    type = "Chord"
    notes: Note[] = [];

    constructor(notes: Note[]) {
        this.notes = notes;
    }

    addNote(note: Note) {
        this.notes.push(note);
    }

    get noteEvent() {
        return new MidiWriter.NoteEvent({
            pitch: this.notes.map(note => [note.parsedNote]), duration: this.notes[0].duration,
        });
    }
}

export default Chord;