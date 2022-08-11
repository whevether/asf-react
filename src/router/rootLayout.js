import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Outlet} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as commonAction from 'store/actions/common';
import { Spin } from 'antd';
//总布局
const RootLayout = (props) => {
  useEffect(()=>{
    //当没有租户列表就获取租户列表
    if(!props?.state?.common?.tenancyList){
      props?.fetchTenancyList();
    }
  },[]);
  const style = {position:'fixed',display: 'flex',width: '100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,.5)',zIndex: 9999};
  return (
    <div className="main" >
      {
         props?.state?.common?.loading && <Spin tip="请求中。。。。。"  spinning={props?.state?.common?.loading} delay={500} style={style}/>
      }
      {
        props?.state?.common?.tenancyList &&  <Outlet />
      }
    </div>
  );
};
RootLayout.propTypes = {
  fetchTenancyList: PropTypes.func,
  state: PropTypes.object
};
export default connect(state => ({
  state: state
}),dispatch => bindActionCreators(commonAction,dispatch))(RootLayout);