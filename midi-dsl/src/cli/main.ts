import type {Model} from '../language/generated/ast.js';
import chalk from 'chalk';
import {Command} from 'commander';
import {MidiDslLanguageMetaData} from '../language/generated/module.js';
import {createMidiDslServices} from '../language/midi-dsl-module.js';
import {extractAstNode} from './cli-util.js';
import {generateJson} from './generator.js';
import {NodeFileSystem} from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {build} from 'desolation-kernel';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createMidiDslServices(NodeFileSystem).MidiDsl;
    const model = await extractAstNode<Model>(fileName, services);
    const json = generateJson(model);
    // Building the MIDI File with kernel
    build(json)
    // ici on call le kernel pour générer le fichier midi et ouvrir un serveur web pour le jouer et le télécharger et l'afficher
    console.log(chalk.green(`MIDI file generated successfully`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function (): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    const fileExtensions = MidiDslLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);

    program.parse(process.argv);
}
