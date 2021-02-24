import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isGranted} from 'utils/storage';
import PropTypes from 'prop-types';
const ProtectedRoute = ({component: Component,permission,...rest}) => {
  return (
    <Route {...rest} render={
      props=>{
        /**
         * 没有权限跳转到 401页面
         */
        if(permission && !isGranted(permission)) {
          return (
            <Redirect 
              to={{
                pathname: '/401',
                state: {from: props.location}
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : null;
      }}
      />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.object,
  permission: PropTypes.string,
  location: PropTypes.object
};
export default ProtectedRoute;