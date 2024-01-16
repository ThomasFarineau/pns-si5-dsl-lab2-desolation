import TrackElementI from "./TrackElement.i";
import PatternElementI from "./PatternElement.i";

class Wait implements TrackElementI, PatternElementI {
    type = "Wait"
    duration: string;

    constructor(duration: string) {
        this.duration = duration;
    }
}

export default Wait