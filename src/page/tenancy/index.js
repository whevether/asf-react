import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { inputFrom,tenancyFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as tenancyAction from 'store/actions/tenancy';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Dropdown, Modal, notification } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl, BaseFrom } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 api 1: 修改api
  const [initFromValue, setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.tenancyFunc?.fetchTenancyList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.tenancy?.listTotal,
    onChange: (page, pageSize) => {
      props?.tenancyFunc?.fetchTenancyList({ pageNo: page, pageSize: pageSize });
    },
    pageSize: 20,
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
  // 修改
  const list = [{
    name: '租户详情',
    permission: 'tenancy.details',
    click: (data) => {
      console.log(data);
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
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  }, {
    title: '租户名',
    dataIndex: 'name',
    key: 'name',
    width: '100px'
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sore',
    width: '100px'
  }, {
    title: '优先级',
    dataIndex: 'level',
    width: '100px',
    key: 'level'
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
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
        visible={showDarw}
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
  tenancy: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  tenancy: state?.tenancy
}), dispatch => {
  return {
    tenancyFunc: bindActionCreators(tenancyAction, dispatch)
  };
})(Index);