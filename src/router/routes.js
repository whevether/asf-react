import React from 'react';
import {Route} from 'react-router-dom';
import LoadableComponent from './LoadableComponent';
/* eslint-disable react/self-closing-comp */
export const routes = [
  {
    path: '/',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    exact: true,
    permission: 'dash.getdetails',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/dash'))
  },
  {
    path: '/control/account',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    permission: 'account.getlist',
    name: '账户管理',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/accountList'))
  },
  {
    path: '/control/permission',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    permission: 'permission.getlist',
    name: '权限管理',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/permissionList'))
  },
  {
    path: '/editor',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    permission: 'editor.getlists',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/tinyeditor'))
  },
  {
    path: '/center/account',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    permission: 'center.getaccountlist',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/center/accountList'))
  },
  {
    path: '/center/shop',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    permission: 'center.getshoplist',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/center/shopList'))
  },
  {
    path: '/center/program',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    permission: 'center.getshoplist',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/center/programList'))
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/loginLayout')),
    path: '/login',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/login'))
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
    path: '/403',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/403'))
  }, 
  {
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../page/nodeFound')),
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
    path: '*'
  }
];
/* eslint-disable react/self-closing-comp */
export const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={props => (
    <route.layout {...props} routes={route} />
  )}>
  </Route>
);