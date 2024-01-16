import MusicElementI from "./MusicElement.i";
import NotationType from "./NotationType";
import Pattern from "./Pattern";
import MidiWriter from "midi-writer-js";
import Track from "./Track";
import Tempo from "./Tempo";
import Signature from "./Signature";

const typeClassMapping: { [type: string]: any } = {
    "Track": Track, "Tempo": Tempo, "Signature": Signature,
};

export class Music {
    static music = new Music("Default", NotationType.english);

    name: string;
    notation: NotationType;
    patterns: { [id: string]: Pattern } = {};
    elements: MusicElementI[] = [];

    private defaultTempo = new Tempo(125);
    private defaultSignature = new Signature(4, 4);
    fileName: string = "";

    constructor(name: string, notation: NotationType) {
        this.name = name;
        this.notation = notation;
    }

    get tracks() {
        return this.elements.filter(element => element.type === "Track") as Track[];
    }

    get midiWriter() {
        return new MidiWriter.Writer(this.tracks.map(track => track.midiTrack));
    }

    get tempo() {
        return this.hasTempo() ? <Tempo>this.elements.find(element => element.type === "Tempo") : this.defaultTempo;
    }

    get signature() {
        return this.hasSignature() ? <Signature>this.elements.find(element => element.type === "Signature") : this.defaultSignature;
    }

    static fromJSON(parse: any) {
        this.music = new Music(parse.name, parse.notation);
        this.music.fileName = this.music.slugify(this.music.name)
        for (const element of parse.elements) {
            const eClass = typeClassMapping[element.type];
            if (!eClass) {
                console.log(`Unknown element type: ${element.type}`);
                continue;
            }
            const {type, ...params} = element;
            this.music.elements.push(new eClass(...Object.values(params)));
        }
        this.music.patterns = parse.patterns;
    }
    hasTempo() {
        return this.elements.find(element => element.type === "Tempo") !== undefined;
    }

    hasSignature() {
        return this.elements.find(element => element.type === "Signature") !== undefined;
    }

    slugify(str: string): string {
        return str
            .normalize('NFD') // Décompose les caractères en leurs composants (ex: é -> e + ´)
            .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
            .replace(/\s+/g, '_') // Remplace les espaces par des tirets bas
            .toLowerCase(); // Convertit en minuscules
    }
}