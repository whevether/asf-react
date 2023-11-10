import React, { Fragment, useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { inputFrom, tenancyFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as tenancyAction from 'store/actions/tenancy';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Descriptions, Drawer, Modal, notification, Tag } from 'antd';
import {  ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl, BaseFrom } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 api 1: 修改api
  const [initFromValue, setInitFromValue] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  //获取账户列表
  useEffect(() => {
    props?.tenancyFunc?.fetchTenancyList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.tenancy?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.tenancyFunc?.fetchTenancyList({ pageNo: p, pageSize: size });
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
      setDrawType(type);
      setFromData(tenancyFrom);
      setShowDarw(true);
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      props?.tenancyFunc?.createTenancy(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加租户成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.tenancyFunc?.fetchTenancyList({ pageNo: 0, pageSize: 20 });
          }, 500);
        });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.tenancyFunc?.modifyTenancy(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改租户成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.tenancyFunc?.fetchTenancyList({ pageNo: 0, pageSize: 20 });
          }, 500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.tenancyFunc?.fetchTenancyList(e);
  };
  const accountColumns = [{
    title: '账户ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  }, {
    title: '账户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 150,
    // eslint-disable-next-line
    render: (text) => {
      return <img name="avatar" src={decodeURIComponent(text)} style={{ width: '50px', height: '50px', borderRadius: '50%', lineHeight: '50px' }} crossOrigin={text} />;
    }
  }, {
    title: '账户昵称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  }, {
    title: '账户名',
    dataIndex: 'username',
    width: 100,
    key: 'username'
  }, {
    title: '手机号码',
    dataIndex: 'telPhone',
    width: 100,
    key: 'telPhone'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    width: 100,
    key: 'email'
  }, {
    title: '性别',
    dataIndex: 'sex',
    width: 60,
    key: 'sex',
    render: (text) => {
      let sexMap = {
        0: '未知',
        1: '男',
        2: '女'
      };
      return sexMap[text];
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    key: 'status',
    // eslint-disable-next-line
    render: (text) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return statusMap[text];
    }
  }, {
    title: '登录ip',
    width: 100,
    dataIndex: 'loginIp',
    key: 'loginIp'
  }, {
    title: '登录地址',
    dataIndex: 'loginLocation',
    width: 100,
    key: 'loginLocation'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }];
  // 修改
  const list = [{
    name: '租户详情',
    permission: 'tenancy.details',
    click: (data) => {
      props?.tenancyFunc.detailsTenancy({ id: data?.id })
        .then(res => {
          Modal.confirm({
            width: '100%',
            content: (<Fragment>
              <Descriptions
                title="租户详情"
                bordered
                style={{ marginBottom: '10px' }}
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="租户名称">{res?.name}</Descriptions.Item>
                <Descriptions.Item label="排序">{res?.sort}</Descriptions.Item>
                <Descriptions.Item label="是否启用">{res?.status === 0 ? <Tag color="red" >禁用</Tag> : <Tag color="success" >启用</Tag>}</Descriptions.Item>
                <Descriptions.Item label="租户级别">{res?.level}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{timeToDate(res?.createTime, 'YYYY-MM-DD  HH:mm:ss')}</Descriptions.Item>
              </Descriptions>
              <h3 style={{ fontWeight: 600 }}>租户下属账户</h3>
              <BaseTable dataSource={res?.accounts} columns={accountColumns} />
            </Fragment>)
          });
        });
    }
  }, {
    name: '修改租户',
    permission: 'tenancy.modify',
    click: (data) => {
      setInitFromValue({
        id: data?.id,
        name: data?.name,
        sort: data?.sort,
        level: data?.level,
        status: data?.status
      });
      onOpenDarw(1);
    }
  }, {
    name: '删除租户',
    isAction: true,
    permission: 'tenancy.delete',
    click: (data) => {
      Modal.confirm({
        title: '确人删除租户!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除租户之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.tenancyFunc?.deleteTenancy({ id: data.id, status: 1 })
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除租户成功'
              });
              setTimeout(() => {
                props?.tenancyFunc?.fetchTenancyList();
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
    title: '租户名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 50
  }, {
    title: '优先级',
    dataIndex: 'level',
    width: 50,
    key: 'level'
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    render: (text) => {
      let mapStatus = {
        0: '禁用',
        1: '启用'
      };
      return mapStatus[text];
    }
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
    fixed: 'right',
    width: 150,
    // eslint-disable-next-line
    render: (record) => {
      return (<AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
    }
  }];
  const mapTitle = {
    0: '添加租户',
    1: '修改租户'
  };
  return (
    <div className="list">
      {head('租户列表')}
      <BaseTable formObj={inputFrom('租户名称', 'name')} querySubmit={querySubmit} dataSource={props?.tenancy?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加租户', permission: 'tenancy.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
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
  tenancyFunc: PropTypes.object,
  userInfo: PropTypes.object,
  tenancy: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  tenancy: state?.tenancy
}), dispatch => {
  return {
    tenancyFunc: bindActionCreators(tenancyAction, dispatch)
  };
})(Index);