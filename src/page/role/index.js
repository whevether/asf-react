import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { roleSearchFrom, apiFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as roleAuthAction from 'store/actions/role';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, Switch, notification, Modal } from 'antd';
import {DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 角色 1: 修改角色
  const [initFromValue, setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.roleFunc?.fetchRoleList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.role?.listTotal,
    onChange: (page, pageSize) => {
      props?.roleFunc?.fetchRoleList({ pageNo: page, pageSize: pageSize });
    },
    pageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      props?.permissionFunc?.fetchPermissionList({ pageNo: 0, pageSize: 200 })
        .then(res=>{
          setDrawType(type);
          let from = apiFrom(res);
          //判断是否为超级管理员。如果为则显示选择租户
          if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
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
          setFromData(from);
          setShowDarw(true);
        });
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      data.permissionId = data?.permissionId.slice(-1)[0];
      data.httpMethods = data?.httpMethods.join(',');
      props?.roleFunc?.createRole(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加角色成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.roleFunc?.fetchRoleList({ pageNo: 0, pageSize: 20 });
          },500);
        });
    }else if(drawType === 1){
      data.permissionId = data?.permissionId.slice(-1)[0];
      data.httpMethods = data?.httpMethods.join(',');
      data.id = initFromValue.id;
      props?.roleFunc?.modifyRole(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改角色成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.roleFunc?.fetchRoleList({ pageNo: 0, pageSize: 20 });
          },500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.roleFunc?.fetchRoleList(e);
  };
  // 修改
  const list = [{
    name: '修改角色',
    permission: 'role.modify',
    isAction: true,
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'name': data?.name,
        'path': data?.path,
        'httpMethods': data?.httpMethods.split(','),
        'status': data?.status,
        'type': data?.type,
        'isSystem': data?.isSystem,
        'description': data?.description,
        'isLogger': data?.isLogger
      });
      onOpenDarw(1);
    }
  }, {
    name: '角色详情',
    permission: 'role.details',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '删除角色',
    permission: 'role.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除角色!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除角色之后将无法恢复,会影响其他用户，请谨慎操作!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.roleFunc.deleteRole(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除角色成功'
              });
              setTimeout(()=>{
                props?.roleFunc?.fetchRoleList({ pageNo: 0, pageSize: 20 });
              },500);
            });
        }
      });
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: '100px'
  }, {
    title: '角色名称',
    dataIndex: 'name',
    width: 150,
    key: 'name'
  },{
    title: '角色状态',
    dataIndex: 'status',
    width: 150,
    key: 'status',
    render: (text,record)=>{
      const mapStatus = {
        0: '启用',
        1: '禁用'
      };
      return props?.userInfo.actions.includes('role.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="禁用"
      unCheckedChildren="启用" onChange={(e) => {
        props?.roleFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改角色状态成功'
          });
          props?.roleFunc?.fetchRoleList();
        });
      }} />  : mapStatus[text];
    }
  }, {
    title: '说明',
    dataIndex: 'description',
    width: 150,
    key: 'description'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 200,
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    width: 150,
    // eslint-disable-next-line
    render: (text) => {
      return (<Dropdown overlay={menu(text)} name="action">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>);
    }
  }];
  const mapTitle = {
    0: '添加角色',
    1: '修改角色'
  };
  return (
    <div className="list">
      {head('角色列表')}
      <BaseTable formObj={roleSearchFrom} querySubmit={querySubmit} dataSource={props?.role?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加角色', permission: 'role.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      <Drawer
        title={mapTitle[drawType]}
        width={720}
        visible={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
Index.propTypes = {
  roleFunc: PropTypes.object,
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  role: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  role: state?.role,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    roleFunc: bindActionCreators(roleAuthAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Index);