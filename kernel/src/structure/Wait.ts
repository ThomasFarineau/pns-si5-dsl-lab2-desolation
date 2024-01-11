import TrackElementI from "./TrackElement.i";
import PatternElementI from "./PatternElement.i";
import Duration from "./Duration";
import MidiWriter from "midi-writer-js";
import NoteEventElement from "./NoteEventElement";

class Wait implements TrackElementI, PatternElementI, NoteEventElement {
    type = "Wait"
    duration: Duration;

    constructor(duration: Duration) {
        this.duration = duration;
    }

    noteEvent() {
        return new MidiWriter.NoteEvent({
            wait: this.duration
        });
    }
}

export default Wait