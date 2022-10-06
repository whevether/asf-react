import { Card, Row, Col, Avatar, Tag, notification, Modal, Upload } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { head } from 'utils/head';
import * as accountAction from 'store/actions/account';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
import { AppstoreAddOutlined, AimOutlined, FieldTimeOutlined, PhoneOutlined, AlignCenterOutlined, UsergroupDeleteOutlined, UserOutlined, UserSwitchOutlined, BankOutlined, InboxOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { timeToDate } from 'utils/storage';
import { BaseTable } from 'components/index';
import './details.less';
const Details = (props) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
  const postColumns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 150,
    key: 'tenancyId',
    render: (text) => {
      let data = props?.tenancyList.find(f => f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: '岗位名',
    dataIndex: 'name',
    key: 'name',
    width: '100px'
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sore',
    width: '100px'
  }, {
    title: '岗位说明',
    dataIndex: 'description',
    key: 'description',
    width: '100px'
  }, {
    title: '状态',
    dataIndex: 'enable',
    key: 'enable',
    render: (text) => {
      return mapStatus[text];
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
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
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 150,
    key: 'tenancyId',
    render: (text) => {
      let data = props?.tenancyList.find(f => f.id == text);
      return <span>{data?.name}</span>;
    }
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
    <div className="account-details">
      {head('账户详情')}
      <Row gutter={24}>
        <Col lg={8} md={24} sm={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <Fragment>
              <div className="avatarHolder">
                <Avatar alt="" src={decodeURIComponent(details?.avatar)} className="avatar" onClick={() => setShowModal(true)} style={{cursor: 'pointer'}}/>
                <div className="name m-10">用户名称: <Tag color="#108ee9">{details?.name}</Tag></div>
                <div className="m-10">用户账号: <Tag color="#108ee9">{details?.username}</Tag></div>
                <div className="m-10">用户标识: <Tag color="#108ee9">{details?.id}</Tag></div>
              </div>
              <div className="detail">
                <p>
                  <AppstoreAddOutlined
                    style={{ marginRight: 8 }} />
                  最后登陆ip: <Tag color="#108ee9">{details?.loginIp}</Tag>
                </p>
                <p>
                  <AimOutlined
                    style={{ marginRight: 8 }} />
                  最后登陆地址: <Tag color="#108ee9">{details?.loginLocation}</Tag>
                </p>
                <p>
                  <FieldTimeOutlined
                    style={{ marginRight: 8 }} />
                  最后登陆时间: <Tag color="#108ee9">{timeToDate(details?.loginTime, 'YYYY-MM-DD  HH:mm:ss')}</Tag>
                </p>
                <p>
                  <PhoneOutlined
                    style={{ marginRight: 8 }} />
                  手机号码: <Tag color="#108ee9">{details?.telPhone}</Tag>
                </p>
                <p>
                  <AlignCenterOutlined
                    style={{ marginRight: 8 }} />
                  邮箱地址: <Tag color="#108ee9">{details?.email}</Tag>
                </p>
                <p>
                  <UsergroupDeleteOutlined
                    style={{ marginRight: 8 }} />
                  账号性别: <Tag color="#108ee9">{mapSex[details?.sex]}</Tag>
                </p>
                <p>
                  <UserOutlined
                    style={{ marginRight: 8 }} />
                  账号状态: <Tag color="#108ee9">{mapStatus[details?.status]}</Tag>
                </p>
                <p>
                  <UserSwitchOutlined
                    style={{ marginRight: 8 }} />
                  所属部门: <Tag color="#108ee9">{details?.department?.name}</Tag>
                </p>
                <p>
                  <BankOutlined style={{ marginRight: 8 }} />
                  所属租户: <Tag color="#108ee9">{details?.tenancys?.name}</Tag>
                </p>
              </div>
            </Fragment>
          </Card>
        </Col>
        <Col lg={16} md={24} sm={24}>
          <Card
            className="tabsCard"
            bordered={false}
            loading={loading}
          >
            {
              details && <Fragment>
                <div className="userinfo-wrapper">
                  <h3 style={{ fontWeight: 600 }}>用户角色</h3>
                  <BaseTable dataSource={details?.roles} columns={roleColumns} />
                </div>
                <div className="userinfo-wrapper">
                  <h3 style={{ fontWeight: 600 }}>用户岗位</h3>
                  <BaseTable dataSource={details?.posts} columns={postColumns} />
                </div>
              </Fragment>
            }
          </Card>
        </Col>
      </Row>
      <Modal title="修改头像" open={showModal} closable={true} onCancel={()=>setShowModal(false)} onOk={()=>setShowModal(false)}>
        <Upload.Dragger name="files" customRequest={(obj) => {
          let formData = new FormData();
          formData.append('file', obj.file);
          formData.append('type', 'avatar');
          props?.commonFunc?.upload(formData)
            .then(res => {
              if (res?.length <= 0) {
                notification.error({ message: '上传头像为空，请确认' });
                return;
              }
              props?.accountFunc.modifyAccountAvatar({ id: details?.id, avatar: res[0]?.url })
                .then(() => {
                  onGetAaccountDetails();
                  setShowModal(false);
                });
            });
        }} beforeUpload={(file) => {
          const isImg = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/svg+xml';
          if (!isImg) {
            notification.error({ message: '只能上传图片格式' });
          }
          return isImg;
        }} accept="image/*">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

Details.propTypes = {
  accountFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  account: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  account: state?.account,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    accountFunc: bindActionCreators(accountAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  };
})(Details);