import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as commonAction from 'store/actions/common';
import { Spin } from 'antd';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import { useI18n } from 'utils/i18n';
//总布局
const RootLayout = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (props?.common?.countryList?.length === 0) {
      props?.getCountryList();
    }
    props?.getTranslatetList()
      .then(res => {
        useI18n(res);
      });
    //当没有租户列表就获取租户列表
    if (!props?.common?.tenancyList) {
      props?.fetchTenancyList();
    }
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
  const style = { position: 'fixed', display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.8)', zIndex: 9999, maxHeight: '100%' };
  return (
    <div className="main" >
      <Spin tip="请求中。。。。。" spinning={props?.common?.loading} delay={500} style={style}>
        {
          props?.common?.tenancyList && <Outlet />
        }
      </Spin>
    </div>
  );
};
RootLayout.propTypes = {
  fetchTenancyList: PropTypes.func,
  common: PropTypes.object,
  getTranslatetList: PropTypes.func,
  getCountryList: PropTypes.func
};
export default connect(state => ({
  common: state?.common
}), dispatch => bindActionCreators(commonAction, dispatch))(RootLayout);
