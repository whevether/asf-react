import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as apiAuthAction from 'store/actions/authApi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  useEffect(()=>{
    props?.apiAuthFunc?.detailsApi({id: searchParams.get('id')})
      .then(res=>{
        console.log(res);
      });
  },[]);
  return (
    <div className="details">
      详情
    </div>
  );
};
Details.propTypes = {
  apiAuthFunc: PropTypes.object,
  userInfo: PropTypes.object,
  authApi: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  authApi: state?.authApi,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    apiAuthFunc: bindActionCreators(apiAuthAction, dispatch)
  };
})(Details);