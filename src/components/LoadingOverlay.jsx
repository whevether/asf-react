import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

/** 全屏居中 loading 遮罩，与请求 loading 同一位置、同一样式 */
const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 10000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.45)',
  pointerEvents: 'auto',
};

export default function LoadingOverlay({ description = '加载中...' }) {
  return (
    <div style={overlayStyle} aria-hidden="true">
      <Spin size="large" description={description} />
    </div>
  );
}
LoadingOverlay.propTypes = {
  description: PropTypes.string,
};
