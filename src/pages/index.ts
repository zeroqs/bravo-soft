import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home'));
export const ErrorPage = lazy(() => import('./Error'));
export const AuthPage = lazy(() => import('./Auth/Auth'));
