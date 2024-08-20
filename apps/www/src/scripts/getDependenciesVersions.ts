import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDependenciesVersions = () => {
  const packageJsonPath = path.resolve(
    __dirname,
    '../../../../packages/ui/package.json',
  );

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as {
    dependencies: Record<string, string>;
  };

  const versionObject = Object.fromEntries(
    Object.entries(packageJson.dependencies).map(([key, value]) => [
      key,
      value.replace(/^[^0-9]*([0-9]+\.[0-9]+\.[0-9]+).*$/, '$1'), // Regex to extract the version number
    ]),
  );

  const outputFilePath = path.resolve(__dirname, '../config/versions.ts');

  if (fs.existsSync(outputFilePath)) {
    console.log(
      'Warning: versions.ts already exists. It will be overwritten.',
      '\n',
    );
  }

  const tsContent = `export const versions: Record<string, string> = ${JSON.stringify(versionObject, null, 2)};`;

  fs.writeFileSync(outputFilePath, tsContent, 'utf-8');

  console.log(`Versions written to ${outputFilePath}`);
};

try {
  getDependenciesVersions();
} catch (error) {
  console.error(error);
}
