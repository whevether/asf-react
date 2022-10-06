import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeToDate } from 'utils/storage';
import { apiFrom } from 'utils/json';
import { useSearchParams } from 'react-router-dom';
import { head } from 'utils/head';
import { Badge, Descriptions, Drawer, Dropdown, Modal, notification, Switch, Tag } from 'antd';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
import * as apiAuthAction from 'store/actions/authApi';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const Details = (props) => {
  let [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [initFromValue, setInitFromValue] = useState(null);
  useEffect(() => {
    props?.permissionFunc?.detailsPermission({ id: searchParams.get('id') })
      .then(res => {
        setDetails(res);
      });
  }, []);
  const mapType = {
    1: '菜单目录',
    2: '菜单条目',
    3: '功能'
  };
  // 打开抽屉
  const onOpenDarw = (t) => {
    if (t === 0) {
      props?.permissionFunc?.fetchPermissionList({ pageSize: 9999 })
        .then(res => {
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
        'permissionId': searchParams.get('parentId') === '0' ? [searchParams.get('id')] : [searchParams.get('parentId'), searchParams.get('id')],
        'httpMethods': data?.httpMethods.split(','),
        'status': data?.status,
        'type': data?.type,
        'isSystem': data?.isSystem,
        'description': data?.description,
        'isLogger': data?.isLogger
      });
      onOpenDarw(0);
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
              setTimeout(() => {
                props?.permissionFunc?.detailsPermission({ id: searchParams.get('id') })
                  .then(res => {
                    setDetails(res);
                  });
              }, 500);
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
    render: (text) => {
      let data = props?.tenancyList.find(f => f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: 'api名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  }, {
    title: '请求方法',
    dataIndex: 'httpMethods',
    width: 70,
    key: 'httpMethods'
  }, {
    title: 'api状态',
    dataIndex: 'status',
    width: 80,
    key: 'status',
    render: (text, record) => {
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
            props?.permissionFunc?.detailsPermission({ id: searchParams.get('id') })
              .then(res => {
                setDetails(res);
              });
          });
        }} /> : mapStatus[text];
    }
  }, {
    title: 'api类型',
    dataIndex: 'type',
    width: 80,
    key: 'type',
    render: (text) => {
      const mapStatus = {
        1: '公共api',
        2: '授权api'
      };
      return mapStatus[text];
    }
  }, {
    title: '是否为系统api',
    dataIndex: 'isSystem',
    width: 60,
    key: 'isSystem',
    render: (text) => {
      const mapStatus = {
        0: '否',
        1: '是'
      };
      return mapStatus[text];
    }
  }, {
    title: '是否记录日志',
    dataIndex: 'isLogger',
    width: 60,
    key: 'isLogger',
    render: (text) => {
      const mapStatus = {
        0: '否',
        1: '是'
      };
      return mapStatus[text];
    }
  }, {
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
  //提交表单
  const onFinish = (data) => {
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
        setTimeout(() => {
          props?.permissionFunc?.detailsPermission({ id: searchParams.get('id') })
            .then(res => {
              setDetails(res);
            });
        }, 500);
      });

  };
  return (
    <div className="permission-details">
      {head('权限详情')}
      {
        details && <Fragment>
          <Descriptions
            title="权限详情"
            bordered
            style={{ marginBottom: '10px' }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="权限名称">{details?.name}</Descriptions.Item>
            <Descriptions.Item label="权限类型">{mapType[details?.type]}</Descriptions.Item>
            <Descriptions.Item label="排序">{details?.sort}</Descriptions.Item>
            <Descriptions.Item label="是否为系统权限">{details?.isSystem === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
            <Descriptions.Item label="权限code">{details?.code}</Descriptions.Item>
            <Descriptions.Item label="是否启用">{details?.enable === 1 ? <Badge status="processing" text="启用" /> : '禁用'}</Descriptions.Item>
          </Descriptions>
          {
            details?.permissionMenus && <Descriptions
              title="权限菜单"
              bordered
              style={{ marginBottom: '10px' }}
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="菜单标题">{details?.permissionMenus?.title}</Descriptions.Item>
              <Descriptions.Item label="菜单副标题">{details?.permissionMenus?.subtitle}</Descriptions.Item>
              <Descriptions.Item label="菜单地址">{details?.permissionMenus?.menuUrl}</Descriptions.Item>
              <Descriptions.Item label="是否为系统菜单">{details?.permissionMenus?.isSystem === 1 ? '系统菜单' : '非系统权限'}</Descriptions.Item>
              <Descriptions.Item label="是否隐藏菜单">{details?.permissionMenus?.menuHidden === 1 ? <Tag title="隐藏" color="red" /> : '不隐藏'}</Descriptions.Item>
              <Descriptions.Item label="菜单图标">{details?.permissionMenus?.icon}</Descriptions.Item>
              <Descriptions.Item label="菜单说明">{details?.permissionMenus?.description}</Descriptions.Item>
            </Descriptions>
          }

          <h3 style={{ fontWeight: 600 }}>权限api</h3>
          <BaseTable dataSource={details?.apis} columns={columns} />
          <Drawer
            title="修改api"
            width={720}
            open={showDarw}
            onClose={() => setShowDarw(false)}
          >
            <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
          </Drawer>
        </Fragment>
      }

    </div>
  );
};
Details.propTypes = {
  permissionFunc: PropTypes.object,
  apiAuthFunc: PropTypes.object,
  userInfo: PropTypes.object,
  permission: PropTypes.object,
  authApi: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  permission: state?.permission,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    apiAuthFunc: bindActionCreators(apiAuthAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Details);