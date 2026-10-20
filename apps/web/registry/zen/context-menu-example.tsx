import {
  IconCopy,
  IconPencil,
  IconShare,
  IconTrash,
} from '@tabler/icons-react';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

const ContextMenuExample = () => (
  <ContextMenu>
    <ContextMenuTrigger className='flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm'>
      Right click here
    </ContextMenuTrigger>
    <ContextMenuPopup>
      <ContextMenuItem>
        <IconPencil aria-hidden='true' />
        Edit
        <ContextMenuShortcut>⌘E</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        <IconCopy aria-hidden='true' />
        Copy
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        <IconShare aria-hidden='true' />
        Share
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant='destructive'>
        <IconTrash aria-hidden='true' />
        Delete
        <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuPopup>
  </ContextMenu>
);

export default ContextMenuExample;
