import React, { useEffect, useState } from 'react';
// import {setCookie} from 'utils/storage';
import PropTypes from 'prop-types';
import * as loginAction from 'store/actions/login';
import { Button, Input, Tabs, Form, Checkbox, Tooltip, Select } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCookie, getCookie } from 'utils/storage';
import { setToken } from 'utils/request';
import { head } from 'utils/head';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as commonAction from 'store/actions/common';
const Login = (props) => {
  const [zindex, setZindex] = useState({});
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [type, setType] = useState('account');
  //跳转路由
  const handleGoNav = (e, params = {}) => {
    navigate(e, params);
  };
  useEffect(() => {
    if (getCookie('token')) {
      handleGoNav('/');
    }
    setTimeout(() => {
      document.getElementsByTagName('body')[0].className = '';
      setZindex({
        zIndex: '9999'
      });
    }, 1500);
  }, []);
  const onFinish = (values) => {
    props?.loginFunc?.loginUser(Object.assign(values, { loginType: type }))
      .then(res => {
        setCookie('token', res?.token);
        setCookie('refreshToken', res?.refreshToken);
        setToken(res?.token);
        props?.commonFunc?.fetchUserInfo().then(()=>{
          handleGoNav('/');
        });
      });
  };
  return (
    <div className="login-content" style={zindex}>
      {head('登录')}
      <div className="header">
        <div className="logo">
          <a href="https://www.keep-wan.me" target="_blank" />
        </div>
        <div className="title">
          wchat 社交管理系统
        </div>
      </div>
      <div className="content">
        <Tabs activeKey={type} onChange={setType} centered items={[{ label: t('common.account.password'), key: 'account' }, { label: t('common.phone.login'), key: 'mobile' }, { label: t('common.email.password'), key: 'email' }]} />
        {
          <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true, tenancyId: '1' }}
            onFinish={onFinish}
          >
            <Form.Item name="tenancyId" rules={[{ required: true, message: '请选择需要登录的租户' }]}>
              <Select style={{ width: '100%' }} placeholder="选择需要登录的租户">
                {
                  props?.tenancyList && props?.tenancyList.map((value, index) => (
                    <Select.Option value={value.id} key={index}>{value.name}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            {
              type === 'account' &&
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入您的账户名' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账户名" />
              </Form.Item>
            }
            {
              type === 'mobile' &&
              <Form.Item
                name="username"
                rules={[{ pattern: /^1[0-9]{10}$/, message: '输入的手机号码正确' }, { required: true, message: '请输入您的手机号码' }]}
              >
                <Input type="number" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号码" />
              </Form.Item>
            }
            {
              type === 'email' &&
              <Form.Item
                name="username"
                rules={[{
                  type: 'email',
                  message: '请输入正确的邮箱地址!',
                }, { required: true, message: '请输入您的邮箱地址' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱地址" />
              </Form.Item>
            }
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入您的账户密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="账户密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {t('common.login')}
              </Button>
            </Form.Item>
          </Form>
        }
        <div className="footer">
          <Tooltip title="github地址">
            <a title="github" target="_blank" href="https://github.com/whevether/asf"><GithubOutlined /></a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  tenancyList: PropTypes.arrayOf(Object),
  loginUser: PropTypes.func,
  fetchUserInfo: PropTypes.func,
  loginFunc: PropTypes.object,
  commonFunc: PropTypes.object
};
const mapStateToProps = (state) => {
  return {
    tenancyList: state.common.tenancyList
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginFunc: bindActionCreators(loginAction, dispatch),
    commonFunc: bindActionCreators(commonAction,dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
