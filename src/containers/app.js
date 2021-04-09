import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteWithSubRoutes, routes } from 'router/routes';
import { bindActionCreators } from 'redux';
import * as commonAction from 'store/actions/common';
/*把switch 包裹在这里面使用withRouter 保证同步路由数据*/
const ConnectedSwitch = withRouter(connect(state => ({
  state: state
}))(Switch));
const App = (props) => {
  useEffect(()=>{
    //当没有租户列表就获取租户列表
    if(!props?.state?.login?.tenancyList){
      props?.fetchTenancyList();
    }
  },[]);
  return (
    <div className="main" >
      <ConnectedSwitch>
        {routes && routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </ConnectedSwitch>
    </div>
  );
};
App.propTypes = {
  route: PropTypes.object,
  routes: PropTypes.arrayOf(Object),
  state: PropTypes.object,
  fetchTenancyList: PropTypes.func
};
export default withRouter(connect(state => ({
  state: state,
}),dispatch => bindActionCreators(commonAction,dispatch))(App));