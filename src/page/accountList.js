import React, { useEffect } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import {accountPageFrom} from 'utils/json'; 
import PropTypes from 'prop-types';
import * as accountAction from 'store/actions/account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'antd';
import { DownOutlined,PlusCircleOutlined } from '@ant-design/icons';
import BaseTable from 'components/tabble';
import AuthControl from 'components/AuthControl';
const AccountList = (props) => {
  useEffect(() => {
    props.fetchAccountList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.account?.total,
    onChange: (page, pageSize) => {
      console.log(page, pageSize);
    },
    onShowSizeChange: (current, size) => {
      console.log(current, size);
    },
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 提交表格查询
  const querySubmit = (e) => {
    console.log(e);
  };
  const list = [{
    name: '账户详情',
    permission: 'account.details',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '修改账户',
    permission: 'account.modify',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '分配账户角色',
    permission: 'account.assignrole',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '分配账户部门',
    permission: 'account.assigndepartment',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '分配账户岗位',
    permission: 'account.assignpost',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '删除账户',
    permission: 'account.delete.[0-9]{1,12}',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '修改账户密码',
    permission: 'account.resetpassword',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '修改账户手机',
    permission: 'account.modifytelphone',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '修改账户邮箱',
    permission: 'account.modifyemail',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '修改账户头像',
    permission: 'account.modifyavatar',
    click: (data)=>{
      console.log(data);
    }
  },{
    name: '修改账户状态',
    permission: 'account.modifystatus',
    click: (data)=>{
      console.log(data);
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl action={props?.action} list={list} record={record} type="menu"/>
    );
  };
  const columns = [{
    title: '账户ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  }, {
    title: '账户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: '100px',
    // eslint-disable-next-line
    render: (text) => {
      return <img name="avatar" src="../../assets/avatar.jpeg" style={{ width: '50px', height: '50px', borderRadius: '50%', lineHeight: '50px' }} crossOrigin={text} />;
    }
  }, {
    title: '账户昵称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '账户名',
    dataIndex: 'username',
    key: 'username'
  }, {
    title: '手机号码',
    dataIndex: 'telephone',
    key: 'telephone'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text) => {
      let sexMap = {
        0: '未知',
        1: '男',
        2: '女'
      };
      return sexMap[text];
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return statusMap[text];
    }
  }, {
    title: '登录ip',
    dataIndex: 'loginIp',
    key: 'loginIp'
  }, {
    title: '登录地址',
    dataIndex: 'loginLocation',
    key: 'loginLocation'
  }, {
    title: '所属部门',
    dataIndex: 'departmentName',
    key: 'departmentName'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    // eslint-disable-next-line
    render: (text) => {
      return (<Dropdown overlay={menu(text)} name="action">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>);
    }
  }];
  return (
    <div className="account-list">
      {head('账户列表')}
      {
        props?.account?.list && <BaseTable formObj={accountPageFrom} querySubmit={querySubmit} dataSource={props?.account?.list} columns={columns} pagination={pagination} action={props?.action} list={[{name:'添加账户',permission:'account.create',type:'primary', icon: <PlusCircleOutlined />,click: (e)=>{console.log(e);}}]}/>
      }
    </div>
  );
};
AccountList.propTypes = {
  fetchAccountList: PropTypes.func,
  account: PropTypes.object,
  action: PropTypes.array
};
export default connect(state => ({
  account: state?.account
}), dispatch => bindActionCreators(accountAction, dispatch))(AccountList);