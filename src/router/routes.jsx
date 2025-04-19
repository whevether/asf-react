import React,{Fragment,lazy} from 'react';
//布局
import RootLayout from './rootLayout';
import DefaultLayout from './defaultLayout';
import LoginLayout  from './loginLayout';
import { useRoutes } from 'react-router';
//页面
const DashPage = lazy(() => import(/* webpackPrefetch: true */ '../page/dash'));
const LoginPage = lazy(() => import(/* webpackPrefetch: true */ '../page/login'));
const Error404 = lazy(() => import(/* webpackPrefetch: true */ '../page/404'));
const Error403 = lazy(() => import(/* webpackPrefetch: true */ '../page/403'));
const AccountPage = lazy(() => import(/* webpackPrefetch: true */ '../page/account/index'));
const AccountDetailsPage = lazy(() => import(/* webpackPrefetch: true */ '../page/account/details'));
const LogsPage =  lazy(() => import(/* webpackPrefetch: true */ '../page/logsList'));
const EditorPage = lazy(() => import(/* webpackPrefetch: true */ '../page/demo/index'));
const PermissionPage = lazy(() => import(/* webpackPrefetch: true */ '../page/permission/index'));
const PermissionDetailsPage = lazy(() => import(/* webpackPrefetch: true */ '../page/permission/details'));
const MenuPage = lazy(() => import(/* webpackPrefetch: true */ '../page/menu/index'));
const AuthApiPage = lazy(() => import(/* webpackPrefetch: true */ '../page/authApi/index'));
const RolePage = lazy(() => import(/* webpackPrefetch: true */ '../page/role/index'));
const RoleDetailsPage = lazy(() => import(/* webpackPrefetch: true */ '../page/role/details'));
const TenancyPage = lazy(() => import(/* webpackPrefetch: true */ '../page/tenancy/index'));
const DepartmentPage = lazy(() => import(/* webpackPrefetch: true */ '../page/department/index'));
const DepartmentDetailsPage = lazy(() => import(/* webpackPrefetch: true */ '../page/department/details'));
const PostPage = lazy(() => import(/* webpackPrefetch: true */ '../page/post/index'));
const TranslatePage = lazy(() => import(/* webpackPrefetch: true */ '../page/translate/index'));
const DictionaryPage = lazy(() => import(/* webpackPrefetch: true */ '../page/dictionary/index'));
const CountryPage = lazy(() => import(/* webpackPrefetch: true */ '../page/country/index'));
const UserCenter = lazy(() => import(/* webpackPrefetch: true */ '../page/account/details'));
const routes = [{
  path: "/",
  element: <RootLayout />,
  children: [{
    element: <DefaultLayout />,
    children: [{
      index: true,
      element: <DashPage />
    },{
      path: 'control/account',
      element: <AccountPage />
    },{
      path: 'control/account/details',
      element: <AccountDetailsPage />
    },{
      path: 'control/permission',
      element: <PermissionPage />
    },{
      path: 'control/permission/details',
      element: <PermissionDetailsPage />
    },{
      path: 'control/menu',
      element: <MenuPage />
    },{
      path: 'control/authapi',
      element: <AuthApiPage />
    },{
      path: 'control/role',
      element: <RolePage />
    },{
      path: 'control/role/details',
      element: <RoleDetailsPage />
    },{
      path: 'control/tenancy',
      element: <TenancyPage />
    },{
      path: 'control/department',
      element: <DepartmentPage />
    },{
      path: 'control/department/details',
      element: <DepartmentDetailsPage />
    },{
      path: 'control/post',
      element: <PostPage />
    },{
      path: 'control/translate',
      element: <TranslatePage />
    },{
      path: 'control/dictionary',
      element: <DictionaryPage />
    },{
      path: 'control/audio/getlog',
      element: <LogsPage />
    },{
      path: 'control/country',
      element: <CountryPage />
    },{
      path: 'components',
      element: <EditorPage />
    },{
      path: 'user/center',
      element: <UserCenter />
    }]
  },{
    path: '/login',
    element: <LoginLayout />,
    children: [{
      index: true,
      element: <LoginPage />
    }]
  },{
    path: '403',
    element: <Error403 />
  },{
    path: '*',
    element: <Error404 />
  }],
}];
const Routes = () => {
  return (
    <Fragment>
      {useRoutes(routes)}
    </Fragment>
  );
};
export default Routes;
