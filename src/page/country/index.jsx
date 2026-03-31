import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { countryFrom } from 'utils/json';
import { timeToDate } from 'utils/storage';
import PropTypes from 'prop-types';
import * as countryAction from 'store/actions/country';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProTable } from '@ant-design/pro-components';
import { Modal, notification, Drawer, Tag } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AuthControl, ProForm } from 'components/index';

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(countryFrom());
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('国家列表');

  const onOpenDarw = (type) => {
    setDrawType(type);
    setFromData(countryFrom());
    setShowDarw(true);
  };

  const onFinish = (data) => {
    if (drawType === 0) {
      props?.countryFunc?.createCountry(data).then(() => {
        notification.success({ message: '添加成功', description: '添加国家成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.countryFunc?.modifyCountry(data).then(() => {
        notification.success({ message: '修改成功', description: '修改国家成功' });
        setShowDarw(false);
        actionRef.current?.reload();
      });
    }
  };

  const list = [
    {
      name: '修改国家',
      permission: 'country.modify',
      click: (data) => {
        setInitFromValue(data);
        onOpenDarw(1);
      },
    },
    {
      name: '删除国家',
      isAction: true,
      permission: 'country.delete.[0-9]{1,100}',
      click: (data) => {
        Modal.confirm({
          title: '确认删除国家',
          icon: <ExclamationCircleOutlined />,
          content: '删除国家之后将无法恢复',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            props?.countryFunc?.deleteCountry(data.id).then(() => {
              notification.success({ message: '删除成功', description: '删除国家成功' });
              actionRef.current?.reload();
            });
          },
        });
      },
    },
  ];

  const columns = [
    { title: '国家code', dataIndex: 'languageCode', key: 'languageCode', width: 100, search: false },
    { title: '国家名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '币种代码', dataIndex: 'currencyType', key: 'currencyType', width: 100, search: false },
    {
      title: '目标国与RMB之间汇率',
      dataIndex: 'ratio',
      key: 'ratio',
      width: 180,
      search: false,
      render: (_, r) => `1: ${r.ratio}`,
    },
    {
      title: '目标国提现手续费利率',
      dataIndex: 'withdrawalRatio',
      key: 'withdrawalRatio',
      width: 180,
      search: false,
      render: (_, r) => `${r.withdrawalRatio}%`,
    },
    {
      title: '国家状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      search: false,
      render: (_, r) => {
        const statusMap = { 0: '禁用', 1: '启用' };
        const colorMap = { 0: 'error', 1: 'success' };
        return <Tag color={colorMap[r.status]}>{statusMap[r.status]}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
      key: 'createTime',
      search: false,
      render: (_, r) => timeToDate(r.createTime, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 160,
      key: 'updateTime',
      search: false,
      render: (_, r) => timeToDate(r.updateTime, 'YYYY-MM-DD HH:mm:ss'),
    },
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
          const res = await props?.countryFunc?.fetchCountryList({ pageNo: current, pageSize, ...rest });
          return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl
            key="add"
            userInfo={props?.userInfo}
            list={[{ name: '添加国家', permission: 'country.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]}
            type="button"
          />,
        ]}
      />
      <Drawer
        title={drawType === 0 ? '添加国家' : '修改国家'}
        width={720}
        open={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <ProForm list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};

Index.propTypes = {
  countryFunc: PropTypes.object,
  userInfo: PropTypes.object,
  country: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
};

export default connect(
  (state) => ({
    userInfo: state?.common?.data,
    country: state?.country,
    tenancyList: state?.common?.tenancyList,
  }),
  (dispatch) => ({ countryFunc: bindActionCreators(countryAction, dispatch) })
)(Index);
