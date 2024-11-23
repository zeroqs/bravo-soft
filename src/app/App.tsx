import { WrapperComposer } from '@/shared/lib/ProviderList';

import { AppRouter, ErrorBoundary, MantineWrapper, RouterWrapper } from './providers';

export const App = () => {
  return (
    <WrapperComposer
      wrappers={[RouterWrapper, MantineWrapper, ErrorBoundary]}
      render={() => <AppRouter />}
    />
  );
};
