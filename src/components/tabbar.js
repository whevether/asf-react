import React from 'react';
import PropTypes from 'prop-types';
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
Tabbar.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
};
export default Tabbar;