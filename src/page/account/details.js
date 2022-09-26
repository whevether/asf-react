import { Card, Row, Col, Avatar } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { head } from 'utils/head';
import * as accountAction from 'store/actions/account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
import { ContactsOutlined } from '@ant-design/icons';
import './details.less';
const Details = (props) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  let [searchParams] = useSearchParams();
  const onGetAaccountDetails = () => {
    setLoading(true);
    props?.accountFunc.getAccountDetails({ id: searchParams.get('id') })
      .then(res => {
        setDetails(res);
        setLoading(false);
      });
  };
  useEffect(() => {
    onGetAaccountDetails();
  }, []);
  const mapSex = {
    0: '未知',
    1: '男',
    2: '女'
  };
  const mapStatus = {
    0: '禁用',
    1: '启用'
  };
  return (
    <div className="details">
      {head('账户详情')}
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <Fragment>
              <div className="avatarHolder">
                <Avatar alt="" src={details?.avatar} className="avatar" />
                <div className="name">用户名称: {details?.name}</div>
                <div>用户账号: {details?.username}</div>
                <div>用户标识: {details?.id}</div>
              </div>
              <div className="detail">
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  最后登陆ip: {details?.loginIp}
                </p>
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  最后登陆地址: {details?.loginLocation}
                </p>
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  最后登陆时间: {details?.loginTime}
                </p>
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  手机号码: {details?.telPhone}
                </p>
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  邮箱地址: {details?.email}
                </p>
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  账号性别: {mapSex[details?.sex]}
                </p>
                <p>
                  <ContactsOutlined
                    style={{ marginRight: 8 }} />
                  账号状态: {mapStatus[details?.status]}
                </p>
              </div>
            </Fragment>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className="tabsCard"
            bordered={false}
            loading={loading}
          >
            <div className="userinfo-wrapper">
              <h3 style={{ fontWeight: 600 }}>用户角色</h3>
              {/* <BaseTable dataSource={props?.examine?.freeUser} columns={columns} pagination={pagination} /> */}
            </div>
            <div className="userinfo-wrapper">
              <h3 style={{ fontWeight: 600 }}>用户岗位</h3>
              {/* <BaseTable dataSource={props?.examine?.freeUser} columns={columns} pagination={pagination} /> */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default connect(state => ({
  account: state?.account
}), dispatch => {
  return {
    accountFunc: bindActionCreators(accountAction, dispatch)
  };
})(Details);