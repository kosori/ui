import {
  File,
  FileTree,
  Folder,
  FolderFiles,
  FolderName,
} from '@kosori/ui/file-tree';

export const FileTreeDemo = () => {
  return (
    <FileTree className='w-full max-w-xs'>
      <Folder>
        <FolderName>app</FolderName>

        <FolderFiles>
          <Folder>
            <FolderName>components</FolderName>

            <FolderFiles>
              <File>button.tsx</File>
              <File>card.tsx</File>
            </FolderFiles>
          </Folder>

          <File>layout.tsx</File>
          <File>global.css</File>
          <File>page.tsx</File>
        </FolderFiles>
      </Folder>

      <Folder defaultOpen>
        <FolderName>public</FolderName>

        <FolderFiles>
          <File>favicon.ico</File>
          <File>index.html</File>
        </FolderFiles>
      </Folder>

      <File>package.json</File>
    </FileTree>
  );
};
