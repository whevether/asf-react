import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  useEffect(()=>{
    props?.permissionFunc?.detailsPermission({id: searchParams.get('id')})
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
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  permission: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  permission: state?.permission,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Details);