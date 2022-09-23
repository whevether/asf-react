import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import {getCookie } from 'utils/storage';
import {
  createFromIconfontCN
} from '@ant-design/icons';
const { SubMenu } = Menu;
const NavBar = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      'https://at.alicdn.com/t/font_2384333_rsw4qhrwjur.js'
    ],
  });
  let o = props?.path.split('/');
  const [openKeys, setOpenKeys] = useState(['/'+o[1],'/'+o[o.length-2]]);
  const [selectKeys,setSelectKeys] = useState([decodeURIComponent(props?.path)]);
  const renderLanguages = (item)=>{
    if(props?.languages.length > 0 && item?.translate){
      return props?.languages?.find(f=>f?.key === item?.translate && f.languages === getCookie('languages'))?.value;
    }else{
      return item.title;
    }
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
        itemPath = item?.menuUrl ?? '';
      }
      const icon = item.icon && <IconFont type={item.icon} />;
      if (item?.children && item?.children.some(child => child.title)) {
        return (
          <SubMenu
            disabled={Boolean(!item.enable)}
            title={
              item.icon ? (
                <span>
                  {icon}
                  <span>{renderLanguages(item)}</span>
                </span>
              ) : item.title
            }
            key={item.menuUrl || item.id}
          >
            {getNavMenuItems(item?.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item disabled={Boolean(!item.enable)} key={item.menuUrl || item.id}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target="_blank">
                {icon}<span>{renderLanguages(item)}</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                onClick={()=>props?.onAddTagMenu(item)}
                replace
              >
                {icon}<span>{renderLanguages(item)}</span>
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
    setSelectKeys(e.key);
  };
  return (
    <div className="slidebar" >
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
  onAddTagMenu: PropTypes.func,
  userinfo: PropTypes.object,
  languages: PropTypes.arrayOf(Object),
  path: PropTypes.string
};
export default NavBar;