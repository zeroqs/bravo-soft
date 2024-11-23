import { Navigate } from 'react-router-dom';

import { useAuth } from '@/app/providers/auth/hooks';
import { RoutePath } from '@/app/providers/router/config';
import type { ProviderProps } from '@/shared/types';

import '@mantine/core/styles.css';

export const UnauthorizedRoute = ({ children }: ProviderProps) => {
  const { user } = useAuth();

  if (user) return <Navigate to={`${RoutePath.home}`} />;

  return <>{children}</>;
};
