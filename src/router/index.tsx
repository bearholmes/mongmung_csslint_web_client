/**
 * 라우터 설정
 */

import { createBrowserRouter } from 'react-router-dom';
import { HomePage, NotFoundPage } from '@/pages';

/**
 * 라우터 인스턴스
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
