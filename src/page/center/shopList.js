import React, { useEffect } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { centerShopSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as centerAction from 'store/actions/center';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BaseTable } from 'components/index';
const ShopList = (props) => {
  //获取账户列表
  useEffect(() => {
    props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
  }, []);
  // 分页对象
  const pagination = {
    total: props?.center?.listTotal,
    onChange: (page, pageSize) => {
      props?.centerFunc?.getCenterList(props?.history?.location?.pathname,{pageNo:page,pageSize:pageSize});
    },
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.centerFunc?.getCenterList(props?.history?.location?.pathname,{name:e.name});
  };
  /* eslint-disable react/display-name */
  /* eslint-disable  react/no-multi-comp */
  const columns = [{
    title: '商铺ID',
    dataIndex: 'shopId',
    key: 'shopId',
    width: 100
  },{
    title: '商户名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },{
    title: '商铺Key',
    dataIndex: 'shopKey',
    key: 'shopKey',
    width: 100
  },{
    title: '商铺类型',
    dataIndex: 'shopTypeStr',
    key: 'shopTypeStr',
    width: 200,
    render: (text)=>{
      return <p style={{wordBreak:'break-all'}}>{text}</p>;
    }
  },{
    title: '商铺版本',
    dataIndex: 'editionTypeStr',
    key: 'editionTypeStr',
    width: 200,
    render: (text)=>{
      return <p style={{wordBreak:'break-all'}}>{text}</p>;
    }
  },{
    title: '商户昵称',
    dataIndex: 'nickName',
    key: 'nickName',
    width: 100
  },{
    title: '商铺Logo',
    dataIndex: 'logo',
    key: 'logo',
    width: 100,
    render: (text)=>{
      if(text){
        return <img src={text} style={{width:'50px',height:'50px'}}/>;
      }else{
        return '';
      }
    }
  },{
    title: '商户负责人',
    dataIndex: 'principal',
    key: 'principal',
    width: 100
  },{
    title: '商户手机',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 100
  },{
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    width: 100
  },{
    title: '商户简介',
    dataIndex: 'businessContacter',
    key: 'businessContacter',
    width: 100
  },{
    title: '商铺类型',
    dataIndex: 'shopType',
    key: 'shopType',
    width: 100
  },{
    title: '商铺电话',
    dataIndex: 'businessPhone',
    key: 'businessPhone',
    width: 100
  },{
    title: '商铺地址',
    dataIndex: 'address',
    key: 'address',
    width: 100
  },{
    title: '商户区域',
    dataIndex: 'regionPath',
    key: 'regionPath',
    width: 100
  },{
    title: '供应商名称',
    dataIndex: 'vendorName',
    key: 'vendorName',
    width: 100
  },{
    title: '是否启用',
    dataIndex: 'isEnable',
    key: 'isEnable',
    width: 100,
    render: (text)=>{
      let statusMap = {
        false: '禁用',
        true: '启用'
      };
      return statusMap[text];
    }
  },{
    title: '认证状态',
    dataIndex: 'authenticationState',
    key: 'authenticationState',
    width: 100,
    render: (text)=>{
      let statusMap = {
        0: '未认证',
        1: '已认证'
      };
      return statusMap[text];
    }
  },{
    title: '创建时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    width: 100,
    render: (text)=>{
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  },{
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 100,
    render: (text)=>{
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }];
  return (
    <div className="account-list">
      {head('商铺列表')}
      {
        props?.center?.list && <BaseTable formObj={centerShopSearchFrom} querySubmit={querySubmit} dataSource={props?.center?.list} columns={columns} pagination={pagination} action={props?.action}  x={2000}/>
      }
    </div>
  );
};
ShopList.propTypes = {
  x: PropTypes.number,
  centerFunc: PropTypes.object,
  getCenterList: PropTypes.func,
  history: PropTypes.object,
  center: PropTypes.object,
  action: PropTypes.array,
  initialValues: PropTypes.object
};
export default connect(state => ({
  center: state?.center,
}), dispatch => {
  return{
    centerFunc:bindActionCreators(centerAction, dispatch)
  };
})(ShopList);