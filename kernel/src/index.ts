import {Music} from "./structure/Music";
import * as Path from "path";
import * as fs from "fs";
import express from "express";
import sass from 'node-sass';
import {promisify} from 'util';

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
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true});
        }
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

            compileSass(Path.resolve(__dirname, '../public/style.sass')).then((css) => app.get('/style', (req, res) => {
                res.type('text/css');
                res.send(css);
            }))

            app.get('/script', (req, res) => {
                res.sendFile(Path.resolve(__dirname, '../public/script.js'));
            })

            type webTrackData = {
                id: number, instrument: string, channel: number,
            }

            type webData = {
                name: string, midi?: string, json?: string, tracks?: webTrackData[]
            }

            app.get('/download/:type/' + Music.music.fileName, (req, res) => {
                if (req.params.type === "midi") {
                    res.type('audio/midi');
                    res.send(writer.dataUri());
                } else {
                    res.type('application/json');
                    res.send(JSON.stringify(Music.music, null, 2));
                }
            })


            app.get('/data', (req, res) => {
                res.type('application/json');
                let json: webData = {
                    "name": Music.music.name,
                }
                if (options.path) {
                    if (options.midiFile) json["midi"] = "/download/midi/" + Music.music.fileName;
                    if (options.jsonFile) json["json"] = "/download/json/" + Music.music.fileName;
                }
                if (options.webView && options.webView.multipleTracks) {
                    json["tracks"] = Music.music.tracks.map(track => {
                        return {
                            "id": track.id,
                            "instrument": track.instrument.name,
                            "channel": track.instrument.channel,
                            "tempo": track.tempo.tempo,
                        }
                    });
                }
                res.send(json);
            })

            app.get('/', (req, res) => {
                res.sendFile(Path.resolve(__dirname, '../public/index.html'));
            })

            app.get('/midi', (req, res) => {
                res.type('audio/midi');
                res.send(writer.dataUri());
            });

            if (options.webView.multipleTracks) {
                app.get('/track/:id', (req, res) => {
                    let track = Music.music.tracks.find(track => track.id === parseInt(req.params.id));
                    if (track) {
                        res.type('audio/midi');
                        res.send(track.trackWriter.dataUri());
                    } else {
                        res.status(404).send("Track not found");
                    }
                })
            }

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

const compileSass = async (sassFilePath: string) => new Promise<string>((resolve, reject) => {
    const sassRender = promisify(sass.render);
    sassRender({file: sassFilePath}).then((result) => {
        resolve(result.css.toString());
    }).catch((error) => {
        reject('Error compiling SASS:' + error);
    });
});