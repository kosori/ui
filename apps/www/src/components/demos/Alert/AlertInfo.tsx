import { Megaphone } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@kosori/ui/alert';

export const AlertInfoDemo = () => {
  return (
    <Alert intent='info'>
      <AlertTitle>
        <Megaphone /> Account verification needed
      </AlertTitle>
      <AlertDescription>
        Verify your account to unlock full access and benefits.
      </AlertDescription>
    </Alert>
  );
};
