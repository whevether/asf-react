import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'components/navbar';
import PageHeader from 'components/pageHeader';
import * as fetchAction from 'store/actions/fetch';
import { bindActionCreators } from 'redux';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import ProtectedRoute from 'router/ProtectedRoute';
import Tabbar from 'components/tabbar';
import { Spin } from 'antd';
// 登入页布局

const DefaultLayout = (props) => {
  useEffect(() => {
    if (getCookie('token')) {
      document.getElementsByTagName('body')[0].className = 'login-svg-none';
      setToken(getCookie('token'));
      // 当数据存在于 store中就不请求加载
      if(!props?.home?.data){
        props?.fetchUserInfo();
      }
    }else{
      props.history.push('/login');
    }
  }, []);
  return (
    <>
      {
        props?.home?.data && <div className="DefaultLayout-wrapper" >
          <Navbar userinfo = {props?.home?.data} collapsed={props?.home?.collapsed}/>
          { props?.routes &&
            <div className="page-content">
              <Tabbar collapsed={props?.home?.collapsed} userinfo = {props?.home?.data} toggleMenu = {props?.toggleMenu} history={props?.history}/>
              {
                props?.home?.loading && <Spin tip="请求中。。。。。"  style={{position:'fixed',display:'flex',width: '100%',height:'100%',alignItems:'center',justifyContent:'center',zIndex: 1,backgroundColor:'rgba(0,0,0,.3)'}} delay={500}/>
              }
              {props?.routes.pageHeader && <PageHeader data={props?.routes.pageHeader}/>}
              <ProtectedRoute key={props?.routes?.path} exact={props?.routes?.exact} path={props?.routes?.path} component={props?.routes?.component} permission={props?.routes?.permission} userinfo = {props?.home?.data}/>
            </div>
          }
        </div>
      }
    </>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  home: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pageHeader: PropTypes.object
};
export default withRouter(connect(state => ({
  home: state?.home
}), dispatch => bindActionCreators(fetchAction, dispatch))(DefaultLayout));