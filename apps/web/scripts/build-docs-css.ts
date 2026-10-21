import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { composeDocsStylesheet } from '../registry/preset';

const webDir = join(import.meta.dirname, '..');

await writeFile(join(webDir, 'app/tokens.css'), composeDocsStylesheet());
