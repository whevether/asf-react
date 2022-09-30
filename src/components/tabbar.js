import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Tooltip } from 'antd';
import { removeCookie,getCookie,setCookie } from 'utils/storage';
import { useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, GlobalOutlined, FontColorsOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
const Tabbar = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //跳转路由
  const handleGoNav = (e, params = {}) => {
    navigate(e, params);
  };
  const onLogout = () => {
    removeCookie(['token', 'refreshToken']);
    dispatch({
      type: 'FETCH_USER_DATA',
      payload: null
    });
    handleGoNav('/login');
  };
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={onLogout}>
        <span >
          <LogoutOutlined /> 登出
        </span>
      </Menu.Item>
    </Menu>
  );
  const menu1 = (
    <Menu>
      {
        props?.languages?.map((item, index) => (
          <Menu.Item key={index}  onClick={()=>{setCookie('languages',item?.languages);}}>
            <span>
              <GlobalOutlined /> {item?.languages}
            </span>
          </Menu.Item>
        ))
      }
    </Menu>
  );
  return (
    <div className="tabbar">
      <div onClick={() => props?.toggleMenu()} className="collapsed">
        {props?.collapsed ? <Tooltip title="展开"><MenuUnfoldOutlined /></Tooltip> : <Tooltip title="收缩"><MenuFoldOutlined /></Tooltip>}
      </div>
      <div className="tabbar-menu">
        {
          props?.languages.length > 0 && <Dropdown overlay={menu1}>
            <span className="tabbar-dropdown">
              <FontColorsOutlined />
              {getCookie('languages') ?? '中文'}
            </span>
          </Dropdown>
        }
        <Dropdown overlay={menu}>
          <span className="tabbar-dropdown">
            <img src={props?.userinfo?.avatar} />
            {props?.userinfo?.username}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};
Tabbar.propTypes = {
  userinfo: PropTypes.object,
  languages: PropTypes.arrayOf(Object),
  toggleMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
};
export default Tabbar;