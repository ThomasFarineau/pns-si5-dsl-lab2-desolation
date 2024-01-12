import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";

class Signature implements MusicElementI, TrackElementI {
    type = "Signature";

    numerator: number;
    denominator: number;

    constructor(signature: Signature) {
        this.numerator = signature.numerator;
        this.denominator = signature.denominator;
    }
}

export default Signature;