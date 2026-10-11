import React, { useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { setTheme } from 'store/actions/common';

const THEME_STORAGE_KEY = 'app_theme';

export default function AppThemeProvider({ children }) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const theme = useSelector((state) => state?.common?.theme) || 'light';
  const isEnglish = i18n.language?.toLowerCase() === 'en';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        dispatch(setTheme(saved));
      }
    } catch { /* ignore */ }
  }, [dispatch]);

  useEffect(() => {
    dayjs.locale(isEnglish ? 'en' : 'zh-cn');
  }, [isEnglish]);

  const algorithm = theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      locale={isEnglish ? enUS : zhCN}
      theme={{
        algorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
