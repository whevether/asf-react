import React, { useEffect } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { centerProgramSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as centerAction from 'store/actions/center';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BaseTable } from 'components/index';
const ProgramList = (props) => {
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
  const columns = [{
    title: '应用id',
    dataIndex: 'programId',
    key: 'programId',
    width: 100
  },{
    title: '应用名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },{
    title: '应用key',
    dataIndex: 'programKey',
    key: 'programKey',
    width: 100
  },{
    title: '支付渠key',
    dataIndex: 'payChannelKey',
    key: 'payChannelKey',
    width: 100
  },{
    title: '云app key',
    dataIndex: 'cloudAppKey',
    key: 'cloudAppKey',
    width: 100
  },{
    title: '微信appid',
    dataIndex: 'wxAppId',
    key: 'wxAppId',
    width: 100
  },{
    title: '商户key',
    dataIndex: 'merchantKey',
    key: 'merchantKey',
    width: 100
  },{
    title: '供应链key',
    dataIndex: 'chainKey',
    key: 'chainKey',
    width: 100
  },{
    title: '使用版本',
    dataIndex: 'trialVersion',
    key: 'trialVersion',
    width: 100
  },{
    title: '使用商户key',
    dataIndex: 'trialMerchantKey',
    key: 'trialMerchantKey',
    width: 100
  },{
    title: '是否有直播',
    dataIndex: 'hasLiveBroadcast',
    key: 'hasLiveBroadcast',
    width: 100,
    render: (text)=>{
      return text ? '是': '否';
    }
  },{
    title: '版权所有',
    dataIndex: 'copyright',
    key: 'copyright',
    width: 100
  },{
    title: '应用logo',
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
    title: '创建时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    width: 100,
    render: (text)=>{
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }];
  return (
    <div className="account-list">
      {head('商铺列表')}
      {
        props?.center?.list && <BaseTable formObj={centerProgramSearchFrom} querySubmit={querySubmit} dataSource={props?.center?.list} columns={columns} pagination={pagination} action={props?.action}  x={2000}/>
      }
    </div>
  );
};
ProgramList.propTypes = {
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
})(ProgramList);