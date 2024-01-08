import * as fs from 'node:fs';
import { CompositeGeneratorNode, NL, toString } from 'langium';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
export function generateJavaScript(model, filePath, destination) {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;
    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    model.greetings.forEach(greeting => { var _a; return fileNode.append(`console.log('Hello, ${(_a = greeting.person.ref) === null || _a === void 0 ? void 0 : _a.name}!');`, NL); });
    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, toString(fileNode));
    return generatedFilePath;
}
//# sourceMappingURL=generator.js.map