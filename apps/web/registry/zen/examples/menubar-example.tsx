import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';

const MenubarExample = () => (
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New tab
          <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          New window
          <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>New incognito window</MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Share</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Email link</MenubarItem>
            <MenubarItem>Messages</MenubarItem>
            <MenubarItem>Notes</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>
          Print…
          <MenubarShortcut>⌘P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Undo
          <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Redo
          <MenubarShortcut>⇧⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Find</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Search the web</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Find…</MenubarItem>
            <MenubarItem>Find next</MenubarItem>
            <MenubarItem>Find previous</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>Cut</MenubarItem>
        <MenubarItem>Copy</MenubarItem>
        <MenubarItem>Paste</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarLabel>Appearance</MenubarLabel>
          <MenubarCheckboxItem defaultChecked>Show toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show sidebar</MenubarCheckboxItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarLabel>Zoom</MenubarLabel>
          <MenubarRadioGroup defaultValue='100'>
            <MenubarRadioItem value='50'>50%</MenubarRadioItem>
            <MenubarRadioItem value='100'>100%</MenubarRadioItem>
            <MenubarRadioItem value='150'>150%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
);

export default MenubarExample;
