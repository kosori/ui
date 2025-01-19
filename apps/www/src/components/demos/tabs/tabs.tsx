import { Button } from '@kosori/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kosori/ui/card';
import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kosori/ui/tabs';

export const TabsDemo = () => {
  return (
    <Tabs className='w-[400px]' defaultValue='account'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent className='rounded-2xl' value='account'>
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Name</Label>
              <Input defaultValue='Pedro Duarte' id='name' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='username'>Username</Label>
              <Input defaultValue='@peduarte' id='username' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className='rounded-2xl' value='password'>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='current'>Current password</Label>
              <Input id='current' type='password' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='new'>New password</Label>
              <Input id='new' type='password' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
