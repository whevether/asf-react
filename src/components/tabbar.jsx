import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, message, Tooltip } from 'antd';
import { removeCookie } from 'utils/storage';
import { useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, GlobalOutlined, FontColorsOutlined, UserOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import screenfull from 'screenfull';
const Tabbar = (props) => {
  let navigate = useNavigate();
  const { i18n,t } = useTranslation();
  const dispatch = useDispatch();
  const [full, setFull] = useState(false);
  const [languageName,setLanguageName] = useState('中国');
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
  const onChangeLanguage = (lng,name) => {
    i18n.changeLanguage(lng.toLocaleLowerCase());
    setLanguageName(name);
  };
  const menu = [{
    key: '1',
    label: (<span onClick={() => handleGoNav(`/user/center?id=${props?.userinfo?.id}`)}>{t('common.user.center')}</span>),
    icon: <UserOutlined onClick={() => handleGoNav(`/user/center?id=${props?.userinfo?.id}`)} />
  }, {
    key: '0',
    label: (<span onClick={() => onLogout()}>{t('common.logout')}</span>),
    icon: <LogoutOutlined onClick={() => onLogout()} />
  }];
  const menu1 = props?.languages?.map((item, index) => {
    return {
      label:  (<span onClick={()=>onChangeLanguage(item?.languageCode,item?.name)}>{item?.name}</span>),
      key: index,
      icon: (<GlobalOutlined onClick={()=>onChangeLanguage(item?.languageCode,item?.name)} />)
    };
  });
  return (
    <div className="tabbar">
      <div onClick={() => props?.toggleMenu()} className="collapsed">
        {props?.collapsed ? <Tooltip title="展开"><MenuUnfoldOutlined /></Tooltip> : <Tooltip title="收缩"><MenuFoldOutlined /></Tooltip>}
      </div>
      <div className="tabbar-menu">
        {
          props?.languages.length > 0 && <Dropdown menu={{ items: menu1 }}>
            <span className="tabbar-dropdown"  style={{marginRight: '10px'}}>
              <FontColorsOutlined />
              {languageName}
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