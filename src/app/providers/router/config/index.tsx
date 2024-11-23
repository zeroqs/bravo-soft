import type { RouteProps } from 'react-router-dom';

import { AuthorizedRoute } from '@/app/providers/auth/protectedRoutes/AuthorizedRoute';
import { UnauthorizedRoute } from '@/app/providers/auth/protectedRoutes/UnauthorizedRoute';
import { AuthPage, ErrorPage, HomePage } from '@/pages';

enum AppRoutes {
  HOME = 'home',
  AUTH = 'auth',
  NOTFOUND = 'notFound'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.NOTFOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <AuthorizedRoute><HomePage /></AuthorizedRoute>
  },
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <UnauthorizedRoute><AuthPage /></UnauthorizedRoute>
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath.notFound,
    element: <ErrorPage />
  }
};
