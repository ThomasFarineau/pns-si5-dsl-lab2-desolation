import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";

class Signature implements MusicElementI, TrackElementI {
    type = "Signature";

    numerator: number;
    denominator: number;

    constructor(numerator: number, denominator: number) {
        this.numerator = numerator;
        this.denominator = denominator;
    }
}

export default Signature;