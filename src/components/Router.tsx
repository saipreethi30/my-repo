import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import HostelsPage from '@/components/pages/HostelsPage';
import HostelDetailsPage from '@/components/pages/HostelDetailsPage';
import RoomsPage from '@/components/pages/RoomsPage';
import FoodMenuPage from '@/components/pages/FoodMenuPage';
import FeeRecordsPage from '@/components/pages/FeeRecordsPage';
import ParentDashboardPage from '@/components/pages/ParentDashboardPage';
import ProfilePage from '@/components/pages/ProfilePage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "hostels",
        element: <HostelsPage />,
        routeMetadata: {
          pageIdentifier: 'hostels',
        },
      },
      {
        path: "hostels/:id",
        element: <HostelDetailsPage />,
        routeMetadata: {
          pageIdentifier: 'hostel-details',
        },
      },
      {
        path: "rooms",
        element: <RoomsPage />,
        routeMetadata: {
          pageIdentifier: 'rooms',
        },
      },
      {
        path: "food-menu",
        element: <FoodMenuPage />,
        routeMetadata: {
          pageIdentifier: 'food-menu',
        },
      },
      {
        path: "fee-records",
        element: <FeeRecordsPage />,
        routeMetadata: {
          pageIdentifier: 'fee-records',
        },
      },
      {
        path: "parent-dashboard",
        element: <ParentDashboardPage />,
        routeMetadata: {
          pageIdentifier: 'parent-dashboard',
        },
      },
      {
        path: "profile",
        element: <ProfilePage />,
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
