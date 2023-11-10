import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as roleAction from 'store/actions/role';
import { connect } from 'react-redux';
import { timeToDate } from 'utils/storage';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
import { head } from 'utils/head';
import { Descriptions, Tag } from 'antd';
import { BaseTable } from 'components/index';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  useEffect(()=>{
    props?.roleFunc?.detailsRole({id: searchParams.get('id')})
      .then(res=>{
        setDetails(res);
      });
  },[]);
  const departementColumns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  }, {
    title: '部门名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
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
    title: '部门状态',
    dataIndex: 'enable',
    width: 80,
    key: 'enable',
    render: (text) => {
      const mapStatus = {
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
  }];
  const permissionColumns = [{
    title: '权限ID',
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
    title: '权限代码',
    dataIndex: 'code',
    key: 'code',
    width: 100,
  }, {
    title: '父级id',
    dataIndex: 'parentId',
    key: 'parentId',
    width: 100,
  }, {
    title: '权限名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  }, {
    title: '权限类型',
    dataIndex: 'type',
    key: 'type',
    width: 80,
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
    width: 60,
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
    width: 80,
    key: 'enable',
    // eslint-disable-next-line
    render: (text, record) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return statusMap[text];
    }
  }, {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
    key: 'sort'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }];
  return (
    <div className="role-details">
      {head('角色详情')}
      {
        details && <Fragment>
          <Descriptions
            title="角色详情"
            bordered
            style={{ marginBottom: '10px' }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="角色名称">{details?.name}</Descriptions.Item>
            <Descriptions.Item label="是否启用">{details?.enable === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
            <Descriptions.Item label="所属租户">{props?.tenancyList.find(f=>f.id === details?.tenancyId)?.name}</Descriptions.Item>
            <Descriptions.Item label="角色说明">{details?.description}</Descriptions.Item>
          </Descriptions>

          <h3 style={{ fontWeight: 600 }}>所属部门</h3>
          <BaseTable dataSource={details?.department} columns={departementColumns} />

          <h3 style={{ fontWeight: 600 }}>拥有权限</h3>
          <BaseTable dataSource={details?.permission} columns={permissionColumns} />
        </Fragment>
      }
    </div>
  );
};
Details.propTypes = {
  roleFunc: PropTypes.object,
  userInfo: PropTypes.object,
  role: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  role: state?.role,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    roleFunc: bindActionCreators(roleAction, dispatch)
  };
})(Details);