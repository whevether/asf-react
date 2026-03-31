import React, { useMemo, useCallback, useEffect } from 'react';
import { ProLayout, PageContainer } from '@ant-design/pro-components';
import { useLocation, useNavigate, Outlet, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonAction from 'store/actions/common';
import { getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import { convertBackendMenuToPro, flattenMenuItems } from 'utils/menuUtils';
import RightContent from './RightContent';
import MultiTab, { useMultiTab } from './MultiTab';
import PropTypes from 'prop-types';
import LoadingOverlay from 'components/LoadingOverlay';

// Webpack 通过 DefinePlugin 注入 __VITE_APP_WATERMARK_TEXT__；Vite 从 .env 注入 import.meta.env.VITE_APP_WATERMARK_TEXT
const watermarkContent =
  (typeof __VITE_APP_WATERMARK_TEXT__ !== 'undefined' ? __VITE_APP_WATERMARK_TEXT__ : '') ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_WATERMARK_TEXT) ||
  '';

function grantedPermission(menu, pathname) {
  if (pathname === '/' || pathname === '') return true;
  if (!menu?.length) return false;
  return menu.some((item) => {
    const path = item?.menuUrl || item?.code;
    if (pathname === path || (path && pathname.startsWith(path + '/'))) return true;
    if (Array.isArray(item?.children)?.length) return grantedPermission(item.children, pathname);
    return false;
  });
}

const STORAGE_KEY = 'pro_layout_collapsed';

function ProLayoutWrapper(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { common } = props;
  const userinfo = common?.data;
  const permissionMenu = userinfo?.permissionMenu;
  const languages = common?.countryList || [];

  const route = useMemo(() => {
    const routes = convertBackendMenuToPro(permissionMenu, t);
    return { path: '/', routes };
  }, [permissionMenu, t]);

  const menuDataFlat = useMemo(() => flattenMenuItems(route?.routes || []), [route?.routes]);

  const { tabList, activeKey, onEdit, onTabClick } = useMultiTab(menuDataFlat, t);

  const [collapsed, setCollapsed] = React.useState(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'true';
    } catch {
      return false;
    }
  });

  const onCollapse = useCallback((next) => {
    setCollapsed(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
  }, []);

  const menuItemRender = useCallback((item, dom) => {
    if (item?.target === '_blank' && item?.path) {
      return <a href={item.path} target="_blank" rel="noopener noreferrer">{dom}</a>;
    }
    if (item?.path) {
      return <Link to={item.path}>{dom}</Link>;
    }
    return dom;
  }, []);

  useEffect(() => {
    if (!getCookie('token')) {
      navigate('/login');
      return;
    }
    setToken(getCookie('token'));
    if (!userinfo) props.fetchUserInfo();
  }, []);

  if (!userinfo) {
    return <LoadingOverlay />;
  }

  const pathname = location.pathname + (location.search || '');
  if (!grantedPermission(permissionMenu, pathname)) {
    return <Navigate to="/403" replace />;
  }
  const layoutContent = (
    <ProLayout
      locale="zh-CN"
      location={location}
      route={route}
      menuDataRender={() => route?.routes || []}
      menuItemRender={menuItemRender}
      collapsed={collapsed}
      onCollapse={onCollapse}
      avatarProps={false}
      actionsRender={() => (
        <RightContent userinfo={userinfo} languages={languages} />
      )}
      layout="mix"
      fixSiderbar
      title="wchat"
      logo={<img src="/assets/logo.png" alt="logo" style={{ height: 32, objectFit: 'contain' }} />}
      contentStyle={{ padding: 0 }}
      waterMarkProps={watermarkContent ? { content: watermarkContent } : undefined}
    >
      <PageContainer
        header={{ title: false }}
        style={{ padding: 0 }}
        contentStyle={{ padding: 0 }}
      >
        <MultiTab
          tabs={tabList}
          activeKey={activeKey}
          onEdit={onEdit}
          onTabClick={onTabClick}
        />
        <Outlet />
      </PageContainer>
    </ProLayout>
  );

  return layoutContent;
}

ProLayoutWrapper.propTypes = {
  common: PropTypes.object,
  fetchUserInfo: PropTypes.func,
};

export default connect(
  (state) => ({ common: state?.common }),
  (dispatch) => bindActionCreators(commonAction, dispatch)
)(ProLayoutWrapper);
