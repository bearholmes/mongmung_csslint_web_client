/**
 * 라우터 설정
 */

import { HomePage, NotFoundPage } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

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
