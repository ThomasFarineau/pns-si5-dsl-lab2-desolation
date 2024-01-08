import PatternElementI from "./PatternElement.i";
import TrackElementI from "./TrackElement.i";

class PatternInvocation implements TrackElementI, PatternElementI {
    type = "PatternInvocation"
    patternId: string;

    constructor(patternId: string) {
        this.patternId = patternId;
    }
}

export default PatternInvocation;