import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { Project, ScriptKind } from 'ts-morph';

const project = new Project({ compilerOptions: {} });

export const createTempSourceFile = async ({
  filename,
}: {
  filename: string;
}) => {
  const dir = await fs.mkdtemp(path.join(tmpdir(), 'kosori-'));

  return path.join(dir, filename);
};

export const formatContent = async ({
  name,
  content,
}: {
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

  return sourceFile.getFullText();
};
