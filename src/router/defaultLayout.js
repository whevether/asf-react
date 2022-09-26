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
import { Tag } from 'antd';
import { BellOutlined,BookOutlined } from '@ant-design/icons';
// 默认布局
const DefaultLayout = (props) => {
  let localtion = useLocation();
  let navigate = useNavigate();
  const resize = ()=>{
    if(window.innerWidth <= 768){
      console.log('sss')
    }
  };
  useEffect(() => {
    window.addEventListener('resize', resize);
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
    return ()=>{
      window.removeEventListener('resize', resize);
    };
  }, []);
  //权限拦截
  const grantedPermission = (menu) => {
    let isPermission = menu.some((item) => {
      if (Array.isArray(item?.children) && item?.children.length > 0) {
        // console.log(item?.children);
        return grantedPermission(item?.children);
      } else if (window.location.href.match(item?.code)[0].length === item?.code.length) {
        return true;
      } else {
        return false;
      }
    });
    return isPermission;
  };
  const renderProtectedRoute = () => {
    if (!grantedPermission(props?.common?.data?.permissionMenu)) {
      return (
        <Navigate to="/403" replace />
      );
    } else {
      return (
        <div className="defaultLayout-wrapper" >
          <Navbar userinfo={props?.common?.data} collapsed={props?.common?.collapsed} path={localtion.pathname + localtion.search} languages={props?.common.languageList} onAddTagMenu={(v) => {
            if (!props?.common?.tagMenu.some(s => s?.menuUrl === v?.menuUrl) || props?.common?.tagMenu.length === 0) {
              props?.common?.tagMenu?.push(v);
              props?.addTagMenu(props?.common?.tagMenu);
            } else {
              v.menuHidden = 0;
              props?.addTagMenu(props?.common?.tagMenu);
            }
          }} />
          <div className="page-content">
            <Tabbar collapsed={props?.common?.collapsed} userinfo={props?.common?.data} toggleMenu={props?.toggleMenu} languages={props?.common.languageList} />
            {
              props?.common?.tagMenu?.length > 0 && <div className="tab-menu">{
                props?.common?.tagMenu.map((item, index) => (item.menuHidden === 0 && <Tag key={index} closable color={item?.menuUrl == decodeURIComponent(localtion.pathname + localtion.search) ? '#2db7f5' : 'default'} icon={item?.menuUrl == decodeURIComponent(localtion.pathname + localtion.search) ? <BellOutlined /> : <BookOutlined />} onClose={() => {
                  item.menuHidden = 1;
                  navigate(props?.common?.tagMenu.filter(f => f.menuHidden != 1).length != 0 ? props?.common?.tagMenu[props?.common?.tagMenu.filter(f => f.menuHidden != 1).length - 1]?.menuUrl : '/');
                  props?.addTagMenu(props?.common?.tagMenu);
                }}   >
                  <span style={{ padding: '5px 15px', cursor: 'pointer', lineHeight: '30px', fontSize: '16px' }} onClick={() => navigate(item?.menuUrl)}>{item?.title}</span>
                </Tag>))
              }
              </div>
            }
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