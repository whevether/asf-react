import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as commonAction from 'store/actions/common';
import { initI18n } from 'utils/i18n';
//总布局
const RootLayout = (props) => {
  useEffect(() => {
    if (props?.common?.countryList?.length === 0) {
      props?.getCountryList();
    }
    props?.getTranslatetList()
      .then(res => {
        initI18n(res);
      });
    //当没有租户列表就获取租户列表
    if (!props?.common?.tenancyList) {
      props?.fetchTenancyList();
    }
  }, []);
  return (

    props?.common?.tenancyList && <Outlet />

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