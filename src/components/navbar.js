import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  createFromIconfontCN,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const NavBar = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
      '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
    ],
  });
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 获取菜单数据生成菜单
  const getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.title) {
        return null;
      }
      let itemPath;
      if (item?.externalLink) {
        itemPath = item?.externalLink;
      } else {
        itemPath = item?.menuUrl;
      }
      if (item?.children && item?.children.some(child => child.title)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <IconFont type={item.icon} />
                  <span>{item.title}</span>
                </span>
              ) : item.title
            }
            key={item.id || item.menuUrl}
          >
            {getNavMenuItems(item?.children)}
          </SubMenu>
        );
      }
      const icon = item.icon && <IconFont type={item.icon} />;
      return (
        <Menu.Item key={item.id || item.menuUrl}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target="_blank">
                {icon}<span>{item.title}</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                replace
              >
                {icon}<span>{item.title}</span>
              </Link>
            )
          }
        </Menu.Item>
      );
    });
  };
  return (
    <div className="slidebar">
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {getNavMenuItems(props?.userinfo?.permissionMenu)}
        {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
      </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
      </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
      </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu> */}
      </Menu>
    </div>
  );
};
export default NavBar;