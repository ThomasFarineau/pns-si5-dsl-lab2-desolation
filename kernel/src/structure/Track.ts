import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";
import Instrument from "./Instrument";
import Pattern from "./Pattern";
import MidiWriter from 'midi-writer-js';
import {music} from "../index";
import Tempo from "./Tempo";
import Music from "./Music";

let trackNumber: number = 0;

class Track implements MusicElementI {
    type = "Track";

    id: number;
    instrument: Instrument;
    elements: TrackElementI[] = [];
    patterns: { [id: string]: Pattern } = {};

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

    get midiTrack() {
        let track = new MidiWriter.Track();
        let signature = this.signature;

        track.addTrackName(`Track ${this.id}`)
            .addEvent(new MidiWriter.ProgramChangeEvent({instrument: this.instrument}))
            .addInstrumentName(this.instrument.toString())
            .setTempo(this.tempo.tempo)
            // Parameters 3 and 4 ?
            .setTimeSignature(signature.numerator, signature.denominator, 0, 0);

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
}

export default Track;