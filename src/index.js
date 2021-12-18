/* eslint-disable import/default */
import "core-js/stable";
import "regenerator-runtime/runtime";
// 路由句柄
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { createBrowserHistory } from 'history';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import configureStore from 'store/configureStore';
const history = createBrowserHistory();
const { store, h } = configureStore(history); //第二个参数是初始状态
import Routes from 'router/routes';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import 'style/style.less';
dayjs.locale('zh-cn');
const loading = () => {
  setTimeout(() => {
    if (document.getElementById('scene')) {
      document.getElementById('scene').remove();
    }
    //删除加载动画js,防止继续运行消耗内存
    for (let src of document.getElementsByClassName('loading')) {
      src.parentNode.removeChild(src);
    }
  }, 1500);
};
loading();
// ReactDOM.hydrate  服务端渲染用
ReactDOM.render(
  <Provider store={store} >
    <ConfigProvider locale={locale}>
      <Router history={h}>
        <Routes />
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('app')
);