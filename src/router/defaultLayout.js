import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import PageHeader from 'components/pageHeader';
import * as commonAction from 'store/actions/common';
import { bindActionCreators } from 'redux';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import { Tabbar, Navbar } from 'components/index';
// 默认布局
const DefaultLayout = (props) => {
  let localtion = useLocation();
  let navigate = useNavigate(); 
  useEffect(() => {
    if (getCookie('token')) {
      document.getElementsByTagName('body')[0].className = 'login-svg-none';
      setToken(getCookie('token'));
      // 当数据存在于 store中就不请求加载
      if (!props?.common?.data) {
        props?.fetchUserInfo();
      }
    } else {
      navigate('/login');
    }
  }, []);
  //权限拦截
  const grantedPermission = (menu, path) => {
    let isPermission = menu.some((item) => {
      if (Array.isArray(item?.children) && item?.children.length > 0) {
        // console.log(item?.children);
        return grantedPermission(item?.children, path);
      }else if (item.code === path) {
        return true;
      }  else {
        return false;
      }
    });
    return isPermission;
  };
  const renderProtectedRoute = () => {
    if (!grantedPermission(props?.common?.data?.permissionMenu, localtion.pathname)) {
      return (
        <Navigate to="/403" replace />
      );
    } else {
      return (
        <div className="DefaultLayout-wrapper" >
          <Navbar userinfo={props?.common?.data} collapsed={props?.common?.collapsed} path={localtion.pathname + localtion.search} />
          <div className="page-content">
            <Tabbar collapsed={props?.common?.collapsed} userinfo={props?.common?.data} toggleMenu={props?.toggleMenu} />
            {/* <PageHeader name={props?.routes.name}/> */}
            {/* 路由占位符  */}
            <Outlet />
          </div>

        </div>
      );
    }
  };
  return (
    props?.common?.data && renderProtectedRoute()
  );
};
DefaultLayout.propTypes = {
  fetchUserInfo: PropTypes.func.isRequired,
  common: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
  pageHeader: PropTypes.object
};
export default connect(state => ({
  common: state?.common
}), dispatch => bindActionCreators(commonAction, dispatch))(DefaultLayout);