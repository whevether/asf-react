import React from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import {
  createFromIconfontCN
} from '@ant-design/icons';
const { SubMenu } = Menu;
const NavBar = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_2384333_rsw4qhrwjur.js'
    ],
  });
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
      <div className="logo">
        <a href="https://www.keep-wan.me" target="_blank" />
      </div>
      <Menu
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={props?.collapsed}
      >
        {getNavMenuItems(props?.userinfo?.permissionMenu)}
      </Menu>
      {/* <Button type="primary" onClick={toggleCollapsed} className="collapsed">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button> */}
    </div>
  );
};
NavBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  userinfo: PropTypes.object
};
export default NavBar;