import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { inputFrom, postFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as postAction from 'store/actions/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Dropdown, Modal, notification } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl, BaseFrom } from 'components/index';
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
    props?.postFunc?.fetchPostList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.post?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.postFunc?.fetchPostList({ pageNo: p, pageSize: size });
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
      let from = postFrom();
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
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      props?.postFunc?.createPost(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加岗位成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.postFunc?.fetchPostList({ pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.postFunc?.modifyPost(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改岗位成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.postFunc?.fetchPostList({  pageSize: pageSize });
          }, 500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.postFunc?.fetchPostList(e);
  };
  // 修改
  const list = [{
    name: '岗位详情',
    permission: 'post.details',
    click: (data) => {
      navigate(`/control/post/details?id=${data?.id}`);
    }
  }, {
    name: '修改岗位',
    permission: 'post.modify',
    click: (data) => {
      setInitFromValue({
        id: data?.id,
        name: data?.name,
        sort: data?.sort,
        tenancyId: data?.tenancyId,
        description: data?.description,
        enable: data?.enable
      });
      onOpenDarw(1);
    }
  }, {
    name: '删除岗位',
    isAction: true,
    permission: 'post.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除岗位!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除岗位之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.postFunc?.deletePost(data.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除岗位成功'
              });
              setTimeout(() => {
                props?.postFunc?.fetchPostList({pageSize:pageSize});
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
    title: '岗位名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sore',
    width: 100
  }, {
    title: '岗位说明',
    dataIndex: 'description',
    key: 'description',
    width: 150
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
    0: '添加岗位',
    1: '修改岗位'
  };
  return (
    <div className="list">
      {head('岗位列表')}
      <BaseTable formObj={inputFrom('岗位名称', 'name')} querySubmit={querySubmit} dataSource={props?.post?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加岗位', permission: 'post.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
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
  postFunc: PropTypes.object,
  userInfo: PropTypes.object,
  post: PropTypes.object,
  postList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  tenancyList: PropTypes.arrayOf(Object),
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  post: state?.post,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    postFunc: bindActionCreators(postAction, dispatch)
  };
})(Index);