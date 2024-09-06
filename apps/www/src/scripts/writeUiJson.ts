import path from 'path';
import { fileURLToPath } from 'url';

import { convertFilesToJson } from '~/config/scripts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.resolve(__dirname, '../../../../packages/ui/src');
const JSON_PATH = 'components/index.json';
const OUTPUT_FILE_DIR = path.resolve(__dirname, '../../public/components');

convertFilesToJson({
  dir: DIR,
  jsonPath: JSON_PATH,
  outputFileDir: OUTPUT_FILE_DIR,
});
