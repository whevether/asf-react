import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as departmentAction from 'store/actions/department';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  useEffect(()=>{
    props?.departmentFunc?.detailsDepartment({id: searchParams.get('id')})
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
  departmentFunc: PropTypes.object,
  userInfo: PropTypes.object,
  department: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  authApi: state?.authApi,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    departmentFunc: bindActionCreators(departmentAction, dispatch)
  };
})(Details);