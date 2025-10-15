import { Action } from '@/constants';
import * as Auth from '@/pages/auth';
import * as Dashboard from '@/pages/dashboard';
import * as Landing from '@/pages/landing';
import * as Model from '@/models';
import { DashboardOutlined, TableOutlined } from '@ant-design/icons';

export const landingLink = [
  {
    label: 'Beranda',
    key: '/',
    element: Landing.Home
  }
];

/**
 * @type {{
 *  label: string;
 *  permissions: [Action, import('@/models/Model').ModelChildren][];
 *  roles: Role[];
 *  children: {
 *   path: string;
 *   label: string;
 *   icon: import('react').ReactNode;
 *   element: import('react').ReactNode;
 *   roles?: Role[];
 *   permissions?: [Action, import('@/models/Model').ModelChildren][];
 *  }[];
 * }[]}
 */
export const dashboardLink = [
  {
    label: 'Overview',
    icon: DashboardOutlined,
    children: [{ path: '/dashboard', label: 'Dashboard', element: Dashboard.Dashboard }]
  },
  {
    label: 'Master Data',
    icon: TableOutlined,
    children: [{ path: '/users', label: 'Pengguna', element: Dashboard.Users, permission: [Action.READ, Model.User] }]
  }
].map((item) => ({
  ...item,
  permissions: item.children.flatMap((child) => child.permissions).filter((permission) => permission),
  roles: item.children.flatMap((child) => child.roles).filter((role) => role)
}));

export const authLink = [
  {
    path: '/auth/login',
    element: Auth.Login
  }
];
