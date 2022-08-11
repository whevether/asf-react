import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { permissionSearchFrom, permissionFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, Switch, notification, Modal } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 权限
  const [initFromValue, setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.permissionFunc?.fetchPermissionList({ pageSize: 200, pageNo: 1 });
  }, []);
  // 分页对象
  const pagination = {
    total: props?.permission?.listTotal,
    onChange: (page, pageSize) => {
      props?.permissionFunc?.fetchPermissionList({ pageNo: page, pageSize: pageSize });
    },
    pageSize: 200,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      let list = props?.permission?.list;
      if (!list.some(f => f.value === 0)) {
        list.unshift({ label: '顶级权限', value: '0', children: [] });
      }
      let from = permissionFrom(list);
      //判断是否为超级管理员。如果为则显示选择租户
      if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
        from.unshift({
          title: '租户',
          fromType: 'select',
          name: 'tenancyId',
          selOption: props?.tenancyList,
          placeholder: '请选择租户',
          rules: [{ required: true, message: '租户不能为空' }],
          options: {
            allowClear: true//是否显示清除框
          }
        });
      }
      setDrawType(type);
      setFromData(from);
      setShowDarw(true);
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      data.parentId = data?.parentId.slice(-1)[0];
      props?.permissionFunc?.createPermission(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加权限成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.permissionFunc?.fetchPermissionList({ pageNo: 0, pageSize: 200 });
          },500);
        });
    }else {
      data.parentId = data?.parentId.slice(-1)[0];
      props?.permissionFunc?.modifyPermission(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改权限成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.permissionFunc?.fetchPermissionList({ pageNo: 0, pageSize: 200 });
          },500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.permissionFunc?.fetchPermissionList(e);
  };
  // 修改
  const list = [{
    name: '修改权限',
    permission: 'permission.modify',
    isAction: true,
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'code': data?.code,
        'parentId':  data?.parentId == 0 ? [data?.parentId]:[data?.parentId, data?.id],
        'name': data?.name,
        'type': data?.type,
        'isSystem': data?.isSystem,
        'description': data?.description,
        'enable': data?.enable,
        'sort': data?.sort
      });
      onOpenDarw(1);
    }
  }, {
    name: '权限详情',
    permission: 'permission.details',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '删除权限',
    isAction: true,
    permission: 'permission.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除权限!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除权限用户的所有数关联权限也会删除!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.permissionFunc.deletePermission(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除权限成功'
              });
              setTimeout(()=>{
                props?.permissionFunc?.fetchPermissionList({ pageNo: 0, pageSize: 200 });
              },500);
            });
        }
      });
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu"/>
    );
  };
  const columns = [{
    title: '权限ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: '100px'
  }, {
    title: '权限代码',
    dataIndex: 'code',
    key: 'code',
    width: 150,
  }, {
    title: '父级id',
    dataIndex: 'parentId',
    key: 'parentId',
    width: 150,
  }, {
    title: '权限名称',
    dataIndex: 'name',
    width: 150,
    key: 'name'
  }, {
    title: '权限类型',
    dataIndex: 'type',
    key: 'type',
    width: 150,
    render: (text) => {
      let typeMap = {
        1: '菜单',
        2: '菜单条目',
        3: '功能'
      };
      return typeMap[text];
    }
  }, {
    title: '是否为系统权限',
    dataIndex: 'isSystem',
    key: 'isSystem',
    width: 150,
    render: (text) => {
      let sysMap = {
        1: '是',
        0: '否'
      };
      return sysMap[text];
    }
  }, {
    title: '说明',
    dataIndex: 'description',
    width: 150,
    key: 'description'
  }, {
    title: '是否启用',
    dataIndex: 'enable',
    width: 150,
    key: 'enable',
    // eslint-disable-next-line
    render: (text, record) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo?.actions.includes('permission.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
        unCheckedChildren="禁用" onChange={(e) => {
          props?.permissionFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
            notification['success']({
              message: '修改成功',
              description: '修改权限状态状态成功'
            });
            props?.permissionFunc?.fetchPermissionList();
          });
        }} /> : statusMap[text];
    }
  }, {
    title: '排序',
    dataIndex: 'sort',
    width: 150,
    key: 'sort'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    width: 150,
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
  const mapTitle = {
    0: '添加权限',
    1: '修改权限'
  };
  return (
    <div className="list">
      {head('权限列表')}
      <BaseTable formObj={permissionSearchFrom} querySubmit={querySubmit} dataSource={props?.permission?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加权限', permission: 'permission.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      <Drawer
        title={mapTitle[drawType]}
        width={720}
        visible={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
Index.propTypes = {
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  permission: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  permission: state?.permission,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Index);