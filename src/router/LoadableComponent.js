import Loadable from '@loadable/component';
import { Spin } from 'antd';
import React from 'react';
const LoadableComponent = (component) =>
  Loadable(component, { fallback: <Spin style={{position:'fixed',display:'flex',width: '100%',height:'100%',alignItems:'center',justifyContent:'center',zIndex: 1,backgroundColor:'rgba(0,0,0,.3)'}} delay={500}/> });
export default LoadableComponent;