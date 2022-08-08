import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { permissionSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, Switch,Empty } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const PermissionList = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [darwTitle, setDarwTitle] = useState('');
  const [initFromValue,setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.permissionFunc?.fetchPermissionList({pageSize: 200,pageNo: 1});
  }, []);
  // 分页对象
  const pagination = {
    total: props?.permission?.listTotal,
    onChange: (page, pageSize) => {
      props?.permissionFunc?.fetchPermissionList({pageNo:page,pageSize:pageSize});
    },
    pageSize: 200,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (title) => {
    setDarwTitle(title);
    setFromData(null);
    setShowDarw(true);
  };
  //提交表单
  const onFinish = (data) => {
    console.log(data);
    setShowDarw(false);
  };
  // 提交表格查询
  const querySubmit = (e) => {
    console.log(e);
  };
  // 修改
  const list = [{
    name: '修改权限',
    permission: 'permission.modify',
    isAction: true,
    click: (data) => {
      console.log(data);
    }
  },{
    name: '权限详情',
    permission: 'permission.details',
    click: (data) => {
      console.log(data);
    }
  },{
    name: '删除权限',
    isAction: true,
    permission: 'permission.delete.[0-9]{1,12}',
    click: (data) => {
      console.log(data);
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl action={props?.userInfo?.actions} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: '权限ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  },{
    title: '权限代码',
    dataIndex: 'code',
    key: 'code',
    width: '100px'
  }, {
    title: '父级id',
    dataIndex: 'parentId',
    key: 'parentId',
    width: '100px'
  },{
    title: '权限名称',
    dataIndex: 'name',
    key: 'name'
  },{
    title: '权限类型',
    dataIndex: 'type',
    key: 'type',
    render: (text) => {
      let typeMap = {
        1: '菜单条目',
        2: '菜单',
        3: '功能'
      };
      return typeMap[text];
    }
  },{
    title: '是否为系统权限',
    dataIndex: 'isSystem',
    key: 'isSystem',
    render: (text) => {
      let sysMap = {
        1: '是',
        0: '否'
      };
      return sysMap[text];
    }
  },{
    title: '说明',
    dataIndex: 'description',
    key: 'description'
  },{
    title: '是否启用',
    dataIndex: 'enable',
    key: 'enable',
    // eslint-disable-next-line
    render: (text,record) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo?.actions.includes('permission.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
      unCheckedChildren="禁用" onChange={(e) => {
        props?.permissionFunc?.modifyAccountStatus({id:record?.id,status:Number(e)}).then(() => {
          props?.permissionFunc?.fetchPermissionList();
        });
      }}/> : statusMap[text];
    }
  },{
    title: '排序',
    dataIndex: 'sort',
    key: 'sort'
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
    <div className="list">
      {head('权限列表')}
      {
        props?.permission?.list.length>0 && <BaseTable formObj={permissionSearchFrom} querySubmit={querySubmit} dataSource={props?.permission?.list} columns={columns} pagination={pagination} action={props?.userInfo?.actions} list={[{ name: '添加权限', permission: 'permission.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null);onOpenDarw('添加权限');  } }]} />
      }
      {
        props?.permission.list.length == 0 && <Empty />
      }
      <Drawer
        title={darwTitle}
        width={720}
        visible={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={()=>setShowDarw(false)}/>
      </Drawer>
    </div>
  );
};
PermissionList.propTypes = {
  permissionFunc: PropTypes.object,
  permission: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo:  state?.common?.data,
  permission: state?.permission,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return{
    permissionFunc:bindActionCreators(permissionAction, dispatch)
  };
})(PermissionList);