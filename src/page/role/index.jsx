import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { roleSearchFrom, roleFrom, assignFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as roleAuthAction from 'store/actions/role';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  Drawer, Switch, notification, Modal } from 'antd';
import {  ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 角色 1: 修改角色
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
  let navigate = useNavigate();
  //获取账户列表
  useEffect(() => {
    props?.roleFunc?.fetchRoleList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.role?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.roleFunc?.fetchRoleList({ pageNo: p, pageSize: size });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0) {
      setDrawType(type);
      let from = roleFrom();
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
    } else if (type === 1) {
      props?.commonFunc?.getPermissionList()
        .then(res => {
          setDrawType(type);
          let from = roleFrom(res);
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
    } else if (type === 2) {
      props?.commonFunc?.getPermissionList()
        .then(res => {
          setDrawType(type);
          setFromData(assignFrom('分配权限', '权限', res));
          setShowDarw(true);
        });
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      props?.roleFunc?.createRole(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加角色成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.roleFunc?.fetchRoleList({ pageSize:pageSize });
          }, 500);
        });
    }else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.roleFunc?.modifyRole(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改角色成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.roleFunc?.fetchRoleList({ pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 2) {
      data.id = initFromValue.id;
      props?.roleFunc?.assignPermission(data)
        .then(() => {
          notification['success']({
            message: '分配成功',
            description: '分配角色权限成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.roleFunc?.fetchRoleList({  pageSize: pageSize });
          }, 500);
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
      props?.roleFunc?.detailsRole({ id: data?.id })
      .then(res => {
        setInitFromValue({
          'id': data?.id,
          'tenancyId': data?.tenancyId,
          'name': data?.name,
          'enable': data?.enable,
          'description': data?.description,
          'permissionId': res?.permission?.map(m=>m.id)
        });
        onOpenDarw(1);
      });
    }
  }, {
    name: '角色详情',
    permission: 'role.details',
    click: (data) => {
      navigate(`/control/role/details?id=${data?.id}`);
      // props?.roleFunc.detailsRole({id:data?.id})
      //   .then(res=>{
      //     console.log(res);
      //   });
    }
  }, {
    name: '分配角色权限',
    permission: 'role.assignpermission',
    click: (data) => {
      props?.roleFunc?.detailsRole({ id: data?.id })
        .then(res => {
          setInitFromValue({
            'id': data?.id,
            'ids': res?.permission?.map(m => m?.id)
          });
          onOpenDarw(2);
        });
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
              setTimeout(() => {
                props?.roleFunc?.fetchRoleList({  pageSize: pageSize });
              }, 500);
            });
        }
      });
    }
  }];
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 100,
    key: 'tenancyId',
    render: (text)=>{
      let data = props?.tenancyList.find(f=>f.id == text);
      return <span>{data?.name}</span>;
    }
  },{
    title: '角色名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  }, {
    title: '角色状态',
    dataIndex: 'enable',
    width: 80,
    key: 'enable',
    render: (text, record) => {
      const mapStatus = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo.actions.includes('role.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
        unCheckedChildren="禁用" onChange={(e) => {
          props?.roleFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
            notification['success']({
              message: '修改成功',
              description: '修改角色状态成功'
            });
            props?.roleFunc?.fetchRoleList({pageSize: pageSize});
          });
        }} /> : mapStatus[text];
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
    width: 100,
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right',
     
    render: (record) => {
      return (<AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
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
        open={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
Index.propTypes = {
  roleFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  userInfo: PropTypes.object,
  role: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  role: state?.role,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    roleFunc: bindActionCreators(roleAuthAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  };
})(Index);