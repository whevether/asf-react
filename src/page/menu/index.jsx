import React, { Fragment, useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { menuFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as menuAction from 'store/actions/menu';
import * as permissionAction from 'store/actions/permission';
import * as translateAction from 'store/actions/translate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Switch, notification, Modal, Descriptions, Tag } from 'antd';
import { createFromIconfontCN, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { BaseFrom, AuthControl } from 'components/index';
import { findParentIds } from 'utils/help';

const IconFont = createFromIconfontCN({
  scriptUrl: ['https://at.alicdn.com/t/c/font_2384333_l1re7fqml8.js']
});

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('菜单列表');

  const onOpenDarw = (type, data) => {
    if (type === 0 || type === 1) {
      Promise.all([
        props?.translateFunc?.fetchTranslateList({ page: 1, pageSize: 500 }),
        props?.permissionFunc?.fetchPermissionList({ pageNo: 1, pageSize: 200 })
      ]).then(res => {
        setDrawType(type);
        let from = menuFrom(res[1], res[0]?.filter(f => f?.countryCode?.toLocaleLowerCase() === 'cn')?.map(m => ({ id: m?.keys, name: m?.value })));
        if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
          from.unshift({
            title: '租户',
            fromType: 'select',
            name: 'tenancyId',
            selOption: props?.tenancyList,
            placeholder: '请选择租户',
            rules: [{ required: true, message: '租户不能为空' }],
            options: { allowClear: true }
          });
        }
        setFromData(from);
        if (data) {
          let permList = res[1];
          let initArr = findParentIds(permList, data?.permission?.parentId).filter(f => data?.permission?.parentId !== f && data?.permission?.id !== f).map(m => m);
          if (data?.permission?.parentId !== '0') initArr.push(data?.permission?.parentId);
          initArr.push(data?.permission?.id);
          setInitFromValue({
            id: data?.id,
            tenancyId: data?.tenancyId,
            title: data?.title,
            icon: data?.icon,
            subtitle: data?.subtitle,
            translate: data?.translate,
            permissionId: initArr,
            menuUrl: data?.menuUrl,
            externalLink: data?.externalLink,
            isSystem: data?.isSystem,
            description: data?.description,
            menuRedirect: data?.menuRedirect,
            menuHidden: data?.menuHidden
          });
        } else {
          setInitFromValue(null);
        }
        setShowDarw(true);
      });
    }
  };

  const onFinish = (data) => {
    if (drawType === 0) {
      data.permissionId = data?.permissionId?.slice(-1)[0];
      props?.menuFunc?.createMenu(data)
        .then(() => {
          notification.success({ message: '添加成功', description: '添加菜单成功' });
          setShowDarw(false);
          actionRef.current?.reload();
        });
    } else if (drawType === 1) {
      data.permissionId = data?.permissionId?.[data?.permissionId?.length - 1];
      data.id = initFromValue.id;
      props?.menuFunc?.modifyMenu(data)
        .then(() => {
          notification.success({ message: '修改成功', description: '修改菜单成功' });
          setShowDarw(false);
          actionRef.current?.reload();
        });
    }
  };

  const list = [{
    name: '修改菜单',
    permission: 'menu.modify',
    isAction: true,
    click: (data) => onOpenDarw(1, data)
  }, {
    name: '菜单详情',
    permission: 'menu.details',
    click: (data) => {
      const mapType = { 1: '菜单目录', 2: '菜单条目', 3: '功能' };
      Modal.confirm({
        title: '菜单详情',
        width: '100%',
        content: (
          <Fragment>
            <Descriptions title="菜单详情" bordered style={{ marginBottom: '10px' }} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="菜单标题">{data?.title}</Descriptions.Item>
              <Descriptions.Item label="菜单副标题">{data?.subtitle}</Descriptions.Item>
              <Descriptions.Item label="菜单地址">{data?.menuUrl}</Descriptions.Item>
              <Descriptions.Item label="是否为系统菜单">{data?.isSystem === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="是否隐藏菜单">{data?.menuHidden === 1 ? <Tag title="隐藏" color="red" /> : <Tag color="success">不隐藏</Tag>}</Descriptions.Item>
              <Descriptions.Item label="菜单图标">{data?.icon}</Descriptions.Item>
              <Descriptions.Item label="菜单说明">{data?.description}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="权限详情" bordered style={{ marginBottom: '10px' }} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="权限名称">{data?.permission?.name}</Descriptions.Item>
              <Descriptions.Item label="权限类型">{mapType[data?.permission?.type]}</Descriptions.Item>
              <Descriptions.Item label="排序">{data?.permission?.sort}</Descriptions.Item>
              <Descriptions.Item label="是否为系统权限">{data?.permission?.isSystem === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
              <Descriptions.Item label="权限code">{data?.permission?.code}</Descriptions.Item>
              <Descriptions.Item label="是否启用">{data?.permission?.enable === 1 ? '启用' : <Tag color="red">禁用</Tag>}</Descriptions.Item>
            </Descriptions>
          </Fragment>
        )
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
          props?.menuFunc?.deleteMenu(data?.id)
            .then(() => {
              notification.success({ message: '删除成功', description: '删除菜单成功' });
              actionRef.current?.reload();
            });
        }
      });
    }
  }];

  const columns = [
    { title: '菜单ID', dataIndex: 'id', key: 'id', fixed: 'left', width: 100, search: false },
    {
      title: '所属租户',
      dataIndex: 'tenancyId',
      width: 100,
      key: 'tenancyId',
      search: false,
      render: (text) => {
        let d = props?.tenancyList?.find(f => f.id == text);
        return <span>{d?.name}</span>;
      }
    },
    { title: '菜单标题', dataIndex: 'title', key: 'title', width: 100 },
    { title: '菜单副标题', dataIndex: 'subtitle', key: 'subtitle', width: 100, search: false },
    { title: '菜单所属权限id', dataIndex: 'permissionId', key: 'permissionId', width: 120, hideInTable: true },
    { title: '菜单地址', dataIndex: 'menuUrl', key: 'menuUrl', width: 150 },
    { title: '菜单外部链接', dataIndex: 'externalLink', key: 'externalLink', width: 150, search: false },
    { title: '菜单重定向地址', dataIndex: 'menuRedirect', key: 'menuRedirect', width: 150, search: false },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      width: 100,
      key: 'icon',
      search: false,
      render: (text) => text ? <IconFont type={text} /> : null
    },
    { title: '权限id', dataIndex: 'permissionId', key: 'permissionId', width: 100 },
    { title: '说明', dataIndex: 'description', width: 150, key: 'description', search: false },
    {
      title: '是否隐藏菜单',
      dataIndex: 'menuHidden',
      key: 'menuHidden',
      width: 80,
      search: false,
      render: (text, record) => {
        let statusMap = { 0: '显示', 1: '隐藏' };
        return props?.userInfo?.actions?.includes('menu.modifyhidden') ? (
          <Switch
            checked={Boolean(text)}
            checkedChildren="隐藏"
            unCheckedChildren="显示"
            onChange={(e) => {
              props?.menuFunc?.modifyHidden({ id: record?.id, status: Number(e) }).then(() => {
                notification.success({ message: '修改成功', description: '修改菜单显示状态成功' });
                actionRef.current?.reload();
              });
            }}
          />
        ) : statusMap[text];
      }
    },
    { title: '多语言', dataIndex: 'translate', width: 100, key: 'translate', search: false },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 100,
      search: false,
      render: (text) => timeToDate(text, 'YYYY-MM-DD  HH:mm:ss')
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={{ ...record, key: record.id }} type="menu" />
    }
  ];

  const mapTitle = { 0: '添加菜单', 1: '修改菜单' };

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          const { current, pageSize, ...rest } = params || {};
          const res = await props?.menuFunc?.fetchMenuList({ pageNo: current, pageSize, ...rest });
          return { data: res?.result ?? [], total: res?.totalCount ?? 0, success: true };
        }}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (t) => `总条目: ${t} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl
            key="add"
            userInfo={props?.userInfo}
            list={[{ name: '添加菜单', permission: 'menu.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]}
            type="button"
          />
        ]}
      />
      <Drawer title={mapTitle[drawType]} width={720} open={showDarw} onClose={() => setShowDarw(false)}>
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};

Index.propTypes = {
  menuFunc: PropTypes.object,
  permissionFunc: PropTypes.object,
  translateFunc: PropTypes.object,
  userInfo: PropTypes.object,
  menu: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};

export default connect(
  state => ({ userInfo: state?.common?.data, menu: state?.menu, tenancyList: state?.common?.tenancyList }),
  dispatch => ({
    menuFunc: bindActionCreators(menuAction, dispatch),
    translateFunc: bindActionCreators(translateAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  })
)(Index);
