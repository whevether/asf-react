import React, { Fragment, useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { menuSearchFrom, menuFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as menuAction from 'store/actions/menu';
import * as permissionAction from 'store/actions/permission';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  Drawer, Switch, notification, Modal, Descriptions, Tag, Badge } from 'antd';
import { createFromIconfontCN, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const Index = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      'https://at.alicdn.com/t/font_2384333_rsw4qhrwjur.js'
    ],
  });
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 菜单 1: 修改菜单
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
  //获取账户列表
  useEffect(() => {
    props?.menuFunc?.fetchMenuList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.menu?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.menuFunc?.fetchMenuList({ pageNo: p, pageSize: size });
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
      Promise.all([props?.commonFunc?.getTranslatetList(true), props?.permissionFunc?.fetchPermissionList({ pageNo: 0, pageSize: 200 })])
        .then(res=>{
          setDrawType(type);
          let from = menuFrom(res[1],res[0]);
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
      props?.menuFunc?.createMenu(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加菜单成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.menuFunc?.fetchMenuList({ pageSize: pageSize });
          },500);
        });
    }else if (drawType === 1) {
      data.permissionId = data?.permissionId.slice(-1)[0];
      data.id = initFromValue?.id;
      props?.menuFunc?.modifyMenu(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改菜单成功'
          });
          setShowDarw(false);
          setTimeout(()=>{
            props?.menuFunc?.fetchMenuList({  pageSize: pageSize });
          },500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.menuFunc?.fetchMenuList(e);
  };
  // 修改
  const list = [{
    name: '修改菜单',
    permission: 'menu.modify',
    isAction: true,
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'title': data?.title,
        'icon': data?.icon,
        'subtitle': data?.subtitle,
        'translate': data?.translate,
        'permissionId': data?.permission?.parentId === '0' ? [data?.permission?.id] : [data?.permission?.parentId, data?.permission?.id],
        'menuUrl': data?.menuUrl,
        'externalLink': data?.externalLink,
        'isSystem': data?.isSystem,
        'description': data?.description,
        'menuRedirect': data?.menuRedirect,
        'menuHidden': data?.menuHidden
      });
      onOpenDarw(1);
    }
  }, {
    name: '菜单详情',
    permission: 'menu.details',
    click: (data) => {
      const mapType = {
        1: '菜单目录',
        2: '菜单条目',
        3: '功能'
      };
     Modal.confirm({
      title: '菜单详情',
      width: '100%',
      content: (<Fragment>
        <Descriptions
            title="菜单详情"
            bordered
            style={{ marginBottom: '10px' }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="菜单标题">{data?.title}</Descriptions.Item>
            <Descriptions.Item label="菜单副标题">{data?.subtitle}</Descriptions.Item>
            <Descriptions.Item label="菜单地址">{data?.menuUrl}</Descriptions.Item>
            <Descriptions.Item label="是否为系统菜单">{data?.isSystem === 1 ? <Tag  color="success" >是</Tag> : <Tag  color="red" >否</Tag>}</Descriptions.Item>
            <Descriptions.Item label="是否隐藏菜单">{data?.menuHidden === 1 ? <Tag title="隐藏" color="red" /> : <Tag  color="success" >不隐藏</Tag>}</Descriptions.Item>
            <Descriptions.Item label="菜单图标">{data?.icon}</Descriptions.Item>
            <Descriptions.Item label="菜单说明">{data?.description}</Descriptions.Item>
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
    name: '删除菜单',
    permission: 'menu.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除菜单!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除菜单之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.menuFunc.deleteMenu(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除菜单成功'
              });
              setTimeout(()=>{
                props?.menuFunc?.fetchMenuList({  pageSize: pageSize });
              },500);
            });
        }
      });
    }
  }];
  const columns = [{
    title: '菜单ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  },{
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 100,
    key: 'tenancyId',
    render: (text)=>{
      let data = props?.tenancyList.find(f=>f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: '菜单标题',
    dataIndex: 'title',
    width: 100,
    key: 'title'
  },{
    title: '菜单副标题',
    dataIndex: 'subtitle',
    width: 100,
    key: 'subtitle'
  },{
    title: '菜单地址',
    dataIndex: 'menuUrl',
    width: 150,
    key: 'menuUrl'
  },{
    title: '菜单外部链接',
    dataIndex: 'externalLink',
    width: 150,
    key: 'externalLink'
  },{
    title: '菜单重定向地址',
    dataIndex: 'menuRedirect',
    key: 'menuRedirect',
    width: 150,
  },{
    title: '菜单图标',
    dataIndex: 'icon',
    width: 100,
    key: 'icon',
    render: (text)=>{
      return (<IconFont type={text} />);
    }
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
    title: '是否隐藏菜单',
    dataIndex: 'menuHidden',
    key: 'menuHidden',
    width: 80,
    // eslint-disable-next-line
    render: (text, record) => {
      let statusMap = {
        0: '显示',
        1: '隐藏'
      };
      return props?.userInfo.actions.includes('menu.modifyhidden') ? <Switch checked={Boolean(text)} checkedChildren="隐藏"
        unCheckedChildren="显示" onChange={(e) => {
          props?.menuFunc?.modifyHidden({ id: record?.id, status: Number(e) }).then(() => {
            notification['success']({
              message: '修改成功',
              description: '修改菜单显示状态成功'
            });
            props?.menuFunc?.fetchMenuList();
          });
        }} /> : statusMap[text];
    }
  }, {
    title: '多语言',
    dataIndex: 'translate',
    width: 100,
    key: 'translate'
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
    render: (record) => {
      return (<AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
    }
  }];
  const mapTitle = {
    0: '添加菜单',
    1: '修改菜单'
  };
  return (
    <div className="list">
      {head('菜单列表')}
      <BaseTable formObj={menuSearchFrom} querySubmit={querySubmit} dataSource={props?.menu?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加菜单', permission: 'menu.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
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
  menuFunc: PropTypes.object,
  permissionFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  userInfo: PropTypes.object,
  menu: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  menu: state?.menu,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    menuFunc: bindActionCreators(menuAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Index);