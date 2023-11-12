import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  createFromIconfontCN
} from '@ant-design/icons';
const NavBar = (props) => {
  const { t } = useTranslation();
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      'https://at.alicdn.com/t/font_2384333_rsw4qhrwjur.js'
    ],
  });
  let o = props?.path.split('/');
  const [openKeys, setOpenKeys] = useState(['/' + o[1], '/' + o[o.length - 2]]);
  const [selectKeys, setSelectKeys] = useState([decodeURIComponent(props?.path)]);
  const renderLanguages = (item) => {
    if (item?.translate) {
      return t(item?.translate);
    } else {
      return item.title;
    }
  };
  const onAddMenu = (item) => {
    let arr = [];
    const tabmenu = localStorage.getItem("tabmenu");
    if (tabmenu) {
      arr = JSON.parse(tabmenu);
      if (arr.find(s => s?.menuUrl === item?.menuUrl) === undefined) {
        arr.push(item);
        localStorage.setItem('tabmenu', JSON.stringify(arr));
      }
    } else {
      arr.push(item);
      localStorage.setItem('tabmenu', JSON.stringify(arr));
    }
  };
  // 获取菜单数据生成菜单
  const getNavMenuItems = (menusData) => {
    const menu = menusData;
    if (!menu) {
      return [];
    }

    return menu.map((item) => {
      if (!item.title || item?.type === 3 || item?.menuHidden === 1) {
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
          onClick={() => onAddMenu(item)}
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
        <a href="https://zhixiaowang.shop" target="_blank" style={{ minWidth: !props?.collapsed ? '200px' : '80px' }} />
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
  userinfo: PropTypes.object,
  path: PropTypes.string
};
export default NavBar;