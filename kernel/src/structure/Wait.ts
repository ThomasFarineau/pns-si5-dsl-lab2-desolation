import TrackElementI from "./TrackElement.i";
import PatternElementI from "./PatternElement.i";
import Duration from "./Duration";

class Wait implements TrackElementI, PatternElementI{
    type = "Wait"
    duration: Duration;

    constructor(duration: Duration) {
        this.duration = duration;
    }
}

export default Wait