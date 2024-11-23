import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home/Home'));
export const ErrorPage = lazy(() => import('./Error'));
export const AuthPage = lazy(() => import('./Auth/Auth'));
export const SummaryTablePage = lazy(() => import('./SummaryTable/SummaryTable'));
export const ApplicationFormPage = lazy(() => import('./ApplicationForm/ApplicationForm'));
