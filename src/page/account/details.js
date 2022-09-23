import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);
const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作一</Button>
      <Button>操作二</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment> 
);
const Details = () => {
  return (
    <div className="details">
      详情
    </div>
  );
};
export default Details;