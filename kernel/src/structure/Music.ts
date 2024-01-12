import MusicElementI from "./MusicElement.i";
import NotationType from "./NotationType";
import Pattern from "./Pattern";
import MidiWriter from "midi-writer-js";
import Track from "./Track";
import Tempo from "./Tempo";
import Signature from "./Signature";

class Music {
    elements: MusicElementI[] = [];
    notation: NotationType;
    patterns: { [id: string]: Pattern} = {};

    defaultTempo = new Tempo({type: "Tempo",tempo: 125});

    constructor(notation: NotationType) {
        this.notation = notation;
    }

    addMusicElement(musicElement: MusicElementI) {
        this.elements.push(musicElement);
    }

    addPattern(pattern: Pattern) {
        this.patterns[pattern.id] = pattern;
    }

    static typeClassMapping: { [type: string]: any } = {
        "Track": Track,
        "Tempo": Tempo,
        "Signature": Signature,
    };

    static fromJSON(parse: any) {
        let music = new Music(parse.notation);
        parse.elements.forEach((element: any) => {
            const ElementClass = Music.typeClassMapping[element.type];
            if (ElementClass) {
                music.elements.push(new ElementClass(element));
            } else {
                console.log(`Unknown element type: ${element.type}`);
            }
        });
        music.patterns = parse.patterns;
        console.log(JSON.stringify(music, null, 2));
        return music;
    }

    get tracks() { return this.elements.filter(element => element.type === "Track") as Track[]; }

    get midiWriter() {
        return new MidiWriter.Writer(this.tracks.map(track => track.midiTrack));
    }

    hasTempo() {
        return this.elements.find(element => element.type === "Tempo") !== undefined;
    }

    get tempo() {
        if (this.hasTempo())
            return <Tempo>this.elements.find(element => element.type === "Tempo");
        else
            return this.defaultTempo;
    }

    get signature() {
        // Assumes there is a signature element because grammar should assert it
        return <Signature>this.elements.find(element => element.type === "Signature");
    }
}

export default Music;