import MusicElementI from "./MusicElement.i";
import TrackElementI from "./TrackElement.i";

class Tempo implements MusicElementI, TrackElementI {
    type = "Tempo";
    tempo: number;

    constructor(tempo: Tempo) {
        this.tempo = tempo.tempo;
    }
}

export default Tempo;