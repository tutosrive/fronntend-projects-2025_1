import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Demo= lazy(() => import('../pages/Demo'));

const ListUsers= lazy(() => import('../pages/Users/List'));
const ListRols = lazy(()=> import('../pages/Rols/List'))
const ListPermmissions = lazy(()=> import("../pages/Permissions/List"))

const CreaPermission = lazy(()=> import("../pages/Permissions/create"))
const UpdatePermission = lazy(()=> import("../pages/Permissions/update"))

const CreateRole = lazy(()=> import("../pages/Rols/create"))
const UpdateRole = lazy(()=> import("../pages/Rols/update"))

const SumPage = lazy(()=> import("../pages/Tests/Sum"));
const RestaPage = lazy(()=> import("../pages/Tests/Resta"));
const CreateUser = lazy(()=> import("../pages/Users/create"))
const UpdateUser = lazy(()=> import("../pages/Users/update"))

const coreRoutes = [
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: "/users/list",
    title:"UsersList",
    component: ListUsers
  },
  {
    path: 'roles/list',
    title: 'RolesList',
    component: ListRols
  },
  {
    path: 'permissions/list',
    title: 'PermissionsList',
    component: ListPermmissions
  },
  {
    path: 'operations/suma/',
    title: 'SumaOperation',
    component: SumPage
  },
  {
    path: 'operations/resta/',
    title: 'RestaOperation',
    component: RestaPage
  },
  {
    path: 'users/create',
    title: 'CreateUser',
    component: CreateUser
  },
  {
    path: 'users/update/:id',
    title: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: 'permissions/create',
    title: 'CreatePermission',
    component: CreaPermission
  },
  {
    path: 'permissions/update/:id',
    title: 'UpdatePermission',
    component: UpdatePermission
  },
  {
    path: 'roles/create',
    title: 'CreateRole',
    component: CreateRole
  },
  {
    path: 'roles/update/:id',
    title: 'UpdateRoles',
    component: UpdateRole
  }
];

const routes = [...coreRoutes];
export default routes;
