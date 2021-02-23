import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'components/navbar';
import * as fetchAction from 'store/actions/fetch';
import { bindActionCreators } from 'redux';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import ProtectedRoute from 'router/ProtectedRoute';
// 登入页布局

const DefaultLayout = (props) => {
  useEffect(() => {
    if (getCookie('token')) {
      setToken(getCookie('token'));
      props.fetchUserInfo();
    }
  }, []);
  return (
    <>
      {
        props?.state?.home?.data && <div className="DefaultLayout-wrapper" >
          <Navbar userinfo = {props?.state?.home?.data}/>
          { props?.routes &&
            <div className="page-content">
              <ProtectedRoute key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component} permission={props.routes.permission} />
            </div>
          }
        </div>
      }
    </>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  state: PropTypes.object
};
export default withRouter(connect(state => ({
  state: state
}), dispatch => bindActionCreators(fetchAction, dispatch))(DefaultLayout));