"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Music_1 = __importDefault(require("./structure/Music"));
const NotationType_1 = __importDefault(require("./structure/NotationType"));
const Track_1 = __importDefault(require("./structure/Track"));
const Instrument_1 = __importDefault(require("./structure/Instrument"));
const Signature_1 = __importDefault(require("./structure/Signature"));
const Tempo_1 = __importDefault(require("./structure/Tempo"));
const Pattern_1 = __importDefault(require("./structure/Pattern"));
const Chord_1 = __importDefault(require("./structure/Chord"));
const PatternInvocation_1 = __importDefault(require("./structure/PatternInvocation"));
const build = (data) => {
    console.log('build', data);
};
let music = new Music_1.default(NotationType_1.default.english);
music.addMusicElement(new Tempo_1.default(120));
music.addMusicElement(new Signature_1.default(4, 4));
let track = new Track_1.default(Instrument_1.default.Piano);
let pattern = new Pattern_1.default("motif A");
pattern.addElement(new Chord_1.default());
track.addElement(pattern);
track.addElement(new PatternInvocation_1.default(pattern.id));
music.addMusicElement(track);
console.log('music', music);
