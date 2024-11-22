import { BrowserRouter } from 'react-router-dom';

import type { ProviderProps } from '@/shared/types';

export const RouterWrapper = ({ children }: ProviderProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
