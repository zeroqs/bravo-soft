import type { RouteProps } from 'react-router-dom';

import { AuthorizedRoute } from '@/app/providers/auth/protectedRoutes/AuthorizedRoute';
import { UnauthorizedRoute } from '@/app/providers/auth/protectedRoutes/UnauthorizedRoute';
import { ApplicationFormPage, AuthPage, ErrorPage, HomePage, SummaryTablePage } from '@/pages';

enum AppRoutes {
  HOME = 'home',
  AUTH = 'auth',
  APPLICATION_FORM = 'applicationForm',
  SUMMARY_TABLE = 'summaryTable',
  NOTFOUND = 'notFound'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.APPLICATION_FORM]: '/application-form',
  [AppRoutes.SUMMARY_TABLE]: '/summary-table',
  [AppRoutes.NOTFOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <AuthorizedRoute><HomePage /></AuthorizedRoute>
  },
  [AppRoutes.APPLICATION_FORM]: {
    path: RoutePath.applicationForm,
    element: <AuthorizedRoute><ApplicationFormPage /></AuthorizedRoute>
  },
  [AppRoutes.SUMMARY_TABLE]: {
    path: RoutePath.summaryTable,
    element: <AuthorizedRoute><SummaryTablePage /></AuthorizedRoute>
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
