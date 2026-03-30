import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import PropTypes from 'prop-types';
import * as audioAction from 'store/actions/audio';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProTable } from '@ant-design/pro-components';
import { notification } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import { AuthControl } from 'components/index';

const LogsList = (props) => {
  const actionRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  head('审计日志');

  const list = [
    {
      name: '删除日志',
      isAction: true,
      permission: 'audio.deletelog',
      click: (data) => {
        props?.audioFunc?.deleteAudio({ ids: [data.key] }).then(() => {
          notification.success({ message: '删除成功', description: '删除日志成功' });
          actionRef.current?.reload();
        });
      },
    },
  ];

  const columns = [
    { title: '日志ID', dataIndex: 'id', key: 'id', width: 80, search: false },
    {
      title: '日志类型',
      dataIndex: 'logType',
      key: 'logType',
      width: 100,
      valueType: 'select',
      valueEnum: { 1: { text: '登录日志' }, 2: { text: '操作日志' }, 3: { text: '错误日志' } },
      fieldProps: { placeholder: '请选择日志类型' },
    },
    { title: '账户名', dataIndex: 'account_name', key: 'account_name', width: 100 },
    { title: 'ip', dataIndex: 'clientIp', key: 'clientIp', width: 120, search: false },
    { title: 'ip地址', dataIndex: 'clientLocation', key: 'clientLocation', width: 120, search: false },
    { title: '请求地址', dataIndex: 'apiAddress', key: 'apiAddress', width: 150, search: false },
    {
      title: '请求数据',
      dataIndex: 'apiRequest',
      key: 'apiRequest',
      width: 150,
      search: false,
      render: (_, r) => (r.apiRequest ? <pre style={{ margin: 0, overflow: 'auto', maxHeight: 80 }}>{r.apiRequest}</pre> : '-'),
    },
    {
      title: '响应数据',
      dataIndex: 'apiResponse',
      key: 'apiResponse',
      width: 150,
      search: false,
      render: (_, r) => (r.apiResponse ? <pre style={{ margin: 0, overflow: 'auto', maxHeight: 80 }}>{r.apiResponse}</pre> : '-'),
    },
    { title: '说明', dataIndex: 'remark', width: 100, key: 'remark', search: false },
    { title: '日志主题', dataIndex: 'subject', width: 100, key: 'subject', search: false },
    {
      title: '创建时间',
      dataIndex: 'addTime',
      key: 'addTime',
      width: 160,
      search: false,
      render: (_, r) => timeToDate(r.addTime, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: 100,
      key: 'action',
      fixed: 'right',
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={{ ...record, key: record.id }} type="menu" />,
    },
  ];

  const request = async (params) => {
    const { current, pageSize, ...rest } = params || {};
    const res = await props?.audioFunc?.fetchAudioList({ pageNo: current, pageSize, ...rest });
    return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={request}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        rowSelection={rowSelection}
        tableAlertRender={false}
        toolBarRender={() => [
          <AuthControl
            key="batch"
            userInfo={props?.userInfo}
            list={[{
              name: '批量删除',
              permission: 'audio.deletelog',
              rest: { disabled: selectedRowKeys?.length === 0 },
              type: 'primary',
              icon: <CloudSyncOutlined />,
              click: () => {
                if (selectedRowKeys?.length === 0) {
                  notification.error({ message: '请先选择要删除的日志' });
                  return;
                }
                props?.audioFunc?.deleteAudio({ ids: selectedRowKeys }).then(() => {
                  setSelectedRowKeys([]);
                  notification.success({ message: '删除成功', description: '删除日志成功' });
                  actionRef.current?.reload();
                });
              },
            }]}
            type="button"
          />,
        ]}
      />
    </div>
  );
};

LogsList.propTypes = {
  audioFunc: PropTypes.object,
  userInfo: PropTypes.object,
  audio: PropTypes.object,
};

export default connect(
  (state) => ({ userInfo: state?.common?.data, audio: state?.audio }),
  (dispatch) => ({ audioFunc: bindActionCreators(audioAction, dispatch) })
)(LogsList);
