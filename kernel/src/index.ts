import Music from "./structure/Music";
import NotationType from "./structure/NotationType";
import Track from "./structure/Track";
import Instrument from "./structure/Instrument";
import Signature from "./structure/Signature";
import Tempo from "./structure/Tempo";
import Pattern from "./structure/Pattern";
import PatternInvocation from "./structure/PatternInvocation";
import Note from "./structure/Note";
import NoteName from "./structure/NoteName";
import Duration from "./structure/Duration";
import KeySignature from "./structure/KeySignature";

const build = (data: any) => {
  console.log('build', data)
};

let music = new Music(NotationType.english);
music.addMusicElement(new Tempo(120))
music.addMusicElement(new Signature(4, 4));

let track = new Track(Instrument.Piano);
let pattern = new Pattern("motif A")
pattern.addElement(new Note(NoteName.A, 4, Duration.e, KeySignature.default))

track.addElement(pattern);
track.addElement(new PatternInvocation(pattern.id))

music.addMusicElement(track);

console.log(JSON.stringify(music, null, 2))