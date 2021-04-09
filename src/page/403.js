import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {head} from 'utils/head';
const Error401 = ()=>{
  return (
    <div className="error-403">
      {head('403没有权限')}
      <img src="assets/403.svg"/>
      <span style={{marginTop:'15px'}}>403错误,没有权限</span>
      <Link to="/login" replace style={{marginTop:'15px'}}><Button type="primary">返回登录</Button></Link>
    </div>
  );
};
export default Error401;