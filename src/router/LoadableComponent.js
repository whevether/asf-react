import Loadable from '@loadable/component';
import { Spin } from 'antd';
import React from 'react';
const LoadableComponent = (component) =>
  Loadable(component, { fallback: <Spin tip="加载中...."/> });
export default LoadableComponent;