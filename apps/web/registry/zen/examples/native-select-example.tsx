import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/components/ui/native-select';

const NativeSelectExample = () => (
  <NativeSelect
    aria-label='Select framework'
    className='w-48'
    defaultValue='next'
  >
    <NativeSelectOptGroup label='Frameworks'>
      <NativeSelectOption value='next'>Next.js</NativeSelectOption>
      <NativeSelectOption value='vite'>Vite</NativeSelectOption>
      <NativeSelectOption value='astro'>Astro</NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
);

export default NativeSelectExample;
