import { Card, CardHeader } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Table } from '@/components/ui/table';

export const RenderFixture = () => (
  <main>
    <Card>
      <CardHeader
        render={<a href='https://kosori.codingcodax.dev'>kosori fixture</a>}
      />
    </Card>
    <DialogFooter render={<footer />} />
    <Table render={<section />} />
  </main>
);
