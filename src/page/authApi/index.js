import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { apiSearchFrom, apiFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as apiAuthAction from 'store/actions/authApi';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, Switch, notification, Modal } from 'antd';
import {DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 api 1: 修改api
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
  let navigate = useNavigate();
  //获取账户列表
  useEffect(() => {
    props?.apiAuthFunc?.fetchApiList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.authApi?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.apiAuthFunc?.fetchApiList({ pageNo: p, pageSize: size });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      props?.permissionFunc?.fetchPermissionList({ pageSize: 9999 })
        .then(res=>{
          setDrawType(type);
          let from = apiFrom(res);
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
          setFromData(from);
          setShowDarw(true);
        });
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      data.permissionId = data?.permissionId.slice(-1)[0];
      data.httpMethods = data?.httpMethods.join(',');
      props?.apiAuthFunc?.createApi(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加api成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.apiAuthFunc?.fetchApiList({pageSize: pageSize });
          },500);
        });
    }else if(drawType === 1){
      data.permissionId = data?.permissionId.slice(-1)[0];
      data.httpMethods = data?.httpMethods.join(',');
      data.id = initFromValue.id;
      props?.apiAuthFunc?.modifyApi(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改api成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.apiAuthFunc?.fetchApiList({pageSize: pageSize });
          },500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.apiAuthFunc?.fetchApiList(e);
  };
  // 修改
  const list = [{
    name: '修改api',
    permission: 'api.modify',
    isAction: true,
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'name': data?.name,
        'path': data?.path,
        'httpMethods': data?.httpMethods.split(','),
        'status': data?.status,
        'type': data?.type,
        'isSystem': data?.isSystem,
        'description': data?.description,
        'isLogger': data?.isLogger
      });
      onOpenDarw(1);
    }
  }, {
    name: 'api详情',
    permission: 'api.details',
    click: (data) => {
      navigate(`/control/authApi/details?id=${data?.id}`);
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
          props?.apiAuthFunc.deleteApi(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除api成功'
              });
              setTimeout(()=>{
                props?.apiAuthFunc?.fetchApiList({ pageSize: pageSize });
              },500);
            });
        }
      });
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: '100px'
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 150,
    key: 'tenancyId',
    render: (text)=>{
      let data = props?.tenancyList.find(f=>f.id == text);
      return <span>{data?.name}</span>;
    }
  },{
    title: 'api名称',
    dataIndex: 'name',
    width: 150,
    key: 'name'
  },{
    title: '请求方法',
    dataIndex: 'httpMethods',
    width: 150,
    key: 'httpMethods'
  },{
    title: 'api状态',
    dataIndex: 'status',
    width: 150,
    key: 'status',
    render: (text,record)=>{
      const mapStatus = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo.actions.includes('api.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
      unCheckedChildren="禁用" onChange={(e) => {
        props?.apiAuthFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改api状态成功'
          });
          props?.apiAuthFunc?.fetchApiList();
        });
      }} />  : mapStatus[text];
    }
  },{
    title: 'api类型',
    dataIndex: 'type',
    width: 150,
    key: 'type',
    render: (text)=>{
      const mapStatus = {
        1: '公共api',
        2: '授权api'
      };
      return mapStatus[text];
    }
  },{
    title: '是否为系统api',
    dataIndex: 'isSystem',
    width: 150,
    key: 'isSystem',
    render: (text)=>{
      const mapStatus = {
        0: '否',
        1: '是'
      };
      return mapStatus[text];
    }
  },{
    title: '是否记录日志',
    dataIndex: 'isLogger',
    width: 150,
    key: 'isLogger',
    render: (text)=>{
      const mapStatus = {
        0: '否',
        1: '是'
      };
      return mapStatus[text];
    }
  },{
    title: 'api地址',
    dataIndex: 'path',
    width: 150,
    key: 'path'
  }, {
    title: '权限id',
    dataIndex: 'permissionId',
    width: 150,
    key: 'permissionId'
  }, {
    title: '说明',
    dataIndex: 'description',
    width: 150,
    key: 'description'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 200,
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    width: 150,
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
    0: '添加api',
    1: '修改api'
  };
  return (
    <div className="list">
      {head('api列表')}
      <BaseTable formObj={apiSearchFrom} querySubmit={querySubmit} dataSource={props?.authApi?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加api', permission: 'api.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      <Drawer
        title={mapTitle[drawType]}
        width={720}
        open={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
Index.propTypes = {
  apiAuthFunc: PropTypes.object,
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  authApi: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  authApi: state?.authApi,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    apiAuthFunc: bindActionCreators(apiAuthAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Index);