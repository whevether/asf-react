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
const LogsPage =  LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/logsList'));
const EditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/editorList'));
const ModifyEditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/modify'));
const CreateEditorPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/editor/add'));
const PermissionPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permission/index'));
const MenuPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/menu/index'));
const AuthApiPage = LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/authApi/index'));
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
      path: 'control/permission',
      element: <PermissionPage />
    },{
      path: 'control/menu',
      element: <MenuPage />
    },{
      path: 'control/authapi',
      element: <AuthApiPage />
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
