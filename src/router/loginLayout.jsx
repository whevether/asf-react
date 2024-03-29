import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { start,clear } from './loginSvg';
// start();
// 登入页布局
const LoginLayout = () => {
  useEffect(() => {
    setTimeout(() => {
      start();
    }, 1500);
    return () => {
      clear();
    };
  }, []);
  return (
    <div className="login-wrapper" >
      <Outlet />
    </div>
  );
};
export default LoginLayout;