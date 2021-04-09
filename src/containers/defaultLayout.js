import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from 'components/pageHeader';
import * as commonAction from 'store/actions/common';
import { bindActionCreators } from 'redux';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import ProtectedRoute from 'router/ProtectedRoute';
import {Tabbar,Navbar} from 'components/index';
import { Spin } from 'antd';
// 登入页布局

const DefaultLayout = (props) => {
  const style = {position:'fixed',display: 'flex',width: '100%',height:'100%',alignItems:'center',justifyContent:'center',zIndex: 1 ,backgroundColor:'rgba(0,0,0,.3)'};
  useEffect(() => {
    if (getCookie('token')) {
      document.getElementsByTagName('body')[0].className = 'login-svg-none';
      setToken(getCookie('token'));
      // 当数据存在于 store中就不请求加载
      if(!props?.common?.data){
        props?.fetchUserInfo();
      }
    }else{
      props.history.push('/login');
    }
  }, []);
  
  return (
    <>
      {
         props?.common?.loading && <Spin tip="请求中。。。。。"  spinning={props?.common?.loading} style={style}/>
      }
      {
        props?.common?.data && <div className="DefaultLayout-wrapper" >
          <Navbar userinfo = {props?.common?.data} collapsed={props?.common?.collapsed} path={props?.history?.location?.pathname}/>
            <div className="page-content">
              <Tabbar collapsed={props?.common?.collapsed} userinfo = {props?.common?.data} toggleMenu = {props?.toggleMenu} history={props?.history}/>
              {
                 props?.routes && <> 
                  {props?.routes.name && <PageHeader name={props?.routes.name}/>}
                    <ProtectedRoute key={props?.routes?.path} exact={props?.routes?.exact} path={props?.routes?.path} component={props?.routes?.component} permission={props?.routes?.permission} permissionMenu = {props?.common?.data?.permissionMenu} roleName={props?.common?.data?.roleName}/>
                  </>
              }
            </div>
          
        </div>
      }
    </>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  common: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pageHeader: PropTypes.object
};
export default withRouter(connect(state => ({
  common: state?.common
}), dispatch => bindActionCreators(commonAction, dispatch))(DefaultLayout));