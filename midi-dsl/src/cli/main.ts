import type {Model} from '../language/generated/ast.js';
import chalk from 'chalk';
import {Command} from 'commander';
import {MusicMLLanguageMetaData} from '../language/generated/module.js';
import {createMusicMLServices} from '../language/musicml-module.js';
import {extractAstNode} from './cli-util.js';
import {generateJson} from './generator.js';
import {NodeFileSystem} from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {build} from 'desolation-kernel';
import {buildOption} from "desolation-kernel/src/index.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createMusicMLServices(NodeFileSystem).MusicML;
    const model = await extractAstNode<Model>(fileName, services);
    const json = generateJson(model);
    let destination = opts.destination;
    const options: buildOption = {
        path: destination.slice(1, destination.length),
        midiFile: true,
        jsonFile: opts.json || false,
        webView: {
            use: opts.web || false,
            multipleTracks: opts.multiTrack || false,
        }
    }

    build(json, options)
    console.log(chalk.green(`MIDI file generated successfully`));
};

export type GenerateOptions = {
    json?: boolean;
    destination: string;
    web?: boolean;
    multiTrack?: boolean;
}

export default function (): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    const fileExtensions = MusicMLLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .option('-j, --json', 'generate the json file of the midi file')
        .option('-w, --web', 'open a web server to play the midi file')
        .option('-mt, --multi-track', 'show multiple tracks in the web server')
        .description('generate the midi file from the source file')
        .action(generateAction);

    program.parse(process.argv);
}
