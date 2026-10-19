import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconTrash,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DropdownMenuExample = () => (
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant='outline' />}>
      Open menu
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Playback</DropdownMenuLabel>
        <DropdownMenuItem>
          <IconPlayerPlay aria-hidden='true' />
          Play
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <IconPlayerPause aria-hidden='true' />
          Pause
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlayerSkipBack aria-hidden='true' />
          Previous
          <DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlayerSkipForward aria-hidden='true' />
          Next
          <DropdownMenuShortcut>⌘]</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem>Shuffle</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>Repeat</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem disabled>
        Enhanced Audio
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value='artist'>Artist</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='album'>Album</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='title'>Title</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem variant='switch'>
        Auto save
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Add to Playlist</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Jazz</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Rock</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Hard Rock</DropdownMenuItem>
              <DropdownMenuItem>Soft Rock</DropdownMenuItem>
              <DropdownMenuItem>Classic Rock</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Metal</DropdownMenuItem>
              <DropdownMenuItem>Punk</DropdownMenuItem>
              <DropdownMenuItem>Grunge</DropdownMenuItem>
              <DropdownMenuItem>Alternative</DropdownMenuItem>
              <DropdownMenuItem>Indie</DropdownMenuItem>
              <DropdownMenuItem>Electronic</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>Pop</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant='destructive'>
        <IconTrash aria-hidden='true' />
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DropdownMenuExample;
