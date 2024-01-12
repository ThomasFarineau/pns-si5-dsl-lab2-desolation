import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import Instrument from "./Instrument";
import Pattern from "./Pattern";
import MidiWriter from 'midi-writer-js';
import {music} from "../index";
import Note from "./Note";
import Chord from "./Chord";
import PatternInvocation from "./PatternInvocation";
import Tempo from "./Tempo";
import Signature from "./Signature";
import Wait from "./Wait";

let trackNumber: number = 0;

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;
    elements: TrackElementI[] = [];
    patterns: { [id: string]: Pattern } = {};
    defaultMidiClocksPerTick: number = 24;
    defaultNotesPerMidiClock: number = 8;

    constructor(track: Track) {
        this.id = ++trackNumber;
        this.instrument = track.instrument;
        this.elements = track.elements;
        this.patterns = track.patterns;
    }

    addElement(element: MusicElementI) {
        this.elements.push(element);
    }

    addPattern(pattern: Pattern) {
        this.patterns[pattern.id] = pattern;
    }

    get tempo() {
        return music.tempo;
        //return this.elements.find(element => element.type === "Tempo") ? <Tempo>this.elements.find(element => element.type === "Tempo") : music.hasTempo() ? music.tempo : music.defaultTempo;
    }

    get signature() {
        return music.signature;
    }

    pattern(patternId: string): Pattern {
        let patternToReturn;
        patternToReturn = this.patterns[patternId];
        if (patternToReturn ===  undefined)
            patternToReturn = music.patterns[patternId];
        return patternToReturn;
    }

    get midiTrack() {
        let track = new MidiWriter.Track();
        let signature = this.signature;

        track.addTrackName(`Track ${this.id}`)
            .addEvent(new MidiWriter.ProgramChangeEvent({instrument: this.instrument}))
            .addInstrumentName(this.instrument.toString())
            .setTempo(this.tempo.tempo)
            // Parameters 3 and 4 ?
            .setTimeSignature(signature.numerator, signature.denominator, this.defaultMidiClocksPerTick, this.defaultNotesPerMidiClock);

        console.log("TRACK ELEMENTS", JSON.stringify(this.elements, null, 2));

        for (let element of this.elements) {
            console.log("ELEMENT", element);
            if (element.type === "Tempo")
                track.setTempo((element as Tempo).tempo);
            else if (element.type === "Signature") {
                let s = element as Signature;
                track.setTimeSignature(s.numerator, s.denominator, this.defaultMidiClocksPerTick, this.defaultNotesPerMidiClock);
            }
            else
                track.addEvent(this.getNoteEvent(element));
        }

        console.log("EVENTS", track.events);

        return track;
    }

    getNoteEvent(element: TrackElementI): any {
        switch (element.type) {
            case "Note":
                return this.noteEvent(element as Note);

            case "Chord":
                return this.chordEvent(element as Chord);

            case "Wait":
                return this.waitEvent(element as Wait);

            case "PatternInvocation":
                let patternInvoc = element as PatternInvocation;
                let pattern = this.pattern(patternInvoc.patternId);
                // play pattern
                return null;

            default:
                return null;
        }
    }

    noteEvent(note: Note): any {
        console.log("PARSED NOTE", note);
        return new MidiWriter.NoteEvent({
            pitch: [this.parsedNote(note)], duration: note.duration,
        });
    }

    chordEvent(chord: Chord): any {
        console.log("PARSED CHORD", chord);
        let notes = []
        for (let note of chord.notes) {
            notes.push(this.parsedNote(note));
        }
        return new MidiWriter.NoteEvent({
            pitch: notes, duration: chord.notes[0].duration,
        });
    }

    waitEvent(wait: Wait) {
        console.log("WAIT", wait.duration);
        return new MidiWriter.NoteEvent({
            wait: wait.duration
        });
    }

    parsedNote(note: Note): string {
        return note.note + (note.accidentalType) + note.octave;
    }

}

export default Track;