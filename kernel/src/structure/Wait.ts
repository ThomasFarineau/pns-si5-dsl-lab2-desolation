import TrackElementI from "./TrackElement.i";
import PatternElementI from "./PatternElement.i";
import Duration from "./Duration";
import MidiWriter from "midi-writer-js";

class Wait implements TrackElementI, PatternElementI{
    type = "Wait"
    duration: Duration;

    constructor(duration: Duration) {
        this.duration = duration;
    }

    get noteEvent() {
        return new MidiWriter.NoteEvent({
            wait: this.duration
        });
    }
}

export default Wait