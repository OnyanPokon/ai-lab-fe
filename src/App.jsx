import { Result } from 'antd';
import { authLink, dashboardLink, landingLink } from './data/link';
import { useAuth } from './hooks';
import { AuthLayout, DashboardLayout, LandingLayout } from './layouts';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import './index.css';
import { flattenLandingLinks } from './utils/landingLink';
import { Notfound } from './pages/result';
import { Register } from './pages/landing';
import { Settings } from './pages/dashboard';

function App() {
  const { user } = useAuth();
  const flatLandingLinks = flattenLandingLinks(landingLink);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <LandingLayout />,
          children: [
            ...flatLandingLinks.map(({ path, element: Element }) => ({
              path,
              element: <Element />
            })),
            { path: '/register', element: <Register /> },
            { path: '*', element: <Notfound /> }
          ]
        },
        {
          element: <DashboardLayout />,
          children: [
            ...dashboardLink.flatMap(({ path, element: Element, permissions, roles, children }) => {
              if (children && children.length > 0) {
                return children.map(({ permissions, roles, path, element: Element }) => {
                  const hasPermissions = permissions && permissions.length > 0;
                  const hasRoles = roles && roles.length > 0;
                  const userCantDoAnyOfThat = hasPermissions && (!user || user.cantDoAny(...permissions));
                  const userIsNotInAnyOfThatRole = hasRoles && (!user || !roles.some((role) => user.is(role)));

                  if (userCantDoAnyOfThat || userIsNotInAnyOfThatRole) {
                    return {
                      path,
                      element: <Result status="403" subTitle="Anda tidak memiliki akses ke halaman ini" title="Forbidden" />
                    };
                  }

                  return { path, element: <Element /> };
                });
              }

              if (path && Element) {
                const hasPermissions = permissions && permissions.length > 0;
                const hasRoles = roles && roles.length > 0;
                const userCantDoAnyOfThat = hasPermissions && (!user || user.cantDoAny(...permissions));
                const userIsNotInAnyOfThatRole = hasRoles && (!user || !roles.some((role) => user.is(role)));

                if (userCantDoAnyOfThat || userIsNotInAnyOfThatRole) {
                  return [
                    {
                      path,
                      element: <Result status="403" subTitle="Anda tidak memiliki akses ke halaman ini" title="Forbidden" />
                    }
                  ];
                }

                return [{ path, element: <Element /> }];
              }

              return [];
            }),

            { path: '/dashboard/pengaturan', element: <Settings /> }
          ]
        },
        {
          element: <AuthLayout />,
          children: authLink.map(({ path, element: Element }) => ({
            path,
            element: <Element />
          }))
        }
      ])}
    />
  );
}

export default App;
