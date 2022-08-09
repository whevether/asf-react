import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { accountSearchFrom, accountFrom, assignFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as accountAction from 'store/actions/account';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, notification, Switch, Empty } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const AccountList = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); //0 添加账户 1修改账户, 2分配账户角色 3: 分配账户部门， 4分配账户岗位， 5 删除账户 6 修改账户密码， 7 修改账户手机， 8 修改账户邮箱, 9 修改账户头像
  const [initFromValue, setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.accountFunc?.fetchAccountList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.account?.listTotal,
    onChange: (page, pageSize) => {
      props?.accountFunc?.fetchAccountList({ pageNo: page, pageSize: pageSize });
    },
    pageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      Promise.all([props?.commonFunc?.getDepartmentList(), props?.commonFunc?.getPostList()])
        .then(res => {
          let from = accountFrom.filter(f => {
            if (f.name === 'departmentId') {
              f.selOption = res[0];
            }
            if (f.name === 'postId') {
              f.selOption = res[1];
            }
            return f;
          });
          //判断是否为超级管理员。如果为则显示选择租户
          if (props?.userInfo?.roleName?.indexOf('superadmin') > -1) {
            from.unshift({
              title: '租户',
              fromType: 'select',
              name: 'tenancyId',
              selOption: props?.tenancyList,
              placeholder: '请选择租户',
              rules: [{ required: true, message: '租户不能为空' }],
              options: {
                allowClear: true//是否显示清除框
              }
            });
          }
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    }else if(type === 2){
      props?.commonFunc?.getRoleList()
        .then(res=>{
          let from = assignFrom('分配角色权限','角色',res);
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    }else if(type === 3){
      props?.commonFunc?.getDepartmentList()
        .then(res=>{
          let from = assignFrom('分配部门','部门',res,'departmentId','cascader','');
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    }else if(type === 4){
      props?.commonFunc?.getPostList()
        .then(res=>{
          let from = assignFrom('分配岗位','岗位',res,'postId');
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType == 0) {
      data.departmentId = data.departmentId.slice(-1)[0];
      props?.accountFunc?.createAccount(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加账户成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageNo: 1, pageSize: 20 });
        });
    } else if(drawType === 1) {
      data.departmentId = data.departmentId.slice(-1)[0];
      data.id = initFromValue.id;
      props?.accountFunc?.modifyAccount(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改账户成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageNo: 1, pageSize: 20 });
        });
    }else if(drawType == 2){
      data.id = initFromValue.id;
      props?.accountFunc?.assignAccountRole(data)
        .then(()=>{
          notification['success']({
            message: '分配角色',
            description: '分配角色成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageNo: 1, pageSize: 20 });
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    console.log(e);
  };
  // 修改
  const list = [{
    name: '账户详情',
    permission: 'account.details',
    click: () => {
      notification.info({ message: '账户详情' });
    }
  }, {
    name: '修改账户',
    permission: 'account.modify',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'postId': data?.posts.map(m => m.id),
        'departmentId': [data?.department?.pid, data?.department?.id],
        'username': data?.name,
        'password': data?.password,
        'telphone': data?.telPhone.replace('86+', ''),
        'email': data?.email,
        'name': data?.name,
        'sex': data?.sex
      });
      onOpenDarw(1);
    }
  }, {
    name: '分配账户角色',
    permission: 'account.assignrole',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'ids': data?.roles?.map(s=>s.id)
      });
      onOpenDarw(2);
    }
  }, {
    name: '分配账户部门',
    permission: 'account.assigndepartment',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'departmentId': [data?.department?.pid, data?.department?.id],
      });
      onOpenDarw(3);
    }
  }, {
    name: '分配账户岗位',
    permission: 'account.assignpost',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'postId': data?.posts?.map(s=>s.id),
      });
      onOpenDarw(4);
    }
  }, {
    name: '删除账户',
    permission: 'account.delete.[0-9]{1,12}',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户密码',
    permission: 'account.resetpassword',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户手机',
    permission: 'account.modifytelphone',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户邮箱',
    permission: 'account.modifyemail',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户头像',
    permission: 'account.modifyavatar',
    click: (data) => {
      console.log(data);
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl action={props?.userInfo.actions} list={list} record={record} type="menu" />
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
    dataIndex: 'telPhone',
    key: 'telPhone'
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
    // eslint-disable-next-line
    render: (text, record) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo.actions.includes('account.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
        unCheckedChildren="禁用" onChange={(e) => {
          props?.accountFunc?.modifyAccountStatus({ id: record?.id, status: Number(e) }).then(() => {
            props?.accountFunc?.fetchAccountList();
          });
        }} /> : statusMap[text];
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
    dataIndex: 'department',
    key: 'department',
    // eslint-disable-next-line
    render: (text) => {
      return <span>{text?.name}</span>;
    }
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
  const mapDrawTitle = {
    0: '添加账户',
    1: '修改账户',
    2: '分配账户角色',
    3: '分配账户部门',
    4: '分配账户岗位',
    5: '删除账户',
    6: '修改账户密码',
    7: '修改账户手机',
    8: '修改账户邮箱',
    9: '修改账户头像'
  };
  return (
    <div className="list">
      {head('账户列表')}
      {
        props?.account?.list.length > 0 && <BaseTable formObj={accountSearchFrom} querySubmit={querySubmit} dataSource={props?.account?.list} columns={columns} pagination={pagination} action={props?.userInfo?.actions} list={[{ name: '添加账户', permission: 'account.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      }
      {
        props?.account.list.length == 0 && <Empty />
      }
      <Drawer
        title={mapDrawTitle[drawType]}
        width={720}
        visible={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
AccountList.propTypes = {
  accountFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  fetchAccountList: PropTypes.func,
  account: PropTypes.object,
  getDepartmentList: PropTypes.func,
  createAccount: PropTypes.func,
  tenancyList: PropTypes.arrayOf(Object),
  userInfo: PropTypes.object,
  initialValues: PropTypes.object
};
export default connect(state => ({
  account: state?.account,
  userInfo: state?.common?.data,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    accountFunc: bindActionCreators(accountAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  };
})(AccountList);