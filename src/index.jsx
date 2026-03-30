import "core-js/stable";
// 路由句柄
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { configureStore } from 'store/configureStore';
import i18n from 'utils/i18n';
import { router } from 'router/routes';
import GlobalLoad from 'components/GlobalLoad';
import AppThemeProvider from 'components/AppThemeProvider';
const { store } = configureStore();
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错;
import 'style/style.scss';
dayjs.locale('zh-cn');

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <AppThemeProvider>
        <RouterProvider router={router} />
        <GlobalLoad />
      </AppThemeProvider>
    </I18nextProvider>
  </Provider>
);