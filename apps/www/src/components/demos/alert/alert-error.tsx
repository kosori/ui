import { XCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@kosori/ui/alert';

export const AlertErrorDemo = () => {
  return (
    <Alert className='max-w-md' intent='error'>
      <AlertTitle>
        <XCircle /> Connection failed
      </AlertTitle>
      <AlertDescription>
        Unable to establish connection with the server. Please try again later.
      </AlertDescription>
    </Alert>
  );
};
