import {Music} from "./structure/Music";
import * as Path from "path";
import * as fs from "fs";
import express from "express";
import sass from 'node-sass';
import { promisify } from 'util';

type buildOption = {
    path?: string, midiFile?: boolean, jsonFile?: boolean, webView?: {
        use?: boolean, multipleTracks?: boolean,
    }
}

const defaultOptions: buildOption = {
    path: Path.resolve(__dirname, '../../generated'), midiFile: true, jsonFile: true, webView: {
        use: true, multipleTracks: true,
    }
}

export const build = (data: any, options: buildOption = defaultOptions) => {
    Music.fromJSON(JSON.parse(data));
    const writer = Music.music.midiWriter;

    if (options.path) {
        let filePath = options.path + (!options.path.endsWith(Path.sep) ? Path.sep : "");
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
            console.warn("No path specified, please specify a path to save the midi file.");
        }
        if (options.jsonFile) {
            console.warn("No path specified, please specify a path to save the json file.");
        }
    }

    if (options.webView) {
        if (options.webView.use) {
            const app = express();
            compileSass(Path.resolve(__dirname, '../public/style.sass')).then((css) => {
                app.get('/style', (req, res) => {
                    res.type('text/css');
                    res.send(css);
                })
            })


            app.get('/', (req, res) => {
                res.sendFile(Path.resolve(__dirname, '../public/index.html'));
            })

            if (options.webView.multipleTracks) {
                console.log("MULTIPLETRACKS -> NOT IMPLEMENTED YET");
            }

            app.get('/midi', (req, res) => {
                res.type('audio/midi');
                res.send(writer.dataUri());
            });

            const PORT = 3000; // Utilisez le port de votre choix
            app.listen(PORT, () => {
                console.log(`Webview running at http://localhost:${PORT}/`);
            });
        } else {
            if (options.webView.multipleTracks) {
                console.warn("Multiple tracks view need the web view to be enabled.");
            }
        }
    }
};

const compileSass = async (sassFilePath: string) => {
    const sassRender = promisify(sass.render);
    try {
        const result = await sassRender({ file: sassFilePath });
        return result.css.toString();
    } catch (error) {
        console.error('Error compiling SASS:', error);
    }
};
