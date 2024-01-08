import MusicElementI from "./MusicElement.i";
import NotationType from "./NotationType";

class Music {
    elements: MusicElementI[] = [];
    notation: NotationType;

    constructor(notation: NotationType) {
        this.notation = notation;
    }

    addMusicElement(musicElement: MusicElementI) {
        this.elements.push(musicElement);
    }
}

export default Music;