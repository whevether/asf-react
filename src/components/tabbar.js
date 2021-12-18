import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Menu} from 'antd';
import { removeCookie } from 'utils/storage';
import { useNavigate } from 'react-router';
import {MenuUnfoldOutlined,MenuFoldOutlined, LogoutOutlined} from '@ant-design/icons';
const Tabbar = (props) => {
  let navigate = useNavigate();
  //跳转路由
  const handleGoNav = (e, params = {}) => {
    navigate(e, params);
  };
  const onLogout = () => {
    removeCookie(['token','refreshToken']);
    handleGoNav('/login');
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={onLogout}>
          <LogoutOutlined /> 登出
        </span>
      </Menu.Item>
    </Menu>
  );
  return(
    <div className="tabbar">
      <div onClick={props?.toggleMenu} className="collapsed">
        {React.createElement(props?.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </div>
      <div className="tabbar-menu">
        <Dropdown overlay={menu}>
          <span className="tabbar-dropdown">
            <img src="../../assets/avatar.jpeg"/>
            {props?.userinfo?.username}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};
Tabbar.propTypes = {
  userinfo: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
};
export default Tabbar;