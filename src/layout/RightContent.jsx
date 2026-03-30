import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown, message, Tooltip } from 'antd';
import { removeCookie } from 'utils/storage';
import { useNavigate } from 'react-router-dom';
import * as types from 'constants/types';
import {
  LogoutOutlined,
  GlobalOutlined,
  UserOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as commonAction from 'store/actions/common';
import { useTranslation } from 'react-i18next';
import screenfull from 'screenfull';
import PropTypes from 'prop-types';

export default function RightContent({ userinfo, languages }) {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.common?.theme) || 'light';
  const [full, setFull] = useState(false);
  const [languageName, setLanguageName] = useState('中文');

  const onToggleTheme = () => dispatch(commonAction.setTheme(theme === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    if (Array.isArray(languages) && languages.length > 0) {
      const currentLng = i18n.language?.toLowerCase?.();
      const mapCode = { cn: 'cn', idn: 'id', mys: 'my', vn: 'vn', tb: 'th', ind: 'in', phl: 'ph', en: 'en' };
      const match = languages.find(
        (item) =>
          item?.languageCode?.toLowerCase() === currentLng ||
          item?.languageCode?.toLowerCase() === mapCode[currentLng] ||
          currentLng === (item?.languageCode ?? '').toLowerCase()
      );
      setLanguageName(match?.name ?? '中文');
    }
  }, [languages, i18n.language]);

  const handleGoNav = (path, params = {}) => navigate(path, params);

  const onLogout = () => {
    removeCookie(['token', 'refreshToken']);
    dispatch({ type: types.FETCH_USER_DATA, payload: null });
    handleGoNav('/login');
  };

  const onScreenfull = () => {
    if (!screenfull.isEnabled) {
      message.error({ content: t('common.browserNotSupport') || '浏览器不支持' });
      return;
    }
    screenfull.toggle();
    screenfull.on('change', () => setFull((prev) => !prev));
  };

  const onChangeLanguage = (lng, name) => {
    const mapData = {
      cn: 'cn',
      id: 'idn',
      my: 'mys',
      vn: 'vn',
      th: 'tb',
      in: 'ind',
      ph: 'phl',
      en: 'en',
    };
    const code = mapData[lng?.toLowerCase()] || lng?.toLowerCase();
    i18n.changeLanguage(code);
    setLanguageName(name);
  };

  const userMenuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: (
        <span onClick={() => handleGoNav(`/user/center?id=${userinfo?.id}`)}>
          {t('common.user.center')}
        </span>
      ),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span onClick={onLogout}>{t('common.logout')}</span>,
    },
  ];

  const langMenuItems =
    languages?.map((item, index) => ({
      key: String(index),
      icon: <GlobalOutlined />,
      label: (
        <span onClick={() => onChangeLanguage(item?.languageCode, item?.name)}>
          {item?.name}
        </span>
      ),
    })) || [];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Tooltip title={theme === 'light' ? '切换暗黑' : '切换明亮'}>
        <span onClick={onToggleTheme} style={{ cursor: 'pointer' }}>
          {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
        </span>
      </Tooltip>
      {Array.isArray(languages) && languages.length > 0 && (
        <Dropdown menu={{ items: langMenuItems }} placement="bottomRight">
          <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <GlobalOutlined />
            {languageName}
          </span>
        </Dropdown>
      )}
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar src={userinfo?.avatar ? decodeURIComponent(userinfo.avatar) : undefined} icon={!userinfo?.avatar && <UserOutlined />} />
          <span>{userinfo?.username}</span>
        </span>
      </Dropdown>
      <Tooltip title={full ? (t('common.exitFullscreen') || '退出全屏') : (t('common.fullscreen') || '全屏')}>
        <span onClick={onScreenfull} style={{ cursor: 'pointer' }}>
          {full ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </span>
      </Tooltip>
    </div>
  );
}

RightContent.propTypes = {
  userinfo: PropTypes.object,
  languages: PropTypes.arrayOf(PropTypes.object),
};
