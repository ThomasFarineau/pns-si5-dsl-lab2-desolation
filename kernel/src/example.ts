import {build} from "./index";
import * as Path from "path";
import * as fs from "fs";


fs.readFile(Path.resolve(__dirname, './music.json'), (err, data) => {
    if (err) throw err;
    build(data.toString());
});