import React, { useEffect, useState} from 'react';
import { head } from 'utils/head';
import { timeToDate, getCookie } from 'utils/storage';
import { editorSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as editorAction from 'store/actions/editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {BaseTable, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';
const EditorList = (props) => {
  const [action] = useState(getCookie('permission') ? JSON.parse(getCookie('permission')) : []);
  let navigate = useNavigate();
  //获取账户列表
  useEffect(() => {
    props?.editorFunc?.getList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.editor?.listTotal,
    onChange: (page, pageSize) => {
      props?.editorFunc?.getList({pageNo:page,pageSize:pageSize});
    },
    pageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.editorFunc?.getList(e);
  };
  // 修改
  const list = [{
    name: '修改页面',
    permission: 'editor.modify',
    isAction: true,
    click: (data) => {
      navigate(`/editor/modify?id=${data.id}`);
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl action={action} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  },{
    title: '页面名称',
    dataIndex: 'name',
    key: 'name',
    width: '100px'
  }, {
    title: '页面路径',
    dataIndex: 'path',
    key: 'path',
    width: '100px'
  },{
    title: '页面类型',
    dataIndex: 'type',
    key: 'type',
    render: (text) => {
      let pageMap = {
        1: '网站',
        0: '手机页面'
      };
      return pageMap[text];
    }
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
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
    <div className="account-list">
      {head('富文本列表')}
      {
        props?.editor?.list.length>0 && <BaseTable formObj={editorSearchFrom} querySubmit={querySubmit} dataSource={props?.editor?.list} columns={columns} pagination={pagination} action={action} list={[{ name: '添加页面', permission: 'editor.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { navigate('/editor/create');  } }]} />
      }
    </div>
  );
};
EditorList.propTypes = {
  editorFunc: PropTypes.object,
  editor: PropTypes.object,
  action: PropTypes.array,
  initialValues: PropTypes.object
};
export default connect(state => ({
  editor: state?.editor
}), dispatch => {
  return{
    editorFunc:bindActionCreators(editorAction, dispatch)
  };
})(EditorList);