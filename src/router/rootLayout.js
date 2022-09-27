import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Outlet} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as commonAction from 'store/actions/common';
import { Spin } from 'antd';
import { getCookie,setCookie } from 'utils/storage';
//总布局
const RootLayout = (props) => {
  useEffect(()=>{
    if(props?.common?.languageList.length === 0){
      props?.getTranslatetList();
    }
    //当没有租户列表就获取租户列表
    if(!props?.common?.tenancyList){
      props?.fetchTenancyList();
      if(!getCookie('languages')){
        setCookie('languages','中文');
      }
    }
  
  },[]);
  const style = {position:'fixed',display: 'flex',width: '100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,.8)',zIndex: 9999};
  return (
    <div className="main" >
      {
         props?.common?.loading && <Spin tip="请求中。。。。。"  spinning={props?.common?.loading} delay={500} style={style}/>
      }
      {
        props?.common?.tenancyList &&  <Outlet />
      }
    </div>
  );
};
RootLayout.propTypes = {
  fetchTenancyList: PropTypes.func,
  common: PropTypes.object,
  getTranslatetList: PropTypes.func
};
export default connect(state => ({
  common: state?.common
}),dispatch => bindActionCreators(commonAction,dispatch))(RootLayout);