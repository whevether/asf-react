import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import PropTypes from 'prop-types';
import * as departmentAction from 'store/actions/department';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BetaSchemaForm, DrawerForm, ProTable } from '@ant-design/pro-components';
import { Switch, notification, Modal } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';

const Index = (props) => {
  const actionRef = useRef();
  const navigate = useNavigate();
  const [showDarw, setShowDarw] = useState(false);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);
  const [departmentTree, setDepartmentTree] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  head('部门列表');

  const isSuperAdmin = props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1';

  const withTopDepartment = (list) => {
    const deps = [...(list || [])];
    if (!deps.some((item) => item.value === 0)) deps.unshift({ label: '顶级部门', value: '0', children: [] });
    return deps;
  };

  const onOpenDarw = (type) => {
    if (type === 0) {
      props?.commonFunc?.getDepartmentList().then((res) => {
        setDrawType(0);
        setDepartmentTree(withTopDepartment(res));
        setRoleOptions([]);
        setShowDarw(true);
      });
    } else if (type === 1) {
      Promise.all([props?.commonFunc?.getRoleList(), props?.commonFunc?.getDepartmentList()]).then(([roles, deps]) => {
        setDrawType(1);
        setDepartmentTree(withTopDepartment(deps));
        setRoleOptions((roles ?? []).map((item) => ({ label: item.name, value: item.id })));
        setShowDarw(true);
      });
    } else if (type === 2) {
      props?.commonFunc?.getRoleList().then((res) => {
        setDrawType(2);
        setRoleOptions((res ?? []).map((item) => ({ label: item.name, value: item.id })));
        setShowDarw(true);
      });
    }
  };

  const onFinish = async (data) => {
    if (drawType === 0) {
      await props?.departmentFunc?.createDepartment(data);
      notification.success({ message: '添加成功', description: '添加部门成功' });
      actionRef.current?.reload();
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      await props?.departmentFunc?.modifyDepartment(data);
      notification.success({ message: '修改成功', description: '修改部门成功' });
      actionRef.current?.reload();
    } else if (drawType === 2) {
      data.id = initFromValue.id;
      await props?.departmentFunc?.assignRole(data);
      notification.success({ message: '分配成功', description: '分配部门角色成功' });
      actionRef.current?.reload();
    }
  };

  const tenancyColumn = {
    title: '租户',
    dataIndex: 'tenancyId',
    valueType: 'select',
    fieldProps: {
      placeholder: '请选择租户',
      allowClear: true,
      options: (props?.tenancyList || []).map((item) => ({ label: item.name, value: item.id })),
    },
    formItemProps: { rules: [{ required: true, message: '租户不能为空' }] },
  };
  const departmentColumns = [
    {
      title: '父级部门',
      dataIndex: 'departmentId',
      valueType: 'cascader',
      fieldProps: { placeholder: '请选择部门', allowClear: true, changeOnSelect: true, options: departmentTree },
      formItemProps: { rules: [{ required: true, message: '部门不能为空' }] },
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: { placeholder: '请输入部门名称', allowClear: true },
      formItemProps: { rules: [{ required: true, message: '部门名称不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的部门名称或最多输入50个字符的部门名称' }] },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
      fieldProps: { placeholder: '请输入租户排序', stringMode: true, style: { width: '100%' } },
    },
    {
      title: '部门状态',
      dataIndex: 'enable',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择部门状态',
        allowClear: true,
        options: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }],
      },
    },
  ];
  const formColumns = drawType === 2
    ? [{
      title: '分配角色',
      dataIndex: 'ids',
      valueType: 'select',
      fieldProps: { mode: 'multiple', placeholder: '请选择角色', allowClear: true, options: roleOptions },
      formItemProps: { rules: [{ required: true, message: '角色不能为空' }] },
    }]
    : [
      ...(isSuperAdmin ? [tenancyColumn] : []),
      ...(drawType === 1 ? [{
        title: '分配角色',
        dataIndex: 'roleIds',
        valueType: 'select',
        fieldProps: { mode: 'multiple', placeholder: '请选择角色', allowClear: true, options: roleOptions },
        formItemProps: { rules: [{ required: true, message: '角色不能为空' }] },
      }] : []),
      ...departmentColumns,
    ];

  const list = [
    {
      name: '修改部门',
      permission: 'department.modify',
      isAction: true,
      click: (data) => {
        props?.departmentFunc?.detailsDepartment({ id: data?.id }).then((res) => {
          setInitFromValue({
            id: res?.id,
            tenancyId: res?.tenancyId,
            name: res?.name,
            enable: res?.enable,
            sort: res?.sort,
            departmentId: res?.id,
            roleIds: res?.roles?.map((m) => m.id),
          });
          onOpenDarw(1);
        });
      },
    },
    {
      name: '部门详情',
      permission: 'department.details',
      click: (data) => navigate(`/control/department/details?id=${data?.id}`),
    },
    {
      name: '分配部门角色',
      permission: 'department.assign',
      click: (data) => {
        props?.departmentFunc?.detailsDepartment({ id: data?.id }).then((res) => {
          setInitFromValue({ id: res?.id, ids: res?.roles?.map((m) => m.id) });
          onOpenDarw(2);
        });
      },
    },
    {
      name: '删除部门',
      permission: 'department.delete.[0-9]{1,100}',
      click: (data) => {
        Modal.confirm({
          title: '确认删除部门',
          icon: <ExclamationCircleOutlined />,
          content: '删除部门之后将无法恢复,会影响其他用户，请谨慎操作',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            props?.departmentFunc?.deleteDepartment(data?.id).then(() => {
              notification.success({ message: '删除成功', description: '删除部门成功' });
              actionRef.current?.reload();
            });
          },
        });
      },
    },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', fixed: 'left', width: 80, search: false },
    { title: '部门名称', dataIndex: 'name', width: 120, key: 'name' },
    {
      title: '所属租户',
      dataIndex: 'tenancyId',
      width: 100,
      key: 'tenancyId',
      search: false,
      render: (_, r) => props?.tenancyList?.find((f) => f.id == r.tenancyId)?.name ?? '-',
    },
    {
      title: '部门状态',
      dataIndex: 'enable',
      width: 100,
      key: 'enable',
      search: false,
      render: (_, record) => {
        const mapStatus = { 0: '禁用', 1: '启用' };
        return props?.userInfo?.actions?.includes('department.modifystatus') ? (
          <Switch
            checked={Boolean(record.enable)}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={(e) => {
              props?.departmentFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
                notification.success({ message: '修改成功', description: '修改部门状态成功' });
                actionRef.current?.reload();
              });
            }}
          />
        ) : (
          mapStatus[record.enable]
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      search: false,
      render: (_, r) => timeToDate(r.createTime, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      fixed: 'right',
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />,
    },
  ];

  const mapTitle = { 0: '添加部门', 1: '修改部门', 2: '分配角色' };

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          const { current, pageSize, ...rest } = params || {};
          const res = await props?.departmentFunc?.fetchDepartmentList({ pageNo: current, pageSize, ...rest });
          return { data: res?.data ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 968 }}
        pagination={{ pageSize: 200, pageSizeOptions: ['200', '500', '1000'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl key="add" userInfo={props?.userInfo} list={[{ name: '添加部门', permission: 'department.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} type="button" />,
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
  departmentFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  userInfo: PropTypes.object,
  department: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
};

export default connect(
  (state) => ({ userInfo: state?.common?.data, department: state?.department, tenancyList: state?.common?.tenancyList }),
  (dispatch) => ({
    departmentFunc: bindActionCreators(departmentAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch),
  })
)(Index);
