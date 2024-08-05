import { CheckCircle2 } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@kosori/ui/alert';

export const AlertSuccessDemo = () => {
  return (
    <Alert intent='success'>
      <AlertTitle>
        <CheckCircle2 /> Account registration complete
      </AlertTitle>
      <AlertDescription>
        Congrulations! Your account has been successfully registered. Welcome
        aboard!
      </AlertDescription>
    </Alert>
  );
};
