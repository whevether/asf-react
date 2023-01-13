import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'antd';
import {
    createFromIconfontCN, DownOutlined
} from '@ant-design/icons';
/* 批量控制权限按钮 */
const AuthControl = (props) => {
    const IconFont = createFromIconfontCN({
        scriptUrl: [
            'https://at.alicdn.com/t/font_2384333_rsw4qhrwjur.js'
        ],
    });
    const renderAuthMenu = () => {
        if (Array.isArray(props?.list) && props?.list.length > 0) {
            if (props?.type == 'menu') {
                // return (<Menu>
                //     {props?.list.map((item, i) => {
                //         return props?.userInfo?.actions?.includes(item.permission) ? <Menu.Item key={i} onClick={() => item?.click(props?.record)} style={(props?.record?.isSystem === 1 && !(props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === props?.record?.tenancyId)) ? {pointerEvents: 'none',color: '#ccc',cursor:'not-allowed'} : null} {...item?.rest}>{item?.name}</Menu.Item> : null;
                //     })}
                // </Menu>);
                let items = props?.list.map((item, i) => {
                    let menu = {};
                    const icon = item.icon && <IconFont type={item.icon} />;
                    if (props?.userInfo?.actions?.includes(item.permission)) {
                        menu.key = i;
                        menu.disabled = (props?.record?.isSystem === 1 && !(props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === props?.record?.tenancyId));
                        menu.icon = icon;
                        menu.label = <span onClick={() => item?.click(props?.record)} >{item?.name}</span>;
                    }
                    return menu;
                });
                return (<Dropdown name="action" menu={{ items }} arrow>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        操作 <DownOutlined />
                    </a>
                </Dropdown>);
            }else {
                return props?.list.map((item, i) => {
                    return props?.userInfo?.actions?.includes(item.permission) ? <Button key={i} onClick={() => item?.click(props?.record)} type={item?.type} icon={item?.icon} loading={item?.loading} size={item?.size} style={{ marginLeft: '10px', marginBottom: '10px' }} {...item?.rest}>{item?.name}</Button> : null;
    
                });
            }
        } 
    };
    return (
        <>
            {renderAuthMenu()}
        </>
    );
};
AuthControl.propTypes = {
    list: PropTypes.arrayOf(Object),
    userInfo: PropTypes.object,
    record: PropTypes.object,
    type: PropTypes.string
};
export default AuthControl;