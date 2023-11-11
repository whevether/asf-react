import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, message, Tooltip } from 'antd';
import { removeCookie, getCookie, setCookie } from 'utils/storage';
import { useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, GlobalOutlined, FontColorsOutlined, UserOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import screenfull from 'screenfull';
const Tabbar = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [full, setFull] = useState(false);
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
  const onScreenfull = () => {
    if(!screenfull.isEnabled){
      message.error({content: '浏览器不支持'});
      return;
    }
    screenfull.toggle();
    screenfull.on('change',()=>{
      setFull(!full);
    });
  };
  const menu = [{
    key: '1',
    label: (<span onClick={() => handleGoNav(`/user/center?id=${props?.userinfo?.id}`)}>个人中心</span>),
    icon: <UserOutlined onClick={() => handleGoNav(`/user/center?id=${props?.userinfo?.id}`)} />
  }, {
    key: '0',
    label: (<span onClick={() => onLogout()}>登出</span>),
    icon: <LogoutOutlined onClick={() => onLogout()} />
  }];
  const menu1 = props?.languages?.map((item, index) => {
    item.key = index;
    item.label = (<span onClick={() => { setCookie('languages', item?.languages); }}>{item?.languages}</span>);
    item.icon = <GlobalOutlined onClick={() => { setCookie('languages', item?.languages); }} />;
    return item;
  });
  return (
    <div className="tabbar">
      <div onClick={() => props?.toggleMenu()} className="collapsed">
        {props?.collapsed ? <Tooltip title="展开"><MenuUnfoldOutlined /></Tooltip> : <Tooltip title="收缩"><MenuFoldOutlined /></Tooltip>}
      </div>
      <div className="tabbar-menu">
        {
          props?.languages.length > 0 && <Dropdown menu={{ items: menu1 }}>
            <span className="tabbar-dropdown">
              <FontColorsOutlined />
              {getCookie('languages') ?? '中文'}
            </span>
          </Dropdown>
        }
        <Dropdown menu={{ items: menu }}>
          <span className="tabbar-dropdown">
            <Avatar src={decodeURIComponent(props?.userinfo?.avatar)} />
            <span style={{ marginLeft: '5px' }}>{props?.userinfo?.username}</span>
          </span>
        </Dropdown>
        <div style={{ marginLeft: '10px' }}>
          {
            full ? <Tooltip title="缩小"><FullscreenExitOutlined onClick={() => onScreenfull()} /></Tooltip> : <Tooltip title="全屏"><FullscreenOutlined onClick={() => onScreenfull()} /></Tooltip>
          }
        </div>
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