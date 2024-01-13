import {Music} from "./structure/Music";
import * as Path from "path";
import * as fs from "fs";

type buildOption = {
    path?: string, midiFile?: boolean, jsonFile?: boolean, webView?: {
        use?: boolean, multipleTracks?: boolean,
    }
}

const defaultOptions: buildOption = {
    path: Path.resolve(__dirname, '../../generated'), midiFile: true, jsonFile: true
}

export const build = (data: any, options: buildOption = defaultOptions) => {
    Music.fromJSON(JSON.parse(data));
    const writer = Music.music.midiWriter;

    if (options.path) {
        let filePath = options.path + (!options.path.endsWith("/") ? "/" : "");
        let fileName = `${Music.music.fileName}`;
        if (options.midiFile) {
            let file = writer.buildFile();
            fs.writeFile(filePath + fileName + ".mid", file, (err) => {
                if (err) throw err;
                console.log('MIDI file saved in ' + filePath + ' (' + fileName + ".mid" + ')');
            });
        }

        if (options.jsonFile) {
            let json = JSON.stringify(Music.music, null, 2);
            fs.writeFile(filePath + fileName + ".json", json, (err) => {
                if (err) throw err;
                console.log('JSON file saved in ' + filePath + ' (' + fileName + ".json" + ')');
            });
        }

    } else {
        if (options.midiFile) {
            console.warn("No path specified, please specify a path to save the midi file");
        }
    }


    /*

        const app = express();

        app.use(express.static('public'));
        console.log(express.static('public'));

        app.get('/midi', (req, res) => {
            res.type('audio/midi');
            res.send(writer.dataUri());
        });

        const PORT = 3000; // Utilisez le port de votre choix
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

     */
};
