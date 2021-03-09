import React, { useEffect } from 'react';
import {head} from 'utils/head';
import {timeToDate} from 'utils/storage';
import PropTypes from 'prop-types';
import * as accountAction from 'store/actions/account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import BaseTable from 'components/tabble';
const AccountList = (props) => {
  const from = [{
    title: '账户名',
    fromType: 'input',
    inputType: 'text',
    name: 'username',
    placeholder: '请输入账户名',
    rules: [{ type: 'string', min: 2, max: 50,message:'最少输入2个字符的账户名或最多输入50个字符的账户名' }]
  }, {
    title: '手机号码',
    fromType: 'input',
    inputType: 'text',
    placeholder: '请输入手机号码',
    name: 'telphone',
    rules: [{type: 'string',pattern:/^1[0-9]{10}$/,message: '输入的手机号码不正确'}]
  }, {
    title: '邮箱地址',
    fromType: 'input',
    inputType: 'text',
    placeholder: '请输入邮箱地址号码',
    name: 'email',
    // eslint-disable-next-line  no-useless-escape
    rules: [{type: 'string',pattern:/^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/,message: '输入的邮箱地址不正确不正确'}]
  }];
  useEffect(() => {
    props.fetchAccountList();
  },[]);
  // 分页对象
  const pagination = {
    total: props?.account?.total,
    onChange: (page,pageSize)=>{
      console.log(page,pageSize);
    },
    onShowSizeChange: (current,size)=> {
      console.log(current,size);
    },
    pageSizeOptions: ['10','20','50','100'],
    showTotal: (total)=> `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 提交表格查询
  const querySubmit = (e)=>{
    console.log(e);
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        修改账户
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        分配账户角色
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        分配账户部门
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        分配账户岗位
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">
        删除账户
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">
        修改账户密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">
        修改账户手机
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="7">
        修改账户邮箱
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="8">
        修改账户头像
      </Menu.Item>
    </Menu>
  );
  const columns = [{
    title: '账户ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  },{
    title: '账户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: '100px',
    // eslint-disable-next-line
    render: (text) => {
      return <img name="avatar" src="../../assets/avatar.jpeg" style={{width:'50px',height:'50px',borderRadius:'50%',lineHeight:'50px'}} crossOrigin={text}/>;
    }
  },{
    title: '账户昵称',
    dataIndex: 'name',
    key: 'name'
  },{
    title: '账户名',
    dataIndex: 'username',
    key: 'username'
  },{
    title: '手机号码',
    dataIndex: 'telephone',
    key: 'telephone'
  },{
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },{
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
  },{
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
  },{
    title: '登录ip',
    dataIndex: 'loginIp',
    key: 'loginIp'
  },{
    title: '登录地址',
    dataIndex: 'loginLocation',
    key: 'loginLocation'
  },{
    title: '所属部门',
    dataIndex: 'departmentName',
    key: 'departmentName'
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text)=>{
      return timeToDate(text,'YYYY-MM-DD  HH:mm:ss');
    }
  },{
    title: '操作',
    key: 'action',
    // eslint-disable-next-line
    render: (text, record) => {
      console.log(text);
      console.log(record);
      return (<Dropdown overlay={menu} name="action">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>);
    }
  }];
  return(
    <div className="account-list">
      {head('账户列表')}
      {
        props?.account?.list && <BaseTable formObj={from} querySubmit={querySubmit} dataSource={props?.account?.list} columns= {columns} pagination={pagination}/>
      }
    </div>
  );
};
AccountList.propTypes = {
  fetchAccountList: PropTypes.func,
  account: PropTypes.object
};
export default connect(state => ({
  account: state?.account
}),dispatch => bindActionCreators(accountAction,dispatch))(AccountList);