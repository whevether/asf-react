import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const PageHeader = (props) => {
  const pageHeaderMap = {
    '账户管理': '控制面板'
  };
  return(
    <div className="pageheader">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{pageHeaderMap[props?.data?.name]}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{props?.data?.name}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 style={{marginBottom:'0px'}}>{props?.data?.name}</h3>
    </div>
  );
};
PageHeader.propTypes = {
  data: PropTypes.object.isRequired
};
export default PageHeader;