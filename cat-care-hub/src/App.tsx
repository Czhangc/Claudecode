import { createHashRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { DisclaimerGate } from './components/DisclaimerGate';
import { HomePage } from './pages/HomePage';
import { EmergencyPage } from './pages/EmergencyPage';
import { CatFormPage } from './pages/CatFormPage';
import { CatPage } from './pages/CatPage';
import { WeightPage } from './pages/WeightPage';
import { BcsWizardPage } from './pages/BcsWizardPage';
import { FeedingPage } from './pages/FeedingPage';
import { KnowledgePage, KnowledgeDetailPage } from './pages/KnowledgePage';
import { MePage } from './pages/MePage';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function WithNav() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <BottomNav />
    </>
  );
}

function Bare() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

// Hash routing keeps deep links working on any static host without server rewrites.
const router = createHashRouter([
  {
    element: <WithNav />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/records', element: <WeightPage /> },
      { path: '/knowledge', element: <KnowledgePage /> },
      { path: '/knowledge/:id', element: <KnowledgeDetailPage /> },
      { path: '/me', element: <MePage /> },
      { path: '/cat', element: <CatPage /> },
      { path: '/feeding', element: <FeedingPage /> },
    ],
  },
  {
    element: <Bare />,
    children: [
      { path: '/emergency', element: <EmergencyPage /> },
      { path: '/cat/new', element: <CatFormPage /> },
      { path: '/cat/:id/edit', element: <CatFormPage /> },
      { path: '/bcs', element: <BcsWizardPage /> },
    ],
  },
]);

export function App() {
  return (
    <DisclaimerGate>
      <RouterProvider router={router} />
    </DisclaimerGate>
  );
}
