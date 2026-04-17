import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { translateFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as translateAction from 'store/actions/translate';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProTable } from '@ant-design/pro-components';
import { Drawer, Modal, notification } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AuthControl, ProForm } from 'components/index';

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('多语言列表');

  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      setDrawType(type);
      let from = translateFrom();
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
      from.unshift({
        title: '国家',
        fromType: 'select',
        name: 'countryCode',
        selOption: props?.countryList?.map((m) => ({ ...m, id: m.languageCode })) ?? [],
        placeholder: '请选择国家',
        rules: [{ required: true, message: '国家不能为空' }],
        options: { allowClear: true },
      });
      setFromData(from);
      setShowDarw(true);
    }
  };

  const onFinish = (data) => {
    if (drawType === 0) {
      props?.translateFunc?.createTranslate(data).then(() => {
        notification.success({ message: '添加成功', description: '添加多语言成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.translateFunc?.modifyTranslate(data).then(() => {
        notification.success({ message: '修改成功', description: '修改多语言成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    }
  };

  const list = [
    {
      name: '修改多语言',
      permission: 'translate.modify',
      click: (data) => {
        setInitFromValue({ ...data, key: data.keys });
        onOpenDarw(1);
      },
    },
    {
      name: '删除多语言',
      isAction: true,
      permission: 'translate.delete.[0-9]{1,100}',
      click: (data) => {
        Modal.confirm({
          title: '确认删除多语言',
          icon: <ExclamationCircleOutlined />,
          content: '删除多语言之后将无法恢复',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            props?.translateFunc?.deleteTranslate(data.id).then(() => {
              notification.success({ message: '删除成功', description: '删除多语言成功' });
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
    { title: '语种代码', dataIndex: 'countryCode', key: 'countryCode', width: 100, search: false },
    {
      title: '是否管理后台',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 100,
      search: false,
      render: (_, r) => (r.isAdmin === 1 ? '是' : '否'),
    },
    { title: '多语言名', dataIndex: 'name', key: 'name', width: 120 },
    { title: '键', dataIndex: 'keys', key: 'keys', width: 120, search: false },
    { title: '值', dataIndex: 'value', key: 'value', width: 150, search: false },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
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
          const res = await props?.translateFunc?.fetchTranslateList({ pageNo: current, pageSize, ...rest });
          return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 968 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl key="add" userInfo={props?.userInfo} list={[{ name: '添加多语言', permission: 'translate.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} type="button" />,
        ]}
      />
      <Drawer title={drawType === 0 ? '添加多语言' : '修改多语言'} size={720} open={showDarw} onClose={() => setShowDarw(false)}>
        <ProForm list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};

Index.propTypes = {
  translateFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  userInfo: PropTypes.object,
  translate: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  countryList: PropTypes.arrayOf(Object),
};

export default connect(
  (state) => ({
    userInfo: state?.common?.data,
    translate: state?.translate,
    tenancyList: state?.common?.tenancyList,
    countryList: state?.common?.countryList,
  }),
  (dispatch) => ({
    translateFunc: bindActionCreators(translateAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch),
  })
)(Index);
