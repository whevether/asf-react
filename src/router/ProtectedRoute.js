import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
const ProtectedRoute = ({ component: Component, permission, permissionMenu,roleName, ...rest }) => {
  let arr = [];
  const grantedPermission = (menu, path) => {
    // console.log(permissionMenu);
    let isPermission = menu.some((item) => {
      if (Array.isArray(item?.actions) && item?.actions.length > 0 && item?.actions.includes(path)) {
        arr.push(...item?.actions);
        return true;
      } else if (Array.isArray(item?.children) && item?.children.length > 0) {
        // console.log(item?.children);
        return grantedPermission(item?.children, path);
      } else {
        return false;
      }
    });
    return isPermission;
  };
  return (
    <Route {...rest} render={
      props => {
        /**
         * 没有权限跳转到 403页面,控制页面路由路由权限
         */
        if (permission && !grantedPermission(permissionMenu, permission)) {
          return (
            <Redirect
              to={{
                pathname: '/403',
                state: { from: props.location }
              }}
            />
          );
        }
        props = {...props,action:arr,roleName:roleName};
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.object,
  permission: PropTypes.string,
  location: PropTypes.object,
  permissionMenu: PropTypes.arrayOf(Object),
  roleName: PropTypes.string
};
export default ProtectedRoute;