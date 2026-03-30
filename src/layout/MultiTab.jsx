import React, { useCallback, useEffect, useMemo } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const TAB_STORAGE_KEY = 'pro_multitab_panes';

function getStorageTabs() {
  try {
    const raw = sessionStorage.getItem(TAB_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function setStorageTabs(tabs) {
  try {
    sessionStorage.setItem(TAB_STORAGE_KEY, JSON.stringify(tabs));
  } catch {}
}

export default function MultiTab({ tabs, activeKey, onEdit, onTabClick }) {
  const items = useMemo(
    () =>
      tabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        closable: tab.closable !== false,
      })),
    [tabs]
  );
  return (
    <Tabs
      type="editable-card"
      hideAdd
      activeKey={activeKey}
      onEdit={onEdit}
      onTabClick={onTabClick}
      items={items}
      style={{ marginBottom: 0 }}
    />
  );
}
MultiTab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.node, closable: PropTypes.bool })),
  activeKey: PropTypes.string,
  onEdit: PropTypes.func,
  onTabClick: PropTypes.func,
};

export function useMultiTab(menuDataFlat, t) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname + (location.search || '');
  const { t: trans } = useTranslation();

  const getTitleByPath = useCallback(
    (path) => {
      if (!menuDataFlat?.length) return path || '';
      const exact = menuDataFlat.find((m) => (m.path || m.key) === path);
      if (exact) return exact.name;
      const best = menuDataFlat
        .filter((m) => path?.startsWith((m.path || m.key) + '/'))
        .sort((a, b) => (b.path || b.key).length - (a.path || a.key).length)[0];
      return best?.name || path || '';
    },
    [menuDataFlat]
  );

  const [tabList, setTabList] = React.useState(() => {
    const stored = getStorageTabs();
    if (stored.length) return stored;
    return [{ key: '/', label: t ? t('common.home') || '首页' : '首页', closable: false }];
  });

  const [activeKey, setActiveKey] = React.useState(pathname || '/');

  useEffect(() => {
    if (!pathname) return;
    const title = getTitleByPath(pathname);
    setTabList((prev) => {
      const exists = prev.find((p) => p.key === pathname);
      if (exists) {
        const next = prev.map((p) => (p.key === pathname ? { ...p, label: title } : p));
        setStorageTabs(next);
        return next;
      }
      const next = [
        ...prev.map((p) => (p.key === '/' ? { ...p, closable: true } : p)),
        { key: pathname, label: title, closable: true },
      ];
      setStorageTabs(next);
      return next;
    });
    setActiveKey(pathname);
  }, [pathname, getTitleByPath]);

  const onEdit = useCallback(
    (targetKey, action) => {
      if (action !== 'remove') return;
      setTabList((prev) => {
        const list = prev.filter((t) => t.key !== targetKey);
        const next = list.length ? list : [{ key: '/', label: trans('common.home') || '首页', closable: false }];
        setStorageTabs(next);
        const activeIdx = prev.findIndex((t) => t.key === targetKey);
        const nextKey = activeKey === targetKey
          ? (next[Math.max(0, activeIdx - 1)]?.key || '/')
          : activeKey;
        setActiveKey(nextKey);
        navigate(nextKey);
        return next;
      });
    },
    [activeKey, navigate, trans]
  );

  const onTabClick = useCallback(
    (key) => {
      setActiveKey(key);
      navigate(key);
    },
    [navigate]
  );

  const addTab = useCallback(
    (path, label) => {
      const title = label || getTitleByPath(path);
      setTabList((prev) => {
        const exists = prev.some((p) => p.key === path);
        if (exists) return prev;
        const next = [...prev, { key: path, label: title, closable: true }];
        setStorageTabs(next);
        return next;
      });
      setActiveKey(path);
      navigate(path);
    },
    [getTitleByPath, navigate]
  );

  return { tabList, activeKey, onEdit, onTabClick, addTab };
}
