import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { getCookie } from 'utils/storage';
import {
  createFromIconfontCN
} from '@ant-design/icons';
const NavBar = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      'https://at.alicdn.com/t/font_2384333_rsw4qhrwjur.js'
    ],
  });
  let o = props?.path.split('/');
  const [openKeys, setOpenKeys] = useState(['/' + o[1], '/' + o[o.length - 2]]);
  const [selectKeys, setSelectKeys] = useState([decodeURIComponent(props?.path)]);
  const renderLanguages = (item) => {
    if (props?.languages.length > 0 && item?.translate) {
      return props?.languages?.find(f => f?.key === item?.translate && f.languages === getCookie('languages'))?.value;
    } else {
      return item.title;
    }
  };
  // 获取菜单数据生成菜单
  const getNavMenuItems = (menusData) => {
    const menu = menusData;
    if (!menu) {
      return [];
    }

    return menu.map((item) => {
      if (!item.title) {
        return null;
      }
      let itemPath;
      if (item?.externalLink) {
        itemPath = item?.externalLink;
      } else {
        itemPath = item?.menuUrl ?? '';
      }
      let menu = {};
      const icon = item.icon && <IconFont type={item.icon} />;
      menu.disabled = Boolean(!item.enable);
      menu.key = item.menuUrl || item.id;
      menu.icon = icon;
      menu.label = /^https?:\/\//.test(itemPath) ? (
        <a href={itemPath} target="_blank">
          <span>{renderLanguages(item)}</span>
        </a>
      ) : (
        <Link
          to={itemPath}
          onClick={() => props?.onAddTagMenu(item)}
          replace
        >
          <span>{renderLanguages(item)}</span>
        </Link>
      );
      if (item?.children && item?.children.some(child => child.title)) {
        // item.type = 'group';
        menu.label = (<span>{renderLanguages(item)}</span>);
        menu.children = (getNavMenuItems(item?.children));
        return menu;
      }
      return menu;
    });
  };
  const onOpenChange = (e) => {
    setOpenKeys(e);
  };
  const onSelectChange = (e) => {
    setSelectKeys(e.key);
  };
  return (
    <div className={`slidebar ${props?.collapsed ? 'close' : ''}`}>
      <div className="logo" >
        <a href="https://zytravel.shop" target="_blank" style={{ minWidth: !props?.collapsed ? '200px' : '80px' }} />
      </div>
      <Menu
        selectedKeys={selectKeys}
        openKeys={openKeys}
        mode="inline"
        theme="dark"
        onOpenChange={onOpenChange}
        onSelect={onSelectChange}
        items={getNavMenuItems(props?.userinfo?.permissionMenu)}
        inlineCollapsed={props?.collapsed}
      />
      {/* {getNavMenuItems(props?.userinfo?.permissionMenu)} */}
      {/* </Menu> */}
      {/* <Button type="primary" onClick={toggleCollapsed} className="collapsed">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button> */}
    </div>
  );
};
NavBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onAddTagMenu: PropTypes.func,
  userinfo: PropTypes.object,
  languages: PropTypes.arrayOf(Object),
  path: PropTypes.string
};
export default NavBar;