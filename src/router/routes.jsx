import React,{Fragment} from 'react';
import LoadableComponent from './LoadableComponent';
//布局
import RootLayout from './rootLayout';
import DefaultLayout from './defaultLayout';
import LoginLayout  from './loginLayout';
import { useRoutes } from 'react-router';
//页面
const DashPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/dash'));
const LoginPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/login'));
const Error404 = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/404'));
const Error403 = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/403'));
const AccountPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/account/index'));
const AccountDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/account/details'));
const LogsPage =  LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/logsList'));
const EditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/demo/index'));
const PermissionPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permission/index'));
const PermissionDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permission/details'));
const MenuPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/menu/index'));
const AuthApiPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/authApi/index'));
const RolePage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/role/index'));
const RoleDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/role/details'));
const TenancyPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/tenancy/index'));
const DepartmentPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/department/index'));
const DepartmentDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/department/details'));
const PostPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/post/index'));
const TranslatePage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/translate/index'));
const DictionaryPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/dictionary/index'));
const CountryPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/country/index'));
const UserCenter = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/account/details'));
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
