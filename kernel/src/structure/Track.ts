import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import Pattern from "./Pattern";
import MidiWriter from 'midi-writer-js';
import Note from "./Note";
import Chord from "./Chord";
import Tempo from "./Tempo";
import Signature from "./Signature";
import Wait from "./Wait";
import {Instrument} from "./Instrument";
import {Music} from "./Music";

let trackNumber: number = 0;

const typeClassMapping: { [type: string]: any } = {
    "Tempo": Tempo, "Signature": Signature, "Note": Note, "Chord": Chord, "Wait": Wait
};

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;

    patterns: { [id: string]: Pattern } = {};
    elements: TrackElementI[] = [];

    defaultMidiClocksPerTick: number = 24;
    defaultNotesPerMidiClock: number = 8;

    constructor(instrument: string, patterns: any, elements: any, channel?: number) {
        this.id = ++trackNumber;
        this.instrument = Instrument.get(instrument)
        this.patterns = this.parsePatterns(patterns)
        this.elements = this.parseElements(elements)
        if(channel) this.instrument.channel = channel;
    }

    get tempo() {
        return Music.music.tempo;
        //return this.elements.find(element => element.type === "Tempo") ? <Tempo>this.elements.find(element => element.type === "Tempo") : music.hasTempo() ? music.tempo : music.defaultTempo;
    }

    get signature() {
        return Music.music.signature;
    }

    get midiTrack() {
        let track = new MidiWriter.Track();
        let signature = this.signature;
        let channel = this.instrument.channel
        track.addTrackName(`Track ${this.id}`)
            .addEvent(new MidiWriter.ProgramChangeEvent({instrument: this.instrument.midiNumber}))
            .addInstrumentName(this.instrument.toString())
            .setTempo(this.tempo.tempo)
            // Parameters 3 and 4 ?
            .setTimeSignature(signature.numerator, signature.denominator, this.defaultMidiClocksPerTick, this.defaultNotesPerMidiClock);

        //console.log("TRACK ELEMENTS", JSON.stringify(this.elements, null, 2));

        for (let element of this.elements) {
            //console.log("ELEMENT", element);
            if (element.type === "Tempo") track.setTempo((element as Tempo).tempo); else if (element.type === "Signature") {
                let s = element as Signature;
                track.setTimeSignature(s.numerator, s.denominator, this.defaultMidiClocksPerTick, this.defaultNotesPerMidiClock);
            } else track.addEvent(this.getNoteEvent(element, channel));
        }

        //console.log("EVENTS", track.events);

        return track;
    }

    parseElements(elements: any) {
        let toReturn = [];
        for (let element of elements) {
            const eClass = typeClassMapping[element.type];
            if (!eClass) {
                if (element.type === "PatternInvocation") {
                    for (let i = 0; i < element.repeat; i++) {
                        // @ts-ignore
                        this.pattern(element.id).elements.forEach(patternElement => toReturn.push(patternElement));
                    }
                } else {
                    console.log(`Unknown element type: ${element.type}`);
                }
            } else {
                const {type, ...params} = element;
                toReturn.push(new eClass(...Object.values(params)));
            }
        }
        return toReturn;
    }

    parsePatterns(patterns: any) {
        let toReturn = {};
        for (let patternId in patterns) {
            // @ts-ignore
            toReturn[patternId] = new Pattern(patternId, patterns[patternId]);
        }
        return toReturn;
    }

    pattern(patternId: string): Pattern {
        let patternToReturn;
        patternToReturn = this.patterns[patternId];
        if (patternToReturn === undefined) patternToReturn = Music.music.patterns[patternId];
        return patternToReturn;
    }

    getNoteEvent(element: TrackElementI, channel: number): any {
        switch (element.type) {
            case "Note":
                return this.noteEvent(element as Note, channel);

            case "Chord":
                return this.chordEvent(element as Chord, channel);

            case "Wait":
                return this.waitEvent(element as Wait);

            default:
                return null;
        }
    }

    noteEvent(note: Note, channel: number): any {
        //console.log("PARSED NOTE", note);
        return new MidiWriter.NoteEvent({
            pitch: [this.parsedNote(note)], duration: note.duration, channel: channel
        });
    }

    chordEvent(chord: Chord, channel: number): any {
        let notes = []
        for (let note of chord.notes) {
            notes.push(this.parsedNote(note));
        }
        return new MidiWriter.NoteEvent({
            pitch: notes, duration: chord.notes[0].duration, channel: channel
        });
    }

    waitEvent(wait: Wait) {
        return new MidiWriter.NoteEvent({
            pitch: "", duration: wait.duration, channel: 0
        });
    }

    parsedNote(note: Note): string {
        return note.note + (note.accidental) + note.octave;
    }

}

export default Track;