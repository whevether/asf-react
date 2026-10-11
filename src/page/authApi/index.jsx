import React, { Fragment, useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import PropTypes from 'prop-types';
import * as apiAuthAction from 'store/actions/authApi';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, notification, Modal, Descriptions, Tag } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BetaSchemaForm, DrawerForm, ProTable } from '@ant-design/pro-components';
import { AuthControl } from 'components/index';
import { findParentIds } from 'utils/help';

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);
  const [permissionTree, setPermissionTree] = useState([]);

  head('api列表');

  const isSuperAdmin = props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1';
  const yesNoOptions = [{ label: '否', value: 0 }, { label: '是', value: 1 }];
  const httpMethodOptions = [
    { label: 'get', value: 'get' },
    { label: 'post', value: 'post' },
    { label: 'put', value: 'put' },
    { label: 'delete', value: 'delete' },
  ];

  const onOpenDarw = (type, data) => {
    if (type === 0 || type === 1) {
      props?.permissionFunc?.fetchPermissionList({ pageSize: 9999 })
        .then(res => {
          setDrawType(type);
          const permList = Array.isArray(res) ? res : (res?.data || []);
          setPermissionTree(permList);
          if (data) {
            let initArr = findParentIds(permList, data?.permission?.parentId).filter(f => data?.permission?.parentId !== f && data?.permission?.id !== f).map(m => m);
            if (data?.permission?.parentId !== '0') initArr.push(data?.permission?.parentId);
            initArr.push(data?.permission?.id);
            setInitFromValue({
              id: data?.id,
              tenancyId: data?.tenancyId,
              name: data?.name,
              path: data?.path,
              httpMethods: data?.httpMethods?.split(','),
              permissionId: initArr,
              status: data?.status,
              type: data?.type,
              isSystem: data?.isSystem,
              description: data?.description,
              isLogger: data?.isLogger
            });
          } else {
            setInitFromValue(null);
          }
          setShowDarw(true);
        });
    }
  };

  const onFinish = async (data) => {
    if (drawType === 0) {
      data.permissionId = data?.permissionId?.slice(-1)[0];
      data.httpMethods = data?.httpMethods?.join(',');
      await props?.apiAuthFunc?.createApi(data);
      notification.success({ message: '添加成功', description: '添加api成功' });
      actionRef.current?.reload();
    } else if (drawType === 1) {
      data.permissionId = data?.permissionId?.[data?.permissionId?.length - 1];
      data.httpMethods = data?.httpMethods?.join(',');
      data.id = initFromValue.id;
      await props?.apiAuthFunc?.modifyApi(data);
      notification.success({ message: '修改成功', description: '修改api成功' });
      actionRef.current?.reload();
    }
  };

  const formColumns = [
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
      title: 'api所属权限',
      dataIndex: 'permissionId',
      valueType: 'cascader',
      fieldProps: { placeholder: '请选择api所属权限', allowClear: true, changeOnSelect: true, options: permissionTree },
      formItemProps: { rules: [{ required: true, message: 'api所属权限不能为空' }] },
    },
    {
      title: 'api名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: { placeholder: '请输入api名称', allowClear: true },
      formItemProps: { rules: [{ required: true, message: 'api名称不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的api名称或最多输入50个字符的api名称' }] },
    },
    {
      title: 'api地址',
      dataIndex: 'path',
      valueType: 'text',
      fieldProps: { placeholder: '请输入api地址', allowClear: true },
      formItemProps: { rules: [{ required: true, message: 'api地址不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入1个字符的api地址或最多输入50个字符的api地址' }] },
    },
    {
      title: 'api状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择api状态',
        allowClear: true,
        options: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }],
      },
    },
    {
      title: '是否记录日志',
      dataIndex: 'isLogger',
      valueType: 'select',
      fieldProps: { placeholder: '请选择是否记录日志', allowClear: true, options: yesNoOptions },
    },
    {
      title: '是否为系统权限',
      dataIndex: 'isSystem',
      valueType: 'select',
      fieldProps: { placeholder: '请选择是否为系统权限', allowClear: true, options: yesNoOptions },
    },
    {
      title: 'api类型',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择api类型',
        allowClear: true,
        options: [{ label: '开放api', value: 1 }, { label: '授权api', value: 2 }],
      },
      formItemProps: { rules: [{ required: true, message: 'api类型不能为空' }] },
    },
    {
      title: 'api请求方法',
      dataIndex: 'httpMethods',
      valueType: 'select',
      fieldProps: { mode: 'multiple', placeholder: '请选择api请求方法', allowClear: true, options: httpMethodOptions },
      formItemProps: { rules: [{ required: true, message: 'api请求方法不能为空' }] },
    },
    {
      title: 'api说明',
      dataIndex: 'description',
      valueType: 'textarea',
      fieldProps: { placeholder: '请输入api说明' },
      formItemProps: { rules: [{ type: 'string', min: 1, max: 500, message: '最少输入1个字符的api说明或最多输入500个字符的api说明' }] },
    },
  ];

  const list = [{
    name: '修改api',
    permission: 'api.modify',
    isAction: true,
    click: (data) => onOpenDarw(1, data)
  }, {
    name: 'api详情',
    permission: 'api.details',
    click: (data) => {
      const mapType = { 1: '菜单目录', 2: '菜单条目', 3: '功能' };
      Modal.confirm({
        width: '100%',
        content: (
          <Fragment>
            <Descriptions title="授权api详情" bordered style={{ marginBottom: '10px' }} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="api名称">{data?.name}</Descriptions.Item>
              <Descriptions.Item label="请求方法"><Tag color="success">{data?.httpMethods}</Tag></Descriptions.Item>
              <Descriptions.Item label="api状态">{data?.status === 0 ? <Tag color="red">禁用</Tag> : <Tag color="success">启用</Tag>}</Descriptions.Item>
              <Descriptions.Item label="api类型">{data?.type === 1 ? '公共api' : '授权api'}</Descriptions.Item>
              <Descriptions.Item label="是否为系统api">{data?.isSystem === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="是否记录日志">{data?.isLogger === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="api地址">{data?.path}</Descriptions.Item>
              <Descriptions.Item label="api说明">{data?.description}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{timeToDate(data?.createTime, 'YYYY-MM-DD  HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="权限详情" bordered style={{ marginBottom: '10px' }} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="权限名称">{data?.permission?.name}</Descriptions.Item>
              <Descriptions.Item label="权限类型">{mapType[data?.permission?.type]}</Descriptions.Item>
              <Descriptions.Item label="排序">{data?.permission?.sort}</Descriptions.Item>
              <Descriptions.Item label="是否为系统权限">{data?.permission?.isSystem === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="权限code">{data?.permission?.code}</Descriptions.Item>
              <Descriptions.Item label="是否启用">{data?.permission?.enable === 1 ? '启用' : <Tag color="red">禁用</Tag>}</Descriptions.Item>
            </Descriptions>
          </Fragment>
        )
      });
    }
  }, {
    name: '删除api',
    permission: 'api.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除api!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除api之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.apiAuthFunc?.deleteApi(data?.id)
            .then(() => {
              notification.success({ message: '删除成功', description: '删除api成功' });
              actionRef.current?.reload();
            });
        }
      });
    }
  }];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', fixed: 'left', width: 100, search: false },
    {
      title: '所属租户',
      dataIndex: 'tenancyId',
      width: 100,
      key: 'tenancyId',
      search: false,
      render: (text) => {
        let d = props?.tenancyList?.find(f => f.id == text);
        return <span>{d?.name}</span>;
      }
    },
    { title: 'api名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '请求方法', dataIndex: 'httpMethods', width: 70, key: 'httpMethods', search: false },
    {
      title: 'api状态',
      dataIndex: 'status',
      width: 80,
      key: 'status',
      valueType: 'select',
      valueEnum: { 0: { text: '禁用' }, 1: { text: '启用' } },
      render: (text, record) => {
        const mapStatus = { 0: '禁用', 1: '启用' };
        return props?.userInfo?.actions?.includes('api.modifystatus') ? (
          <Switch
            checked={Boolean(text)}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={(e) => {
              props?.apiAuthFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
                notification.success({ message: '修改成功', description: '修改api状态成功' });
                actionRef.current?.reload();
              });
            }}
          />
        ) : mapStatus[text];
      }
    },
    {
      title: 'api类型',
      dataIndex: 'type',
      width: 80,
      key: 'type',
      search: false,
      render: (text) => ({ 1: '公共api', 2: '授权api' }[text])
    },
    {
      title: '是否为系统api',
      dataIndex: 'isSystem',
      width: 60,
      key: 'isSystem',
      search: false,
      render: (text) => ({ 0: '否', 1: '是' }[text])
    },
    {
      title: '是否记录日志',
      dataIndex: 'isLogger',
      width: 60,
      key: 'isLogger',
      search: false,
      render: (text) => ({ 0: '否', 1: '是' }[text])
    },
    { title: 'api地址', dataIndex: 'path', key: 'path', width: 100 },
    { title: 'api所属权限id', dataIndex: 'permissionId', key: 'permissionId', width: 100, hideInTable: true },
    { title: '权限id', dataIndex: 'permissionId', key: 'permissionIdShow', width: 100, search: false },
    { title: '说明', dataIndex: 'description', width: 150, key: 'description', search: false },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 100,
      search: false,
      render: (text) => timeToDate(text, 'YYYY-MM-DD  HH:mm:ss')
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={{ ...record, key: record.id }} type="menu" />
    }
  ];

  const mapTitle = { 0: '添加api', 1: '修改api' };

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          const { current, pageSize, ...rest } = params || {};
          const res = await props?.apiAuthFunc?.fetchApiList({ pageNo: current, pageSize, ...rest });
          return { data: res?.data ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl
            key="add"
            userInfo={props?.userInfo}
            list={[{ name: '添加api', permission: 'api.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]}
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
  apiAuthFunc: PropTypes.object,
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  authApi: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};

export default connect(
  state => ({ userInfo: state?.common?.data, authApi: state?.authApi, tenancyList: state?.common?.tenancyList }),
  dispatch => ({
    apiAuthFunc: bindActionCreators(apiAuthAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  })
)(Index);
