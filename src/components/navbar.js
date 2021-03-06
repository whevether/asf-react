import React, { useState } from 'react';
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
  const [openKeys, setOpenKeys] = useState(['/'+props?.path.split('/')[1]]);
  const [selectKeys,setSelectKeys] = useState([props?.path]);
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
        itemPath = item?.menuUrl ?? '';
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
            key={item.menuUrl || item.id}
          >
            {getNavMenuItems(item?.children)}
          </SubMenu>
        );
      }
      const icon = item.icon && <IconFont type={item.icon} />;
      return (
        <Menu.Item key={item.menuUrl || item.id}>
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
  const onOpenChange = (e) => {
    setOpenKeys(e);
  };
  const onSelectChange = (e) => {
    setSelectKeys(e);
  };
  return (
    <div className="slidebar" style={{minWidth:!props?.collapsed?'200px':'80px' }}>
      <div className="logo" >
        <a href="https://www.keep-wan.me" target="_blank" style={{minWidth:!props?.collapsed?'200px':'80px' }}/>
      </div>
      <Menu
        selectedKeys={selectKeys}
        openKeys={openKeys}
        mode="inline"
        theme="dark"
        onOpenChange={onOpenChange}
        onSelect = {onSelectChange}
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
  userinfo: PropTypes.object,
  path: PropTypes.string
};
export default NavBar;