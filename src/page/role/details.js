import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as roleAction from 'store/actions/role';
import * as permissionAction from 'store/actions/permission';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
import { head } from 'utils/head';
import { Badge, Descriptions } from 'antd';
const Details = (props)=>{
  let [searchParams] = useSearchParams();
  // let navigate = useNavigate();
  const [details, setDetails] = useState(null);
  // const [showDarw, setShowDarw] = useState(false);
  // const [fromData, setFromData] = useState(null);
  // const [initFromValue, setInitFromValue] = useState(null);
  useEffect(()=>{
    props?.roleFunc?.detailsRole({id: searchParams.get('id')})
      .then(res=>{
        setDetails(res);
      });
  },[]);
  return (
    <div className="role-details">
      {head('角色详情')}
      {
        details && <Fragment>
          <Descriptions
            title="角色详情"
            bordered
            style={{ marginBottom: '10px' }}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="角色名称">{details?.name}</Descriptions.Item>
            <Descriptions.Item label="排序">{details?.sort}</Descriptions.Item>
            <Descriptions.Item label="是否为系统权限">{details?.isSystem === 1 ? '系统权限' : '非系统权限'}</Descriptions.Item>
            <Descriptions.Item label="权限code">{details?.code}</Descriptions.Item>
            <Descriptions.Item label="是否启用">{details?.enable === 1 ? <Badge status="processing" text="启用" /> : '禁用'}</Descriptions.Item>
          </Descriptions>

          {/* <h3 style={{ fontWeight: 600 }}>权限api</h3>
          <BaseTable dataSource={details?.apis} columns={columns} />
          <Drawer
            title="修改api"
            width={720}
            open={showDarw}
            onClose={() => setShowDarw(false)}
          >
            <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
          </Drawer> */}
        </Fragment>
      }
    </div>
  );
};
Details.propTypes = {
  roleFunc: PropTypes.object,
  permissionFunc: PropTypes.object,
  userInfo: PropTypes.object,
  role: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  role: state?.role,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    roleFunc: bindActionCreators(roleAction, dispatch),
    permissionFunc: bindActionCreators(permissionAction, dispatch)
  };
})(Details);