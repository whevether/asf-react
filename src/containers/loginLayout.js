import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {start} from './loginSvg';
// start();
// 登入页布局
const LoginLayout = (props) => {
  useEffect(()=> {
   setTimeout(() => {
    start();
   },1500);
  },[]);
  return (
    <div className="login-wrapper" >
      {props.routes &&
          <Route  key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component} />
        }
    </div>
  );
};
LoginLayout.propTypes = {
  routes: PropTypes.object.isRequired
};
export default withRouter(connect(state => ({
  state: state
}))(LoginLayout));