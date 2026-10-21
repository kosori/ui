import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Table } from '@/components/ui/table';

/** Compile a Consumer's render, layer and state-colour surface after install. */
export const RenderFixture = () => (
  <main>
    <Card>
      <CardHeader
        render={<a href='https://kosori.codingcodax.dev'>kosori fixture</a>}
      />
    </Card>
    <DialogFooter render={<footer />} />
    <Button variant='destructive-outline'>Delete</Button>
    <Table
      className='render-fixture-table'
      data-fixture='table'
      render={<section />}
    />
  </main>
);
