import MusicElementI from "./MusicElement.i";
import NotationType from "./NotationType";
import Pattern from "./Pattern";

class Music {
    elements: MusicElementI[] = [];
    notation: NotationType;
    patterns: { [id: string]: Pattern} = {};

    constructor(notation: NotationType) {
        this.notation = notation;
    }

    addMusicElement(musicElement: MusicElementI) {
        this.elements.push(musicElement);
    }

    addPattern(pattern: Pattern) {
        this.patterns[pattern.id] = pattern;
    }

    static fromJSON(parse: any) {
        let music = new Music(parse.notation);
        music.elements = parse.elements;
        music.patterns = parse.patterns;
        return music;
    }
}

export default Music;