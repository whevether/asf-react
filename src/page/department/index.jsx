import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { departmentFrom, assignFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as departmentAction from 'store/actions/department';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProTable } from '@ant-design/pro-components';
import { Drawer, Switch, notification, Modal } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';

const Index = (props) => {
  const actionRef = useRef();
  const navigate = useNavigate();
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('部门列表');

  const onOpenDarw = (type) => {
    if (type === 0) {
      props?.commonFunc?.getDepartmentList().then((res) => {
        setDrawType(0);
        if (!res?.some((f) => f.value === 0)) res?.unshift({ label: '顶级部门', value: '0', children: [] });
        let from = departmentFrom(res ?? []);
        if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
          from.unshift({
            title: '租户',
            fromType: 'select',
            name: 'tenancyId',
            selOption: props?.tenancyList,
            placeholder: '请选择租户',
            rules: [{ required: true, message: '租户不能为空' }],
            options: { allowClear: true },
          });
        }
        setFromData(from);
        setShowDarw(true);
      });
    } else if (type === 1) {
      Promise.all([props?.commonFunc?.getRoleList(), props?.commonFunc?.getDepartmentList()]).then(([roles, deps]) => {
        setDrawType(1);
        if (!deps?.some((f) => f.value === 0)) deps?.unshift({ label: '顶级部门', value: '0', children: [] });
        let from = departmentFrom(deps ?? [], roles ?? []);
        if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
          from.unshift({
            title: '租户',
            fromType: 'select',
            name: 'tenancyId',
            selOption: props?.tenancyList,
            placeholder: '请选择租户',
            rules: [{ required: true, message: '租户不能为空' }],
            options: { allowClear: true },
          });
        }
        setFromData(from);
        setShowDarw(true);
      });
    } else if (type === 2) {
      props?.commonFunc?.getRoleList().then((res) => {
        setDrawType(2);
        setFromData(assignFrom('分配角色', '角色', res ?? []));
        setShowDarw(true);
      });
    }
  };

  const onFinish = (data) => {
    if (drawType === 0) {
      props?.departmentFunc?.createDepartment(data).then(() => {
        notification.success({ message: '添加成功', description: '添加部门成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.departmentFunc?.modifyDepartment(data).then(() => {
        notification.success({ message: '修改成功', description: '修改部门成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    } else if (drawType === 2) {
      data.id = initFromValue.id;
      props?.departmentFunc?.assignRole(data).then(() => {
        notification.success({ message: '分配成功', description: '分配部门角色成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    }
  };

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
          return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 968 }}
        pagination={{ pageSize: 200, pageSizeOptions: ['200', '500', '1000'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl key="add" userInfo={props?.userInfo} list={[{ name: '添加部门', permission: 'department.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} type="button" />,
        ]}
      />
      <Drawer title={mapTitle[drawType]} width={720} open={showDarw} onClose={() => setShowDarw(false)}>
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
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
