import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { postFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as postAction from 'store/actions/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProTable } from '@ant-design/pro-components';
import { Descriptions, Drawer, Modal, notification, Tag } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AuthControl, ProForm } from 'components/index';

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('岗位列表');

  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      setDrawType(type);
      let from = postFrom();
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
    }
  };

  const onFinish = (data) => {
    if (drawType === 0) {
      props?.postFunc?.createPost(data).then(() => {
        notification.success({ message: '添加成功', description: '添加岗位成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.postFunc?.modifyPost(data).then(() => {
        notification.success({ message: '修改成功', description: '修改岗位成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    }
  };

  const list = [
    {
      name: '岗位详情',
      permission: 'post.details',
      click: (data) => {
        Modal.info({
          width: '80%',
          content: (
            <Descriptions title="岗位详情" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="岗位名称">{data?.name}</Descriptions.Item>
              <Descriptions.Item label="排序">{data?.sort}</Descriptions.Item>
              <Descriptions.Item label="是否启用">{data?.enable === 0 ? <Tag color="red">禁用</Tag> : <Tag color="success">启用</Tag>}</Descriptions.Item>
              <Descriptions.Item label="岗位说明">{data?.description}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{timeToDate(data?.createTime, 'YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
          ),
        });
      },
    },
    {
      name: '修改岗位',
      permission: 'post.modify',
      click: (data) => {
        setInitFromValue({ id: data?.id, name: data?.name, sort: data?.sort, tenancyId: data?.tenancyId, description: data?.description, enable: data?.enable });
        onOpenDarw(1);
      },
    },
    {
      name: '删除岗位',
      isAction: true,
      permission: 'post.delete.[0-9]{1,100}',
      click: (data) => {
        Modal.confirm({
          title: '确认删除岗位',
          icon: <ExclamationCircleOutlined />,
          content: '删除岗位之后将无法恢复',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            props?.postFunc?.deletePost(data.id).then(() => {
              notification.success({ message: '删除成功', description: '删除岗位成功' });
              actionRef.current?.reload();
            });
          },
        });
      },
    },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80, search: false },
    {
      title: '所属租户',
      dataIndex: 'tenancyId',
      width: 100,
      key: 'tenancyId',
      search: false,
      render: (_, r) => props?.tenancyList?.find((f) => f.id == r.tenancyId)?.name ?? '-',
    },
    { title: '岗位名', dataIndex: 'name', key: 'name', width: 120 },
    { title: '排序', dataIndex: 'sort', key: 'sort', width: 80, search: false },
    { title: '岗位说明', dataIndex: 'description', key: 'description', width: 150, search: false },
    {
      title: '状态',
      dataIndex: 'enable',
      key: 'enable',
      width: 80,
      search: false,
      render: (_, r) => (r.enable === 0 ? <Tag color="red">禁用</Tag> : <Tag color="success">启用</Tag>),
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
      width: 150,
      fixed: 'right',
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
          const res = await props?.postFunc?.fetchPostList({ pageNo: current, pageSize, ...rest });
          return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 968 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl key="add" userInfo={props?.userInfo} list={[{ name: '添加岗位', permission: 'post.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} type="button" />,
        ]}
      />
      <Drawer title={drawType === 0 ? '添加岗位' : '修改岗位'} size={720} open={showDarw} onClose={() => setShowDarw(false)}>
        <ProForm list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};

Index.propTypes = {
  postFunc: PropTypes.object,
  userInfo: PropTypes.object,
  post: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
};

export default connect(
  (state) => ({ userInfo: state?.common?.data, post: state?.post, tenancyList: state?.common?.tenancyList }),
  (dispatch) => ({ postFunc: bindActionCreators(postAction, dispatch) })
)(Index);
