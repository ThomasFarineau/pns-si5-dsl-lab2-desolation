import * as fs from "fs";
import Music from "./structure/Music";

const build = (data: any) => {
    console.log('build', data)
};

let music = Music.fromJSON(JSON.parse(fs.readFileSync('music.json', 'utf8')));
console.log(JSON.stringify(music, null, 2));