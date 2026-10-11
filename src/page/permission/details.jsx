import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeToDate } from 'utils/storage';
import { useSearchParams } from 'react-router-dom';
import { head } from 'utils/head';
import { Badge, Descriptions, Modal, notification, Switch, Tag } from 'antd';
import { BetaSchemaForm, DrawerForm } from '@ant-design/pro-components';
import { ProTableCompat, AuthControl } from 'components/index';
import * as apiAuthAction from 'store/actions/authApi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const Details = (props) => {
  let [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  const [showDarw, setShowDarw] = useState(false);
  const [initFromValue, setInitFromValue] = useState(null);
  const [permissionTree, setPermissionTree] = useState([]);
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
  const isSuperAdmin = props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1';
  const yesNoOptions = [{ label: '否', value: 0 }, { label: '是', value: 1 }];
  const httpMethodOptions = [
    { label: 'get', value: 'get' },
    { label: 'post', value: 'post' },
    { label: 'put', value: 'put' },
    { label: 'delete', value: 'delete' },
  ];

  const onOpenDarw = () => {
    props?.permissionFunc?.fetchPermissionList({ pageSize: 9999 })
      .then(res => {
        setPermissionTree(Array.isArray(res) ? res : (res?.data || []));
        setShowDarw(true);
      });
  };

  const formColumns = [
    ...(isSuperAdmin ? [{
      title: '租户',
      dataIndex: 'tenancyId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择租户',
        allowClear: true,
        options: (props?.tenancyList || []).map((item) => ({ label: item.name, value: item.id })),
      },
      formItemProps: { rules: [{ required: true, message: '租户不能为空' }] },
    }] : []),
    {
      title: 'api所属权限',
      dataIndex: 'permissionId',
      valueType: 'cascader',
      fieldProps: { placeholder: '请选择api所属权限', allowClear: true, changeOnSelect: true, options: permissionTree },
      formItemProps: { rules: [{ required: true, message: 'api所属权限不能为空' }] },
    },
    {
      title: 'api名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: { placeholder: '请输入api名称', allowClear: true },
      formItemProps: { rules: [{ required: true, message: 'api名称不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的api名称或最多输入50个字符的api名称' }] },
    },
    {
      title: 'api地址',
      dataIndex: 'path',
      valueType: 'text',
      fieldProps: { placeholder: '请输入api地址', allowClear: true },
      formItemProps: { rules: [{ required: true, message: 'api地址不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入1个字符的api地址或最多输入50个字符的api地址' }] },
    },
    {
      title: 'api状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择api状态',
        allowClear: true,
        options: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }],
      },
    },
    {
      title: '是否记录日志',
      dataIndex: 'isLogger',
      valueType: 'select',
      fieldProps: { placeholder: '请选择是否记录日志', allowClear: true, options: yesNoOptions },
    },
    {
      title: '是否为系统权限',
      dataIndex: 'isSystem',
      valueType: 'select',
      fieldProps: { placeholder: '请选择是否为系统权限', allowClear: true, options: yesNoOptions },
    },
    {
      title: 'api类型',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择api类型',
        allowClear: true,
        options: [{ label: '开放api', value: 1 }, { label: '授权api', value: 2 }],
      },
      formItemProps: { rules: [{ required: true, message: 'api类型不能为空' }] },
    },
    {
      title: 'api请求方法',
      dataIndex: 'httpMethods',
      valueType: 'select',
      fieldProps: { mode: 'multiple', placeholder: '请选择api请求方法', allowClear: true, options: httpMethodOptions },
      formItemProps: { rules: [{ required: true, message: 'api请求方法不能为空' }] },
    },
    {
      title: 'api说明',
      dataIndex: 'description',
      valueType: 'textarea',
      fieldProps: { placeholder: '请输入api说明' },
      formItemProps: { rules: [{ type: 'string', min: 1, max: 500, message: '最少输入1个字符的api说明或最多输入500个字符的api说明' }] },
    },
  ];
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
      onOpenDarw();
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
     
    render: (record) => {
      return ( <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
    }
  }];
  //提交表单
  const onFinish = async (data) => {
    data.permissionId = data?.permissionId.slice(-1)[0];
    data.httpMethods = data?.httpMethods.join(',');
    data.id = initFromValue.id;
    await props?.apiAuthFunc?.modifyApi(data);
    notification.success({
      message: '修改成功',
      description: '修改api成功'
    });
    setTimeout(() => {
      props?.permissionFunc?.detailsPermission({ id: searchParams.get('id') })
        .then(res => {
          setDetails(res);
        });
    }, 500);
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
          <ProTableCompat dataSource={details?.apis} columns={columns} />
          <DrawerForm
            title="修改api"
            open={showDarw}
            layout="vertical"
            initialValues={initFromValue || {}}
            drawerProps={{ width: 720, destroyOnHidden: true }}
            onOpenChange={setShowDarw}
            onFinish={async (values) => {
              await onFinish(values);
              return true;
            }}
            onReset={() => setShowDarw(false)}
            submitter={{ searchConfig: { submitText: '确定', resetText: '取消' } }}
          >
            <BetaSchemaForm layoutType="Embed" submitter={false} columns={formColumns} />
          </DrawerForm>
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