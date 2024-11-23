import { WrapperComposer } from '@/shared/lib/ProviderList';

import { AppRouter, AuthWrapper, ErrorBoundary, MantineWrapper, RouterWrapper } from './providers';

export const App = () => {
  return (
    <WrapperComposer
      wrappers={[RouterWrapper, AuthWrapper, MantineWrapper, ErrorBoundary]}
      render={() => <AppRouter />}
    />
  );
};
