import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { tenancyFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as tenancyAction from 'store/actions/tenancy';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProTable } from '@ant-design/pro-components';
import { Descriptions, Drawer, Modal, notification, Tag } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProTableCompat, AuthControl, BaseFrom } from 'components/index';

const accountColumns = [
  { title: '账户ID', dataIndex: 'id', key: 'id', width: 80 },
  {
    title: '账户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
    render: (_, r) => r.avatar ? <img src={decodeURIComponent(r.avatar)} alt="" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : '-',
  },
  { title: '账户昵称', dataIndex: 'name', width: 100, key: 'name' },
  { title: '账户名', dataIndex: 'username', width: 100, key: 'username' },
  { title: '手机号码', dataIndex: 'telPhone', width: 120, key: 'telPhone' },
  { title: '邮箱', dataIndex: 'email', width: 140, key: 'email' },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 60,
    key: 'sex',
    render: (_, r) => ({ 0: '未知', 1: '男', 2: '女' }[r.sex] ?? '-'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    key: 'status',
    render: (_, r) => (r.status === 0 ? '禁用' : '启用'),
  },
  { title: '登录ip', dataIndex: 'loginIp', width: 120, key: 'loginIp' },
  { title: '登录地址', dataIndex: 'loginLocation', width: 120, key: 'loginLocation' },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    key: 'createTime',
    render: (_, r) => timeToDate(r.createTime, 'YYYY-MM-DD HH:mm:ss'),
  },
];

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('租户列表');

  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      setDrawType(type);
      setFromData(tenancyFrom());
      setShowDarw(true);
    }
  };

  const onFinish = (data) => {
    if (drawType === 0) {
      props?.tenancyFunc?.createTenancy(data).then(() => {
        notification.success({ message: '添加成功', description: '添加租户成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.tenancyFunc?.modifyTenancy(data).then(() => {
        notification.success({ message: '修改成功', description: '修改租户成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    }
  };

  const list = [
    {
      name: '租户详情',
      permission: 'tenancy.details',
      click: (data) => {
        props?.tenancyFunc?.detailsTenancy({ id: data?.id }).then((res) => {
          Modal.info({
            width: '90%',
            content: (
              <>
                <Descriptions title="租户详情" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="租户名称">{res?.name}</Descriptions.Item>
                  <Descriptions.Item label="排序">{res?.sort}</Descriptions.Item>
                  <Descriptions.Item label="是否启用">{res?.status === 0 ? <Tag color="red">禁用</Tag> : <Tag color="success">启用</Tag>}</Descriptions.Item>
                  <Descriptions.Item label="租户级别">{res?.level}</Descriptions.Item>
                  <Descriptions.Item label="创建时间">{timeToDate(res?.createTime, 'YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                </Descriptions>
                <h3 style={{ fontWeight: 600 }}>租户下属账户</h3>
                <ProTableCompat dataSource={res?.accounts} columns={accountColumns} />
              </>
            ),
          });
        });
      },
    },
    {
      name: '修改租户',
      permission: 'tenancy.modify',
      click: (data) => {
        setInitFromValue({ id: data?.id, name: data?.name, sort: data?.sort, level: data?.level, status: data?.status });
        onOpenDarw(1);
      },
    },
    {
      name: '删除租户',
      isAction: true,
      permission: 'tenancy.delete',
      click: (data) => {
        Modal.confirm({
          title: '确认删除租户',
          icon: <ExclamationCircleOutlined />,
          content: '删除租户之后将无法恢复',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            props?.tenancyFunc?.deleteTenancy({ id: data.id, status: 1 }).then(() => {
              notification.success({ message: '删除成功', description: '删除租户成功' });
              actionRef.current?.reload();
            });
          },
        });
      },
    },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', fixed: 'left', width: 80, search: false },
    { title: '租户名', dataIndex: 'name', key: 'name', width: 120 },
    { title: '排序', dataIndex: 'sort', key: 'sort', width: 80, search: false },
    { title: '优先级', dataIndex: 'level', key: 'level', width: 80, search: false },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      search: false,
      render: (_, r) => (r.status === 0 ? '禁用' : '启用'),
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
      fixed: 'right',
      width: 150,
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />,
    },
  ];

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          const { current, pageSize, ...rest } = params || {};
          const res = await props?.tenancyFunc?.fetchTenancyList({ pageNo: current, pageSize, ...rest });
          return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 968 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl key="add" userInfo={props?.userInfo} list={[{ name: '添加租户', permission: 'tenancy.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} type="button" />,
        ]}
      />
      <Drawer title={drawType === 0 ? '添加租户' : '修改租户'} width={720} open={showDarw} onClose={() => setShowDarw(false)}>
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};

Index.propTypes = {
  tenancyFunc: PropTypes.object,
  userInfo: PropTypes.object,
  tenancy: PropTypes.object,
};

export default connect(
  (state) => ({ userInfo: state?.common?.data, tenancy: state?.tenancy }),
  (dispatch) => ({ tenancyFunc: bindActionCreators(tenancyAction, dispatch) })
)(Index);
