import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as departmentAction from 'store/actions/department';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeToDate } from 'utils/storage';
import { head } from 'utils/head';
import { useSearchParams } from 'react-router-dom';
import './details.less';
import { Descriptions, Tag } from 'antd';
import { BaseTable } from 'components/index';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  useEffect(()=>{
    props?.departmentFunc?.detailsDepartment({id: searchParams.get('id')})
      .then(res=>{
        setDetails(res);
      });
  },[]);
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
      return <img name="avatar" src={text} style={{ width: '50px', height: '50px', borderRadius: '50%', lineHeight: '50px' }} crossOrigin={text} />;
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
      return  statusMap[text];
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
  const roleColumns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: '100px'
  }, {
    title: '角色名称',
    dataIndex: 'name',
    width: 150,
    key: 'name'
  }, {
    title: '角色状态',
    dataIndex: 'enable',
    width: 150,
    key: 'enable',
    render: (text) => {
      const mapStatus = {
        0: '禁用',
        1: '启用'
      };
      return mapStatus[text];
    }
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
  }];
  return (
    <div className="department-details">
      {head('部门详情')}
      {
        details && <Fragment>
          <Descriptions
            title="部门详情"
            bordered
            style={{ marginBottom: '10px' }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="部门名称">{details?.name}</Descriptions.Item>
            <Descriptions.Item label="是否启用">{details?.enable === 1 ? <Tag color="success">是</Tag> : <Tag color="red">否</Tag>}</Descriptions.Item>
            <Descriptions.Item label="所属租户">{props?.tenancyList.find(f=>f.id === details?.tenancyId)?.name}</Descriptions.Item>
            <Descriptions.Item label="排序">{details?.sort}</Descriptions.Item>
          </Descriptions>

          <h3 style={{ fontWeight: 600 }}>部门下属账户</h3>
          <BaseTable dataSource={details?.accounts} columns={accountColumns} />

          <h3 style={{ fontWeight: 600 }}>所拥有角色</h3>
          <BaseTable dataSource={details?.roles} columns={roleColumns} />
        </Fragment>
      }
    </div>
  );
};
Details.propTypes = {
  departmentFunc: PropTypes.object,
  userInfo: PropTypes.object,
  department: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  authApi: state?.authApi,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    departmentFunc: bindActionCreators(departmentAction, dispatch)
  };
})(Details);