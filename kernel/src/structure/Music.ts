import MusicElementI from "./MusicElement.i";
import NotationType from "./NotationType";
import Pattern from "./Pattern";

class Music {
    elements: MusicElementI[] = [];
    notation: NotationType;
    patterns: Map<string, Pattern> = new Map<string, Pattern>();

    constructor(notation: NotationType) {
        this.notation = notation;
    }

    addMusicElement(musicElement: MusicElementI) {
        this.elements.push(musicElement);
    }

    addPattern(pattern:Pattern) {
        this.patterns.set(pattern.id, pattern);
    }
}

export default Music;