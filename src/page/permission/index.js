import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { permissionSearchFrom, permissionFrom,assignFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  Drawer, Switch, notification, Modal } from 'antd';
import { CloudSyncOutlined,  ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';
/* eslint-disable no-extra-semi */
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 权限 1修改权限, 2 分配权限
  const [initFromValue, setInitFromValue] = useState(null);
  const [permissionIds,setPermissionIds] = useState([]);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(200);
  let navigate = useNavigate();
  //获取账户列表
  useEffect(() => {
    props?.permissionFunc?.fetchPermissionList({ pageSize: pageSize, pageNo: page });
  }, []);
  // 分页对象
  const pagination = {
    total: props?.permission?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.permissionFunc?.fetchPermissionList({ pageNo: p, pageSize: size });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['200', '500', '1000'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      let list = props?.permission?.list;
      if (!list.some(f => f.value === '0')) {
        list.unshift({ label: '顶级权限', value: '0', children: [] });
      }
      let from = permissionFrom(list);
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
      setDrawType(type);
      setFromData(from);
      setShowDarw(true);
    }else if(type === 2){
      props?.commonFunc?.getRoleList()
        .then(res => {
          let from = assignFrom('分配角色', '角色', res,'id','select','');
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      data.parentId = data?.parentId.slice(-1)[0];
      props?.permissionFunc?.createPermission(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加权限成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.permissionFunc?.fetchPermissionList({ pageSize: pageSize });
          },500);
        });
    }else if(drawType === 1){
      data.parentId = data?.parentId.slice(-1)[0];
      data.id = initFromValue.id;
      props?.permissionFunc?.modifyPermission(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改权限成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.permissionFunc?.fetchPermissionList({ pageSize: pageSize });
          },500);
        });
    }else if(drawType === 2){
      props?.permissionFunc.assignPermission({...data,ids:permissionIds})
        .then(()=>{
          notification['success']({
            message: '分配成功',
            description: '分配权限成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.permissionFunc?.fetchPermissionList({ pageSize: pageSize });
          },500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.permissionFunc?.fetchPermissionList(e);
  };
  // 修改
  const list = [{
    name: '修改权限',
    permission: 'permission.modify',
    isAction: true,
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'code': data?.code,
        'parentId':  data?.parentId === '0' ? [data?.parentId]: [],
        'name': data?.name,
        'type': data?.type,
        'isSystem': data?.isSystem,
        'description': data?.description,
        'enable': data?.enable,
        'sort': data?.sort
      });
      onOpenDarw(1);
    }
  }, {
    name: '权限详情',
    permission: 'permission.details',
    click: (data) => {
      navigate(`/control/permission/details?id=${data?.id}&parentId=${data?.parentId}`);
    }
  },{
    name: '分配权限到角色',
    permission: 'permission.assignpermission',
    click: (data) => {
      setPermissionIds([data.id]);
      onOpenDarw(2);
    }
  }, {
    name: '删除权限',
    isAction: true,
    permission: 'permission.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除权限!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除权限用户的所有数关联权限也会删除!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.permissionFunc.deletePermission(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除权限成功'
              });
              setTimeout(()=>{
                props?.permissionFunc?.fetchPermissionList({  pageSize: pageSize });
              },500);
            });
        }
      });
    }
  }];

  const columns = [{
    title: '权限ID',
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
    title: '权限代码',
    dataIndex: 'code',
    key: 'code',
    width: 100,
  }, {
    title: '父级id',
    dataIndex: 'parentId',
    key: 'parentId',
    width: 100,
  }, {
    title: '权限名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  }, {
    title: '权限类型',
    dataIndex: 'type',
    key: 'type',
    width: 80,
    render: (text) => {
      let typeMap = {
        1: '菜单',
        2: '菜单条目',
        3: '功能'
      };
      return typeMap[text];
    }
  }, {
    title: '是否为系统权限',
    dataIndex: 'isSystem',
    key: 'isSystem',
    width: 60,
    render: (text) => {
      let sysMap = {
        1: '是',
        0: '否'
      };
      return sysMap[text];
    }
  }, {
    title: '说明',
    dataIndex: 'description',
    width: 150,
    key: 'description'
  }, {
    title: '是否启用',
    dataIndex: 'enable',
    width: 80,
    key: 'enable',
    // eslint-disable-next-line
    render: (text, record) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo?.actions.includes('permission.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
        unCheckedChildren="禁用" onChange={(e) => {
          props?.permissionFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
            notification['success']({
              message: '修改成功',
              description: '修改权限状态成功'
            });
            props?.permissionFunc?.fetchPermissionList({pageSize: pageSize});
          });
        }} /> : statusMap[text];
    }
  }, {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
    key: 'sort'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    width: 150,
    key: 'action',
    fixed: 'right',
    // eslint-disable-next-line
    render: (record) => {
      return (<AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
    }
  }];
  const mapTitle = {
    0: '添加权限',
    1: '修改权限'
  };
  // rowSelection objects indicates the need for row selection
const rowSelection = {
  // onChange: (selectedRowKeys, selectedRows) => {
  //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  // },
  onSelect: (record, selected, selectedRows) => {
    let ids = selectedRows.map(m=>m.key);
    setPermissionIds(ids);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    let ids = changeRows.map(m=>m.key);
    setPermissionIds(ids);
  },
};
  return (
    <div className="list">
      {head('权限列表')}
      <BaseTable formObj={permissionSearchFrom} querySubmit={querySubmit} dataSource={props?.permission?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加权限', permission: 'permission.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } },{ name: '分配权限到角色', permission: 'permission.assignpermission', rest:{disabled: permissionIds?.length === 0 ? true : false},type: 'primary', icon: <CloudSyncOutlined />, click: () => {if(permissionIds?.length === 0) {notification.error({message: '权限不能为空,请先选择权限'}); return;} ;setInitFromValue(null); onOpenDarw(2); } }]} rowSelection={{...rowSelection,checkStrictly:false}}/>
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
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  commonFunc: PropTypes.object,
  permission: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  permission: state?.permission,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    permissionFunc: bindActionCreators(permissionAction, dispatch),
    commonFunc: bindActionCreators(commonAction,dispatch)
  };
})(Index);