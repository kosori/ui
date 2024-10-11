'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx/lite';
import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kosori/ui/collapsible';

const fileTreeStyles = tv({
  slots: {
    fileTree: 'rounded-lg border bg-grey-bg-subtle p-2',
    folder: 'w-full',
    folderName: clsx(
      'group w-full inline-flex items-center gap-2 rounded-lg px-2 h-8',
      'hover:bg-grey-bg-hover',
    ),
    folderFiles: clsx(
      'overflow-hidden',
      'data-[state=closed]:animate-collapsible-up',
      'data-[state=open]:animate-collapsible-down',
    ),
    file: clsx(
      'w-full inline-flex h-8 select-none items-center gap-2 rounded-lg px-2 text-sm',
      'hover:bg-grey-bg-hover',
    ),
  },
});

const { fileTree, folder, folderName, folderFiles, file } = fileTreeStyles();

type FileTreeRef = HTMLDivElement;
type FileTreeProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * FileTree component that represents a hierarchical structure of files and folders.
 *
 * @param {FileTreeProps} props - Additional props to pass to the file tree container.
 *
 * @example
 * <FileTree>
 *   <Folder>
 *     <FolderName>Documents</FolderName>
 *     <FolderFiles>
 *       <File>Resume.pdf</File>
 *       <File>CoverLetter.docx</File>
 *     </FolderFiles>
 *   </Folder>
 *   <Folder>
 *     <FolderName>Images</FolderName>
 *     <FolderFiles>
 *       <File>Vacation.jpg</File>
 *       <File>Profile.png</File>
 *     </FolderFiles>
 *   </Folder>
 * </FileTree>
 */
export const FileTree = forwardRef<FileTreeRef, FileTreeProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={fileTree({ className })} {...props} />
  ),
);

FileTree.displayName = 'FileTree';

type FolderRef = React.ElementRef<typeof Collapsible>;
type FolderProps = React.ComponentPropsWithoutRef<typeof Collapsible>;

/**
 * Folder component that represents a collapsible folder in the file tree.
 *
 * @param {FolderProps} props - Additional props to pass to the folder component.
 *
 * @example
 * <Folder>
 *   <FolderName>My Folder</FolderName>
 *   <FolderFiles>
 *     <File>File1.txt</File>
 *     <File>File2.txt</File>
 *   </FolderFiles>
 * </Folder>
 */
export const Folder = forwardRef<FolderRef, FolderProps>(
  ({ className, ...props }, ref) => (
    <Collapsible ref={ref} className={folder({ className })} {...props} />
  ),
);

Folder.displayName = 'Folder';

type FolderNameRef = React.ElementRef<typeof CollapsibleTrigger>;
type FolderNameProps = React.ComponentPropsWithoutRef<
  typeof CollapsibleTrigger
>;

/**
 * FolderName component that acts as the clickable header for a Folder.
 *
 * @param {FolderNameProps} props - Additional props to pass to the folder name.
 *
 * @example
 * <FolderName>My Folder</FolderName>
 */
export const FolderName = forwardRef<FolderNameRef, FolderNameProps>(
  ({ className, children, ...props }, ref) => (
    <CollapsibleTrigger
      ref={ref}
      className={folderName({ className })}
      {...props}
    >
      <FolderIcon
        className={clsx('size-4', 'group-data-[state=open]:hidden')}
      />
      <FolderOpenIcon
        className={clsx('size-4', 'group-data-[state=closed]:hidden')}
      />
      {children}
    </CollapsibleTrigger>
  ),
);

FolderName.displayName = 'FolderName';

type FolderFilesRef = React.ElementRef<typeof CollapsibleContent>;
type FolderFilesProps = React.ComponentPropsWithoutRef<
  typeof CollapsibleContent
>;

/**
 * FolderFiles component that displays the contents of a Folder.
 *
 * @param {FolderFilesProps} props - Additional props to pass to the folder files container.
 *
 * @example
 * <FolderFiles>
 *   <File>File1.txt</File>
 *   <File>File2.txt</File>
 * </FolderFiles>
 */
export const FolderFiles = forwardRef<FolderFilesRef, FolderFilesProps>(
  ({ className, children, ...props }, ref) => (
    <CollapsibleContent
      ref={ref}
      className={folderFiles({ className })}
      {...props}
    >
      <div className='ms-2 flex flex-col border-l ps-2'>{children}</div>
    </CollapsibleContent>
  ),
);

FolderFiles.displayName = 'FolderFiles';

type FileRef = HTMLDivElement;
type FileProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * Optional icon to display next to the file name.
   */
  icon?: React.ReactNode;
};

/**
 * File component that represents a single file in the file tree.
 *
 * @param {FileProps} props - Additional props to pass to the file component.
 * @param {React.ReactNode} [icon=<FileIcon />] - Optional icon to display next to the file name.
 *
 * @example
 * <File>MyFile.txt</File>
 */
export const File = forwardRef<FileRef, FileProps>(
  (
    { className, icon = <FileIcon className='size-4' />, children, ...props },
    ref,
  ) => (
    <div ref={ref} className={file({ className })} {...props}>
      {icon}
      {children}
    </div>
  ),
);

File.displayName = 'File';
