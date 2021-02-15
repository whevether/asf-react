import React, { useEffect, useState } from 'react';
// import {setCookie} from 'utils/storage';
import PropTypes from 'prop-types';
import { Button, Input, Tabs,Form,Checkbox,Tooltip } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
const Login = () => {
  const [zindex,setZindex] = useState({});
  const [type, setType] = useState('account');
  useEffect(() => {
    setTimeout(() => {
      setZindex({
        zIndex: '9999'
      });
    }, 1500);
  },[]);
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="login-content" style={zindex}>
      <div className="header">
        <div className="logo">
          <a href="https://www.keep-wan.me" target="_blank" />
        </div>
        <div className="title">
          asf 多租户权限管理系统
        </div>
      </div>
      <div className="content">
        <Tabs activeKey={type} onChange={setType} centered>
          <Tabs.TabPane
            key="account"
            tab="账户密码登录"
          />
          <Tabs.TabPane
            key="mobile"
            tab="手机号登录"
          />
          <Tabs.TabPane
            key="email"
            tab="邮箱登录"
          />
        </Tabs>
        {
          <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
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
                rules={[{pattern: /^1[0-9]{10}$/,message: '输入的手机号码正确'},{ required: true, message: '请输入您的手机号码' }]}
              >
                <Input type="number"  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号码" />
              </Form.Item>
            }
            {
              type === 'email' && 
                <Form.Item
                name="username"
                rules={[{
                  type: 'email',
                  message: '请输入正确的邮箱地址!',
                },{ required: true, message: '请输入您的邮箱地址' }]}
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
                登录
              </Button>
            </Form.Item>
          </Form>
        }
      </div>
      <div className="footer">
        <Tooltip title="github地址">
          <a title="github" target="_blank" href="https://github.com/whevether/asf"><GithubOutlined /></a>
        </Tooltip>
      </div>
    </div>
  );
};
Login.propTypes = {
  history: PropTypes.object.isRequired
};
export default Login;