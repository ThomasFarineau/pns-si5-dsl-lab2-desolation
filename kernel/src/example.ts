import {Music} from "./structure/Music";
import fs from "fs";
import express from "express";

export const music = Music.fromJSON(JSON.parse(fs.readFileSync('music.json', 'utf8')));
const write = music.midiWriter;
console.log(JSON.stringify(write, null, 2));

// Créer une application Express
const app = express();

// Servir les fichiers statiques de public
app.use(express.static('public'));

// Endpoint pour obtenir le MIDI
app.get('/midi', (req, res) => {
    res.type('audio/midi');
    res.send(write.dataUri());
});

// Démarrer le serveur
const PORT = 3000; // Utilisez le port de votre choix
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});