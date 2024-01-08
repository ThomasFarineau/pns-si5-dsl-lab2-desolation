import type { Music } from '../language/generated/ast.js';
import * as fs from 'node:fs';
import { CompositeGeneratorNode, NL, toString } from 'langium';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';

export function generateJavaScript(music: Music, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);

    if (music.tempo) {
        fileNode.append(`const tempo = ${music.tempo};`, NL, NL);
    }

    music.elements.forEach(element => {
        element.track.forEach(track => {
            fileNode.append(`console.log('Track ${track.name}');`, NL);
            track.Pattern.forEach(note => {
                fileNode.append(`console.log('Note ${note.name}');`, NL);
            });
            fileNode.append(NL);
        });
    });

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, toString(fileNode));
    return generatedFilePath;
}
