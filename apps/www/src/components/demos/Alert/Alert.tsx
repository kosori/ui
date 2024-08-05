import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@kosori/ui/alert';

export const AlertDemo = () => {
  return (
    <Alert>
      <AlertTitle>
        <AlertCircle /> Heads up!
      </AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};
