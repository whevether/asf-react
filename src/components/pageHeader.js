import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const PageHeader = (props) => {
  const pageHeaderMap = {
    '账户管理': '控制面板',
    '权限管理': '控制面板'
  };
  return(
    <div className="pageheader">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{pageHeaderMap[props?.name]}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{props?.name}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 style={{marginBottom:'0px'}}>{props?.name}</h3>
    </div>
  );
};
PageHeader.propTypes = {
  name: PropTypes.string.isRequired
};
export default PageHeader;