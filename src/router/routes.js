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
const  NotFound= LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/nodeFound'));
const Error403 = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/403'));
const AccountPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/account/index'));
const AccountDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/account/details'));
const LogsPage =  LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/logsList'));
const EditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/editorList'));
const ModifyEditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/modify'));
const CreateEditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/add'));
const PermissionPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permission/index'));
const PermissionDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permission/details'));
const MenuPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/menu/index'));
const MenuDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/menu/details'));
const AuthApiPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/authApi/index'));
const AuthApiDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/authApi/details'));
const RolePage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/role/index'));
const RoleDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/role/details'));
const TenancyPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/tenancy/index'));
const TenancyDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/tenancy/details'));
const DepartmentPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/department/index'));
const DepartmentDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/department/details'));
const PostPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/post/index'));
const PostDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/post/details'));
const TranslatePage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/translate/index'));
const TranslateDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/translate/details'));
const DictionaryPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/dictionary/index'));
const DictionaryDetailsPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/dictionary/details'));
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
      path: 'control/menu/details',
      element: <MenuDetailsPage />
    },{
      path: 'control/authapi',
      element: <AuthApiPage />
    },{
      path: 'control/authapi/details',
      element: <AuthApiDetailsPage />
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
      path: 'control/tenancy/details',
      element: <TenancyDetailsPage />
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
      path: 'control/post/details',
      element: <PostDetailsPage />
    },{
      path: 'control/translate',
      element: <TranslatePage />
    },{
      path: 'control/translate/details',
      element: <TranslateDetailsPage />
    },{
      path: 'control/dictionary',
      element: <DictionaryPage />
    },{
      path: 'control/dictionary/details',
      element: <DictionaryDetailsPage />
    },{
      path: 'editor/getlist',
      element: <EditorPage />
    },{
      path: 'editor/modify',
      element: <ModifyEditorPage />
    },{
      path: 'editor/create',
      element: <CreateEditorPage />
    },{
      path: 'control/audio/getlog',
      element: <LogsPage />
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
    element: <NotFound />
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
// export const routes = [
//   {
//     path: '/',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     exact: true,
//     permission: 'dash.getdetails',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/dash'))
//   },
//   {
//     path: '/control/account',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     permission: 'account.getlist',
//     name: '账户管理',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/accountList'))
//   },
//   {
//     path: '/control/permission',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     permission: 'permission.getlist',
//     name: '权限管理',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permissionList'))
//   },
//   {
//     path: '/control/audio/getlog',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     permission: 'audio.getloglist',
//     name: '日志管理',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/logsList'))
//   },
//   {
//     path: '/editor/getlist',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     permission: 'editor.getlist',
//     name: '网站页面管理',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/editorList'))
//   },
//   {
//     path: '/editor/modify',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     permission: 'editor.modify',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/modify'))
//   },
//   {
//     path: '/editor/create',
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
//     permission: 'editor.create',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/add'))
//   },
//   {
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/loginLayout')),
//     path: '/login',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/login'))
//   },
//   {
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
//     path: '/403',
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/403'))
//   }, 
//   {
//     component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/nodeFound')),
//     layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
//     path: '*'
//   }
// ];
