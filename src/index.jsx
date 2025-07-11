import "core-js/stable";
import '@ant-design/v5-patch-for-react-19';
// 路由句柄
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from "react-router-dom";
import {configureStore} from 'store/configureStore';
const { store } = configureStore(); //第二个参数是初始状态
import Routes from 'router/routes';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import 'style/style.scss';
dayjs.locale('zh-cn');
const container = document.getElementById('app');
const root = createRoot(container);
// ReactDOM.hydrate  服务端渲染用
root.render(
  <Provider store={store} >
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>);
