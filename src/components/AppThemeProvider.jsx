import React, { useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import zhCN from 'antd/locale/zh_CN';
import { setTheme } from 'store/actions/common';

const THEME_STORAGE_KEY = 'app_theme';

export default function AppThemeProvider({ children }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.common?.theme) || 'light';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        dispatch(setTheme(saved));
      }
    } catch {}
  }, [dispatch]);

  const algorithm = theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
