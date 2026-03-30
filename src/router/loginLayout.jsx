import React from 'react';
import { Outlet } from 'react-router-dom';
import LoginP5Background from 'components/LoginP5Background';

// 笑脸月亮贴图：整圆月亮 + 眼睛 + 微笑（内联 SVG，无需外部图片）
const SmilingMoon = () => (
  <div className="login-smiling-moon" aria-hidden="true">
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="smiling-moon-svg"
    >
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="100%" stopColor="#f5e6b8" />
        </linearGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 整圆月亮 */}
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="url(#moonGrad)"
        filter="url(#moonGlow)"
      />
      {/* 左眼：眨眼动画以椭圆中心为原点 */}
      <ellipse className="moon-eye moon-eye-left" cx="42" cy="48" rx="5" ry="6" fill="#3d352a" />
      {/* 右眼 */}
      <ellipse className="moon-eye moon-eye-right" cx="78" cy="48" rx="5" ry="6" fill="#3d352a" />
      {/* 微笑弧线 */}
      <path
        d="M 38 72 Q 60 88 82 72"
        fill="none"
        stroke="#3d352a"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// 登入页布局：P5 背景 + 笑脸月亮贴图 + 登录表单
// eslint-disable-next-line react/no-multi-comp
const LoginLayout = () => {
  return (
    <div className="login-wrapper">
      <LoginP5Background />
      <SmilingMoon />
      <div className="login-wrapper-content">
        <Outlet />
      </div>
    </div>
  );
};
export default LoginLayout;