import React, { useEffect, useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BetaSchemaForm, DrawerForm, ProTable } from '@ant-design/pro-components';
import { Switch, notification, Modal } from 'antd';
import { CloudSyncOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AuthControl } from 'components/index';
import { findParentIds } from 'utils/help';
import { useNavigate } from 'react-router-dom';

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);
  const [permissionIds, setPermissionIds] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const navigate = useNavigate();

  head('权限列表');

  useEffect(() => {
    props?.permissionFunc?.fetchPermissionList({ pageSize: 200, pageNo: 1 });
  }, []);

  const onAddTree = () => {
    let list = props?.permission?.list || [];
    if (!list.some(f => f.value === '0')) {
      list = [{ label: '顶级权限', value: '0', children: [] }, ...list];
    }
    return list;
  };

  const isSuperAdmin = props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1';

  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      setDrawType(type);
      setShowDarw(true);
    } else if (type === 2) {
      props?.commonFunc?.getRoleList().then((res) => {
        setRoleOptions((res || []).map((item) => ({ label: item.name, value: item.id })));
        setDrawType(type);
        setShowDarw(true);
      });
    }
  };

  const onFinish = async (data) => {
    if (drawType === 0) {
      data.parentId = data?.parentId?.slice(-1)[0];
      await props?.permissionFunc?.createPermission(data);
      notification.success({ message: '添加成功', description: '添加权限成功' });
      props?.permissionFunc?.fetchPermissionList({ pageSize: 200 });
      actionRef.current?.reload();
    } else if (drawType === 1) {
      data.parentId = data?.parentId?.[data?.parentId?.length - 2];
      data.id = initFromValue.id;
      await props?.permissionFunc?.modifyPermission(data);
      notification.success({ message: '修改成功', description: '修改权限成功' });
      props?.permissionFunc?.fetchPermissionList({ pageSize: 200 });
      actionRef.current?.reload();
    } else if (drawType === 2) {
      await props?.permissionFunc?.assignPermission({ ...data, ids: permissionIds });
      notification.success({ message: '分配成功', description: '分配权限成功' });
      props?.permissionFunc?.fetchPermissionList({ pageSize: 200 });
      actionRef.current?.reload();
    }
  };

  const yesNoOptions = [{ label: '否', value: 0 }, { label: '是', value: 1 }];
  const formColumns = drawType === 2
    ? [{
      title: '分配角色',
      dataIndex: 'id',
      valueType: 'select',
      fieldProps: { placeholder: '请选择角色', allowClear: true, options: roleOptions },
      formItemProps: { rules: [{ required: true, message: '角色不能为空' }] },
    }]
    : [
      ...(isSuperAdmin ? [{
        title: '租户',
        dataIndex: 'tenancyId',
        valueType: 'select',
        fieldProps: {
          placeholder: '请选择租户',
          allowClear: true,
          options: (props?.tenancyList || []).map((item) => ({ label: item.name, value: item.id })),
        },
        formItemProps: { rules: [{ required: true, message: '租户不能为空' }] },
      }] : []),
      {
        title: '父级权限',
        dataIndex: 'parentId',
        valueType: 'cascader',
        fieldProps: { placeholder: '父级权限', allowClear: true, changeOnSelect: true, options: onAddTree() },
        formItemProps: { rules: [{ required: true, message: '父级权限不能为空' }] },
      },
      {
        title: '权限代码(页面路径,不包含域名)',
        dataIndex: 'code',
        valueType: 'text',
        fieldProps: { placeholder: '请输入权限代码(页面路径)', allowClear: true },
        formItemProps: { rules: [{ required: true, message: '权限类型不能为空' }, { type: 'string', min: 1, max: 50, message: '最少输入1个字符的权限代码(页面路径)或最多输入50个字符的权限代码(页面路径)' }] },
      },
      {
        title: '权限名称',
        dataIndex: 'name',
        valueType: 'text',
        fieldProps: { placeholder: '请输入权限名称', allowClear: true },
        formItemProps: { rules: [{ required: true, message: '权限类型不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限名或最多输入50个字符的权限名称' }] },
      },
      {
        title: '权限说明',
        dataIndex: 'description',
        valueType: 'text',
        fieldProps: { placeholder: '请输入权限说明', allowClear: true },
        formItemProps: { rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限说明或最多输入50个字符的权限说明' }] },
      },
      {
        title: '权限类型',
        dataIndex: 'type',
        valueType: 'select',
        fieldProps: {
          placeholder: '请选择权限类型',
          allowClear: true,
          options: [{ label: '菜单', value: 1 }, { label: '菜单条目', value: 2 }, { label: '功能', value: 3 }],
        },
        formItemProps: { rules: [{ required: true, message: '权限类型不能为空' }] },
      },
      {
        title: '是否为系统权限',
        dataIndex: 'isSystem',
        valueType: 'select',
        fieldProps: { placeholder: '请选择是否为系统权限', allowClear: true, options: yesNoOptions },
      },
      {
        title: '排序',
        dataIndex: 'sort',
        valueType: 'digit',
        fieldProps: { placeholder: '请输入排序', stringMode: true, style: { width: '100%' } },
      },
      {
        title: '是否启用',
        dataIndex: 'enable',
        valueType: 'select',
        fieldProps: { placeholder: '请选择是否启用', allowClear: true, options: yesNoOptions },
      },
    ];

  const list = [{
    name: '修改权限',
    permission: 'permission.modify',
    isAction: true,
    click: (data) => {
      let initArr = findParentIds(onAddTree(), data?.parentId).filter(f => data?.parentId !== f && data?.key !== f).map(m => m);
      initArr.push(data?.parentId);
      if (data?.parentId !== '0') initArr.push(data?.key);
      setInitFromValue({
        id: data?.id,
        tenancyId: data?.tenancyId,
        code: data?.code,
        parentId: initArr,
        name: data?.name,
        type: data?.type,
        isSystem: data?.isSystem,
        description: data?.description,
        enable: data?.enable,
        sort: data?.sort
      });
      onOpenDarw(1);
    }
  }, {
    name: '权限详情',
    permission: 'permission.details',
    click: (data) => navigate(`/control/permission/details?id=${data?.id}&parentId=${data?.parentId}`)
  }, {
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
          props?.permissionFunc?.deletePermission(data?.id)
            .then(() => {
              notification.success({ message: '删除成功', description: '删除权限成功' });
              props?.permissionFunc?.fetchPermissionList({ pageSize: 200 });
              actionRef.current?.reload();
            });
        }
      });
    }
  }];

  const columns = [
    { title: '权限ID', dataIndex: 'id', key: 'id', fixed: 'left', width: 100, search: false },
    {
      title: '所属租户',
      dataIndex: 'tenancyId',
      width: 100,
      key: 'tenancyId',
      search: false,
      render: (text) => {
        let data = props?.tenancyList?.find(f => f.id == text);
        return <span>{data?.name}</span>;
      }
    },
    { title: '权限代码', dataIndex: 'code', key: 'code', width: 100 },
    { title: '父级id', dataIndex: 'parentId', key: 'parentId', width: 100, search: false },
    { title: '权限名称', dataIndex: 'name', key: 'name', width: 100 },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      valueType: 'select',
      valueEnum: { 1: { text: '菜单' }, 2: { text: '菜单条目' }, 3: { text: '功能' } }
    },
    {
      title: '是否为系统权限',
      dataIndex: 'isSystem',
      key: 'isSystem',
      width: 60,
      search: false,
      render: (text) => ({ 1: '是', 0: '否' }[text])
    },
    { title: '说明', dataIndex: 'description', width: 150, key: 'description', search: false },
    {
      title: '是否启用',
      dataIndex: 'enable',
      width: 80,
      key: 'enable',
      search: false,
      render: (text, record) => {
        let statusMap = { 0: '禁用', 1: '启用' };
        return props?.userInfo?.actions?.includes('permission.modifystatus') ? (
          <Switch
            checked={Boolean(text)}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={(e) => {
              props?.permissionFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
                notification.success({ message: '修改成功', description: '修改权限状态成功' });
                actionRef.current?.reload();
              });
            }}
          />
        ) : statusMap[text];
      }
    },
    { title: '排序', dataIndex: 'sort', width: 50, key: 'sort', search: false },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100,
      key: 'createTime',
      search: false,
      render: (text) => timeToDate(text, 'YYYY-MM-DD  HH:mm:ss')
    },
    {
      title: '操作',
      width: 150,
      key: 'action',
      fixed: 'right',
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={{ ...record, key: record.id }} type="menu" />
    }
  ];

  const mapTitle = { 0: '添加权限', 1: '修改权限' };

  const rowSelection = {
    checkStrictly: false,
    onSelect: (record, selected, selectedRows) => {
      setPermissionIds(selectedRows.map(m => m.id));
    },
    onSelectAll: (selected, selectedRows) => {
      setPermissionIds(selectedRows.map(m => m.id));
    }
  };

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          const { current, pageSize, ...rest } = params || {};
          const res = await props?.permissionFunc?.fetchPermissionList({ pageNo: current, pageSize, ...rest });
          return { data: res?.data ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{ pageSize: 200, pageSizeOptions: ['200', '500', '1000'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        rowSelection={rowSelection}
        toolBarRender={() => [
          <AuthControl
            key="add"
            userInfo={props?.userInfo}
            list={[{ name: '添加权限', permission: 'permission.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]}
            type="button"
          />,
          <AuthControl
            key="assign"
            userInfo={props?.userInfo}
            list={[{
              name: '分配权限到角色',
              permission: 'permission.assignpermission',
              rest: { disabled: permissionIds?.length === 0 },
              type: 'primary',
              icon: <CloudSyncOutlined />,
              click: () => {
                if (permissionIds?.length === 0) {
                  notification.error({ message: '权限不能为空,请先选择权限' });
                  return;
                }
                setInitFromValue(null);
                onOpenDarw(2);
              }
            }]}
            type="button"
          />
        ]}
      />
      <DrawerForm
        title={mapTitle[drawType]}
        open={showDarw}
        layout="vertical"
        initialValues={initFromValue || {}}
        drawerProps={{ width: 720, destroyOnHidden: true }}
        onOpenChange={setShowDarw}
        onFinish={async (values) => {
          await onFinish(values);
          return true;
        }}
        onReset={() => setShowDarw(false)}
        submitter={{ searchConfig: { submitText: '确定', resetText: '取消' } }}
      >
        <BetaSchemaForm layoutType="Embed" submitter={false} columns={formColumns} />
      </DrawerForm>
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

export default connect(
  state => ({ userInfo: state?.common?.data, permission: state?.permission, tenancyList: state?.common?.tenancyList }),
  dispatch => ({
    permissionFunc: bindActionCreators(permissionAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  })
)(Index);
