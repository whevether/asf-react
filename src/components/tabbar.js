import React from 'react';
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';
const Tabbar = (props) => {
  return(
    <div className="tabbar">
      <div onClick={props?.toggleMenu} className="collapsed">
        {React.createElement(props?.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </div>
    </div>
  );
};
export default Tabbar;