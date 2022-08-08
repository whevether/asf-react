import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { audioSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as audioAction from 'store/actions/audio';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown,notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl } from 'components/index';
const LogsList = (props) => {
  //日志类型
  const [logType, setLogType] = useState(1);
  //获取账户列表
  useEffect(() => {
    props?.audioFunc?.fetchAudioList({ logType: logType });
  }, []);
  // 分页对象
  const pagination = {
    total: props?.audio?.listTotal,
    onChange: (page, pageSize) => {
      props?.audioFunc?.fetchAudioList({ pageNo: page, pageSize: pageSize, logType: logType });
    },
    pageSize: 20,
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
    permission: 'audio.deletelog.[0-9]{1,12}',
    click: (data) => {
      props?.audioFunc?.deleteAudio(data.id)
        .then(()=>{
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
      <AuthControl action={props?.userInfo.actions} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: '日志ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  }, {
    title: '日志类型',
    dataIndex: 'type',
    key: 'type',
    width: '100px',
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
    width: '100px'
  }, {
    title: 'ip',
    dataIndex: 'clientIp',
    key: 'clientIp',
    width: '100px'
  }, {
    title: 'ip地址',
    dataIndex: 'clientLocation',
    key: 'clientLocation'
  }, {
    title: '说明',
    dataIndex: 'remark',
    key: 'remark'
  }, {
    title: '日志主题',
    dataIndex: 'subject',
    key: 'subject'
  }, {
    title: '创建时间',
    dataIndex: 'addTime',
    key: 'addTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
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
      <BaseTable formObj={audioSearchFrom} querySubmit={querySubmit} dataSource={props?.audio?.list} columns={columns} pagination={pagination} action={props?.userInfo?.actions} />
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
  userInfo:  state?.common?.data,
  audio: state?.audio
}), dispatch => {
  return {
    audioFunc: bindActionCreators(audioAction, dispatch)
  };
})(LogsList);