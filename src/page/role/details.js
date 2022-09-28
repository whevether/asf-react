import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as roleAction from 'store/actions/role';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  useEffect(()=>{
    props?.roleFunc?.detailsRole({id: searchParams.get('id')})
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
  roleFunc: PropTypes.object,
  userInfo: PropTypes.object,
  role: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  role: state?.role,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    roleFunc: bindActionCreators(roleAction, dispatch)
  };
})(Details);