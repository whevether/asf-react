import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'antd';
/* 批量控制权限按钮 */
const AuthControl = (props) => {
    const renderAuthMenu = () => {
        if (Array.isArray(props?.list) && props?.list.length > 0) {
            if (props?.type == 'menu') {
                return (<Menu>
                    {props?.list.map((item, i) => {
                        return props?.userInfo?.actions?.includes(item.permission) ? <Menu.Item key={i} onClick={() => item?.click(props?.record)} style={(props?.record?.isSystem === 1 && !(props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === props?.record?.tenancyId)) ? {pointerEvents: 'none',color: '#ccc',cursor:'not-allowed'} : null} {...item?.rest}>{item?.name}</Menu.Item> : null;
                    })}
                </Menu>);
            } else {
                return props?.list.map((item, i) => {
                    return props?.userInfo?.actions?.includes(item.permission) ? <Button key={i} onClick={() => item?.click(props?.record)} type={item?.type} icon={item?.icon} loading={item?.loading} size={item?.size} style={{marginLeft:'10px',marginBottom: '10px'}} {...item?.rest}>{item?.name}</Button> : null;

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