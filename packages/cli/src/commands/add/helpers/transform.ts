import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import type { SourceFile } from 'ts-morph';
import { Project, ScriptKind } from 'ts-morph';

import type { Config } from '~/commands/init/schema';

const project = new Project({ compilerOptions: {} });

export const createTempSourceFile = async ({
  filename,
}: {
  filename: string;
}) => {
  const dir = await fs.mkdtemp(path.join(tmpdir(), 'kosori-'));

  return path.join(dir, filename);
};

export const replaceImports = ({
  sourceFile,
  config,
}: {
  sourceFile: SourceFile;
  config: Config;
}) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    // Replace @kosori/ui with the components alias.
    if (moduleSpecifier.startsWith('@kosori/ui/')) {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^@kosori\/ui/, config.aliases.ui),
      );
    }
  }

  return sourceFile;
};

export const transform = async ({
  config,
  name,
  content,
}: {
  config: Config;
  name: string;
  content: string;
}) => {
  const tempFile = await createTempSourceFile({ filename: name });
  const sourceFile = project.createSourceFile(
    tempFile,
    content.replace(/\\n/g, '\n'),
    {
      scriptKind: ScriptKind.JSX,
    },
  );

  replaceImports({ sourceFile, config });

  return sourceFile.getFullText();
};
