import { AlertTriangle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@kosori/ui/alert';

export const AlertWarningDemo = () => {
  return (
    <Alert intent='warning'>
      <AlertTitle>
        <AlertTriangle /> Exceeded storage limit
      </AlertTitle>
      <AlertDescription>
        You have exceeded your storage limit. Delete files to free up space.
      </AlertDescription>
    </Alert>
  );
};
