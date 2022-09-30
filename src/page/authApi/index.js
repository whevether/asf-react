import React, { Fragment, useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { apiSearchFrom, apiFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as apiAuthAction from 'store/actions/authApi';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, Switch, notification, Modal, Badge, Tag,Descriptions } from 'antd';
import {DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 api 1: 修改api
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
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
        'permissionId': data?.permission?.parentId === '0' ? [data?.permission?.id] : [data?.permission?.parentId, data?.permission?.id],
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
      const mapType = {
        1: '菜单目录',
        2: '菜单条目',
        3: '功能'
      };
      Modal.confirm({
        width: '100%',
        content: (<Fragment>
          <Descriptions
              title="授权pi详情"
              bordered
              style={{ marginBottom: '10px' }}
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="api名称">{data?.name}</Descriptions.Item>
              <Descriptions.Item label="请求方法"> <Tag  color="success" >{data?.httpMethods}</Tag></Descriptions.Item>
              <Descriptions.Item label="api状态">{data?.status === 0 ? <Tag  color="red" >禁用</Tag> : <Tag  color="success" >启用</Tag>}</Descriptions.Item>
              <Descriptions.Item label="api类型">{data?.type === 1 ? '公共api' : '授权api'}</Descriptions.Item>
              <Descriptions.Item label="是否为系统api">{data?.isSystem === 1 ? <Tag  color="success" >是</Tag> : <Tag  color="red" >否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="是否记录日志">{data?.isLogger === 1 ? <Tag  color="success" >是</Tag> : <Tag  color="red" >否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="api地址">{data?.path}</Descriptions.Item>
              <Descriptions.Item label="api说明">{data?.description}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{timeToDate(data?.createTime, 'YYYY-MM-DD  HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
  
            <Descriptions
              title="权限详情"
              bordered
              style={{ marginBottom: '10px' }}
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="权限名称">{data?.permission?.name}</Descriptions.Item>
              <Descriptions.Item label="权限类型">{mapType[data?.permission?.type]}</Descriptions.Item>
              <Descriptions.Item label="排序">{data?.permission?.sort}</Descriptions.Item>
              <Descriptions.Item label="是否为系统权限">{data?.permission?.isSystem === 1 ? <Tag  color="success" >是</Tag> : <Tag  color="red" >否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="权限code">{data?.permission?.code}</Descriptions.Item>
              <Descriptions.Item label="是否启用">{data?.permission?.enable === 1 ? <Badge status="processing" text="启用" /> : <Tag  color="red" >禁用</Tag>}</Descriptions.Item>
            </Descriptions>
        </Fragment>)
       });
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
    width: 100
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 100,
    key: 'tenancyId',
    render: (text)=>{
      let data = props?.tenancyList.find(f=>f.id == text);
      return <span>{data?.name}</span>;
    }
  },{
    title: 'api名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  },{
    title: '请求方法',
    dataIndex: 'httpMethods',
    width: 70,
    key: 'httpMethods'
  },{
    title: 'api状态',
    dataIndex: 'status',
    width: 80,
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
    width: 80,
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
    width: 60,
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
    width: 60,
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
    width: 100,
    key: 'path'
  }, {
    title: '权限id',
    dataIndex: 'permissionId',
    width: 100,
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
    width: 100,
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    width: 150,
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
  const mapTitle = {
    0: '添加api',
    1: '修改api'
  };
  return (
    <div className="list">
      {head('api列表')}
      <BaseTable formObj={apiSearchFrom} querySubmit={querySubmit} dataSource={props?.authApi?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加api', permission: 'api.create', type: 'primary',  icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
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