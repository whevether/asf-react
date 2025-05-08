import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
const BreadcrumbItems = (props)=>{
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(f=>f);
  const extraBreadcrumbItems = pathSnippets.map((item,index)=>{
    const url = `/${pathSnippets.slice(0,index+1).join('/')}`;
    return{
      key: url,
      title: <Link to={url}>{props?.mapBreadcrumbItems[url]}</Link>
    };
  });
  const breadcrumbItems = [
    {
      title: <Link to="/">控制台</Link>,
      key: '/',
    },
  ].concat(extraBreadcrumbItems);
  return (
    <div className="bread">
      <Breadcrumb items={breadcrumbItems}/>
    </div>
  );
};
BreadcrumbItems.propTypes = {
  mapBreadcrumbItems: PropTypes.object.isRequired
};
export default BreadcrumbItems;
