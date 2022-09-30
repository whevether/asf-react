import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { audioSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as audioAction from 'store/actions/audio';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, notification } from 'antd';
import { CloudSyncOutlined, DownOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl } from 'components/index';
const LogsList = (props) => {
  //日志类型
  const [logType, setLogType] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [logsId, setLogsId] = useState([]);
  //获取账户列表
  useEffect(() => {
    props?.audioFunc?.fetchAudioList({ logType: logType });
  }, []);
  // 分页对象
  const pagination = {
    total: props?.audio?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.audioFunc?.fetchAudioList({ pageNo: p, pageSize: size, logType: logType });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };

  // 提交表格查询
  const querySubmit = (e) => {
    setLogType(e?.logType);
    props?.audioFunc?.fetchAudioList({ logType: e?.logType });
  };
  // 修改
  const list = [{
    name: '删除日志',
    isAction: true,
    permission: 'audio.deletelog',
    click: (data) => {
      props?.audioFunc?.deleteAudio({ ids: [data.id] })
        .then(() => {
          notification['success']({
            message: '删除成功',
            description: '删除日志成功'
          });
          props?.audioFunc?.fetchAudioList({ logType: logType });
        });
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />
    );
  };
  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    onSelect: (record, selected, selectedRows) => {
      let ids = selectedRows.map(m => m.key);
      setLogsId(ids);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      let ids = changeRows.map(m => m.key);
      setLogsId(ids);
    },
  };
  const columns = [{
    title: '日志ID',
    dataIndex: 'id',
    key: 'id',
    width: 100
  }, {
    title: '日志类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    render: (text) => {
      const mapType = {
        1: '登录日志',
        2: '操作日志',
        3: '错误日志'
      };
      return mapType[text];
    }
  }, {
    title: '账户名',
    dataIndex: 'accountName',
    key: 'accountName',
    width: 100
  }, {
    title: 'ip',
    dataIndex: 'clientIp',
    key: 'clientIp',
    width: 100
  }, {
    title: 'ip地址',
    dataIndex: 'clientLocation',
    key: 'clientLocation',
    width: 100,
  }, {
    title: '请求地址',
    dataIndex: 'apiAddress',
    key: 'apiAddress',
    width: 100,
  }, {
    title: '请求数据',
    dataIndex: 'apiRequest',
    key: 'apiRequest',
    width: 150,
    render: (text) => {
      if (text) {
        return (<pre lang="json">{text}</pre>);
      } else {
        return '';
      }
    }
  }, {
    title: '响应数据',
    dataIndex: 'apiResponse',
    key: 'apiResponse',
    width: 150,
    render: (text) => {
      if (text) {
        return (<pre lang="json">{text}</pre>);
      } else {
        return '';
      }
    }
  }, {
    title: '说明',
    dataIndex: 'remark',
    width: 100,
    key: 'remark'
  }, {
    title: '日志主题',
    dataIndex: 'subject',
    width: 100,
    key: 'subject'
  }, {
    title: '创建时间',
    dataIndex: 'addTime',
    key: 'addTime',
    width: 100,
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    width: 150,
    key: 'action',
    fixed: 'right',
    // eslint-disable-next-line
    render: (text) => {
      return (<Dropdown overlay={menu(text)} name="action">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>);
    }
  }];
  return (
    <div className="list">
      {head('审计日志')}
      <BaseTable formObj={audioSearchFrom} querySubmit={querySubmit} dataSource={props?.audio?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{
        name: '批量删除', permission: 'audio.deletelog', rest: { disabled: logsId?.length === 0 ? true : false }, type: 'primary', icon: <CloudSyncOutlined />, click: () => {
          if (logsId?.length === 0) { notification.error({ message: '日志不能为空,请先选择日志' }); return; }
          props?.audioFunc?.deleteAudio({ ids: logsId })
            .then(() => {
              setLogsId([]);
              notification['success']({
                message: '删除成功',
                description: '删除日志成功'
              });
              props?.audioFunc?.fetchAudioList({ logType: logType });
            });
        }
      }]} rowSelection={{ ...rowSelection, checkStrictly: false }} />
    </div>
  );
};
LogsList.propTypes = {
  audioFunc: PropTypes.object,
  userInfo: PropTypes.object,
  audio: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  audio: state?.audio
}), dispatch => {
  return {
    audioFunc: bindActionCreators(audioAction, dispatch)
  };
})(LogsList);