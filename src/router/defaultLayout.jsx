import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import PageHeader from 'components/pageHeader';
import * as commonAction from 'store/actions/common';
import { bindActionCreators } from 'redux';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import { Tabbar, Navbar, BreadcrumbItems } from 'components/index';
import { Tag } from 'antd';
import { BellOutlined, BookOutlined } from '@ant-design/icons';
// 默认布局
const DefaultLayout = (props) => {
  let localtion = useLocation();
  let navigate = useNavigate();
  // 根据窗口大小缩放导航菜单栏
  const resize = () => {
    if (window.innerWidth <= 768) {
      props?.toggleMenu(true);
    } else {
      props?.toggleMenu(false);
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
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  //权限拦截
  const grantedPermission = (menu) => {
    let isPermission = menu.some((item) => {
      if (localtion.pathname === item?.code) {
        return true;
      } else if (Array.isArray(item?.children) && item?.children.length > 0) {
        return grantedPermission(item?.children);
      } else {
        return false;
      }
    });
    return isPermission;
  };
  const onRenderNavTag = () => {
    let tabmenu = localStorage.getItem('tabmenu');
    if (tabmenu) {
      let arr = JSON.parse(tabmenu);
      if (Array.isArray(arr)) {
        return (
          <div className="tab-menu">{
            arr.map((item, index) => (item.menuHidden === 0 && <Tag key={index} closable color={item?.menuUrl == decodeURIComponent(localtion.pathname + localtion.search) ? '#1890ff' : 'default'} icon={item?.menuUrl == decodeURIComponent(localtion.pathname + localtion.search) ? <BellOutlined /> : <BookOutlined />} onClose={() => {
              let data = arr.filter(f => f?.menuUrl !== item?.menuUrl);
              localStorage.setItem('tabmenu', JSON.stringify(data));
              navigate(data.length > 0 ? data[data.length - 1]?.menuUrl : '/');
            }}>
              <span style={{ padding: '5px 15px', cursor: 'pointer', lineHeight: '30px', fontSize: '14px' }} onClick={() => navigate(item?.menuUrl)}>{item?.title}</span>
            </Tag>))
          }
          </div>
        );
      }
    }
  };
  const renderProtectedRoute = () => {
    if (!grantedPermission(props?.common?.data?.permissionMenu)) {
      return (
        <Navigate to="/403" replace />
      );
    } else {
      return (
        <div className="defaultLayout-wrapper" >
          <Navbar userinfo={props?.common?.data} collapsed={props?.common?.collapsed} path={localtion.pathname + localtion.search} />
          <div className="page-content">
            <Tabbar collapsed={props?.common?.collapsed} userinfo={props?.common?.data} toggleMenu={() => props?.toggleMenu(!props?.common?.collapsed)} languages={props?.common.countryList} />
            {
              onRenderNavTag()
            }
            <BreadcrumbItems mapBreadcrumbItems={props?.common?.data?.breadcrumbItems} />
            {/* 路由占位符  */}
            <Outlet />
          </div>

        </div>
      );
    }
  };
  return (
    <>
    {
      !props?.common?.logout && props?.common?.data && renderProtectedRoute()
    }
    {
      props?.common?.logout && <Navigate to="/login" replace/>
    }
    </>
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
