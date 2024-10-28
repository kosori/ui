import { Button } from '@kosori/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kosori/ui/card';
import { SidebarInput } from '@kosori/ui/sidebar';

export const SidebarOptInForm = () => {
  return (
    <Card className='shadow-none'>
      <form>
        <CardHeader className='p-4 pb-0'>
          <CardTitle className='text-sm'>Subscribe to our newsletter</CardTitle>
          <CardDescription>
            Opt-in to receive updates and news about the sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-2.5 p-4'>
          <SidebarInput placeholder='Email' type='email' />
          <Button className='w-full shadow-none' size='small'>
            Subscribe
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};
