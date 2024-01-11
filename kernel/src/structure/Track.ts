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
import {NoteEvent} from "midi-writer-js/build/types/midi-events/note-event";
import NoteEventElementI from "./NoteEventElement.i";

let trackNumber: number = 0;

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;
    elements: TrackElementI[] = [];
    patterns: { [id: string]: Pattern } = {};
    defaultMidiClocksPerTick: number = 24;
    defaultNotesPerMidiClock: number = 8;

    constructor(instrument: Instrument) {
        this.id = ++trackNumber;
        this.instrument = instrument;
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

        for (let element of this.elements) {
            if (element.type === "Tempo")
                track.setTempo((element as Tempo).tempo);
            else if (element.type === "Signature") {
                let s = element as Signature;
                track.setTimeSignature(s.numerator, s.denominator, this.defaultMidiClocksPerTick, this.defaultNotesPerMidiClock);
            }
            else
                track.addEvent(this.getNoteEvent(element));
        }

        track.addEvent([new MidiWriter.NoteEvent({
            pitch: ['E4', 'D4'], duration: '4'
        }), new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}), new MidiWriter.NoteEvent({
            pitch: ['E4', 'D4'], duration: '4'
        }), new MidiWriter.NoteEvent({
            pitch: ['C4'], duration: '2'
        })], function (event, index) {
            return {sequential: true};
        });
        return track;
    }

    getNoteEvent(element: TrackElementI): NoteEvent {
        switch (element.type) {
            case "Note":
            case "Chord":
            case "Wait":
                let e = element as NoteEventElementI;
                return e.noteEvent();

            case "PatternInvocation":
                let patternInvoc = element as PatternInvocation;
                let pattern = this.pattern(patternInvoc.patternId);
                // play pattern
                break;

            default:
                throw "Bad element type";
        }
    }
}

export default Track;