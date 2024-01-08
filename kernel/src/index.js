"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const PatternInvocation_1 = __importDefault(require("./structure/PatternInvocation"));
const Note_1 = __importDefault(require("./structure/Note"));
const NoteName_1 = __importDefault(require("./structure/NoteName"));
const Duration_1 = __importDefault(require("./structure/Duration"));
const KeySignature_1 = __importDefault(require("./structure/KeySignature"));
const fs = __importStar(require("fs"));
const build = (data) => {
    console.log('build', data);
};
let music = new Music_1.default(NotationType_1.default.english);
music.addMusicElement(new Tempo_1.default(120));
music.addMusicElement(new Signature_1.default(4, 4));
let track = new Track_1.default(Instrument_1.default.Piano);
let pattern = new Pattern_1.default("motif A");
pattern.addElement(new Note_1.default(NoteName_1.default.A, 4, Duration_1.default.e, KeySignature_1.default.default));
track.addPattern(pattern);
track.addElement(new PatternInvocation_1.default(pattern.id));
music.addMusicElement(track);
let str = JSON.stringify(music, null, 2);
// write str to file
fs.writeFile('music.json', str, (err) => {
    if (err)
        throw err;
    console.log('The file has been saved!');
});
