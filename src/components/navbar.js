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
  const permissionMenu = localStorage.getItem('permissionMenu');
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
      const icon = item.icon && <IconFont type={item.icon} />;
      item.disabled = Boolean(!item.enable);
      item.key = item.menuUrl || item.id;
      item.icon = icon;
      if (item?.children && item?.children.some(child => child.title)) {
        item.type = 'group';
        item.label = (<span>{renderLanguages(item)}</span>);
        item.children = (getNavMenuItems(item?.children));
        delete item.enable;
        delete item.isSystem;
        delete item.type;
        delete item.code;
        delete item.createTime;
        delete item.id;
        delete item.menuHidden;
        delete item.name;
        delete item.parentId;
        delete item.subtitle;
        delete item.sort;
        delete item.title;
        delete item.menuUrl;
        return item;
      } else {
        delete item.children;
      }
      item.label = /^https?:\/\//.test(itemPath) ? (
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
      delete item.enable;
      delete item.isSystem;
      delete item.type;
      delete item.code;
      delete item.createTime;
      delete item.id;
      delete item.menuHidden;
      delete item.name;
      delete item.parentId;
      delete item.subtitle;
      delete item.sort;
      delete item.title;
      delete item.menuUrl;
      return item;
    });
  };
  const onOpenChange = (e) => {
    setOpenKeys(e);
  };
  const onSelectChange = (e) => {
    setSelectKeys(e.key);
  };
  return (
    <div className="slidebar" >
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
        items={permissionMenu ? getNavMenuItems(JSON.parse(permissionMenu)) : []}
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