import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import type { SourceFile } from 'ts-morph';
import { Project, ScriptKind } from 'ts-morph';

const project = new Project({ compilerOptions: {} });

/** Type for module specifier and alias pairs */
type ModuleMappings = { specifier: string; alias: string }[];

/**
 * Creates a temporary source file in the system's temporary directory.
 *
 * @param filename - The name of the temporary file to create.
 * @returns The full path to the created temporary file.
 */
export const createTemporarySourceFile = async (
  filename: string,
): Promise<string> => {
  const tempDir = await fs.mkdtemp(path.join(tmpdir(), 'kosori-'));
  return path.join(tempDir, filename);
};

type UpdateImportDeclarations = {
  sourceFile: SourceFile;
  moduleMappings: ModuleMappings;
};

/**
 * Replaces specific import declarations in a source file based on the provided
 * configuration and module specifier mappings.
 *
 * @param params - The parameters for replacing imports.
 * @param params.sourceFile - The source file to modify.
 * @param params.moduleMappings - An array of module specifier and alias pairs.
 * @returns The modified source file.
 */
export const updateImportDeclarations = ({
  sourceFile,
  moduleMappings,
}: UpdateImportDeclarations): SourceFile => {
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    for (const { specifier, alias } of moduleMappings) {
      const regex = new RegExp(`^${specifier}`);
      if (moduleSpecifier.startsWith(specifier)) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(regex, alias),
        );
      }
    }
  }

  return sourceFile;
};

type TransformContent = {
  name: string;
  content: string;
  moduleMappings: ModuleMappings;
};

/**
 * Transforms the provided content by creating a temporary source file,
 * updating its import declarations, and returning the modified content.
 *
 * @param params - The parameters for the transformation.
 * @param params.name - The name of the temporary source file.
 * @param params.content - The content to be transformed.
 * @param params.moduleMappings - An array of module specifier and alias pairs.
 * @returns The full text of the modified source file.
 */
export const transformContent = async ({
  name,
  content,
  moduleMappings,
}: TransformContent): Promise<string> => {
  const tempFilePath = await createTemporarySourceFile(name);
  const sourceFile = project.createSourceFile(
    tempFilePath,
    content.replace(/\\n/g, '\n'),
    {
      scriptKind: ScriptKind.JSX,
    },
  );

  updateImportDeclarations({ sourceFile, moduleMappings });

  return sourceFile.getFullText();
};
