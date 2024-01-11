import Note from "./Note";
import PatternElementI from "./PatternElement.i";
import TrackElementI from "./TrackElement.i";

import MidiWriter from 'midi-writer-js';
import NoteEventElementI from "./NoteEventElement.i";

class Chord implements TrackElementI, PatternElementI, NoteEventElementI {
    type = "Chord"
    notes: Note[] = [];

    constructor(notes: Note[]) {
        this.notes = notes;
    }

    addNote(note: Note) {
        this.notes.push(note);
    }

    noteEvent() {
        return new MidiWriter.NoteEvent({
            pitch: this.notes.map(note => [note.parsedNote]), duration: this.notes[0].duration,
        });
    }
}

export default Chord;