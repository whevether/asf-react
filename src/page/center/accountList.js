import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { centerAccountSearchFrom,centerCreateAccountFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as centerAction from 'store/actions/center';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer,notification, Switch } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const AccountList = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [handleType, setHandleType] = useState('');//提交事件句柄
  const [initFromValue,setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
  }, []);
  // 分页对象
  const pagination = {
    total: props?.center?.listTotal,
    onChange: (page, pageSize) => {
      props?.centerFunc?.getCenterList(props?.history?.location?.pathname,{pageNo:page,pageSize:pageSize});
    },
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = () => {
      setHandleType('create');
      setShowDarw(true);
      setInitFromValue({
        'isEnable': true,
        'isPlatform': true,
        'isVisual': false,
        'allowCashOut': false,
        'allowCashIn': false,
        'autoCashOut': false,
        'payTypeEnable': 1
      });
  };
  //关闭抽屉
  const onClose = () =>{
    setShowDarw(false);
    setInitFromValue(null);
  }; 
  const mapHandleType = {
    'create': '添加账户',
    'modify': '修改账户'
  };
  //提交表单
  const onFinish = (data) => {
    let obj = data?.allowShopType.reduce((total,item)=>{
      return total+item;
    },0);
    props?.centerFunc?.handleAccount(handleType,Object.assign(data,{allowShopType: obj,AccountId:initFromValue.accountId}))
      .then(()=>{
        notification['success']({
          message: `${mapHandleType[handleType]}成功`,
          description: `${mapHandleType[handleType]}成功`
        });
        setShowDarw(false);
      });
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.centerFunc?.getCenterList(props?.history?.location?.pathname,{name:e.name});
  };
  const menu = (record) => {
    const list = [{
      name: '修改账户',
      permission: 'center.modifyaccount',
      click: (data) => {
        setInitFromValue(data);
        setHandleType('modify');
        setShowDarw(true);
      }
    }];
    return (
      <AuthControl action={props?.action} list={list} record={record} type="menu" />
    );
  };
  /* eslint-disable react/display-name */
  /* eslint-disable  react/no-multi-comp */
  const columns = [{
    title: '账户ID',
    dataIndex: 'accountId',
    key: 'accountId',
    width: 100
  }, {
    title: '账户名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '商户类型',
    dataIndex: 'shopTypeStr',
    width: 200,
    key: 'shopTypeStr',
    render: (text)=>{
      return <p style={{wordBreak:'break-all'}}>{text}</p>;
    }
  }, {
    title: '账户抵消金额',
    width: 100,
    dataIndex: 'balance',
    key: 'balance'
  }, {
    title: '账户是否启用',
    dataIndex: 'isEnable',
    width: 100,
    key: 'isEnable',
    render: (text,record)=>{
      let statusMap = {
        false: '禁用',
        true: '启用'
      };
      return props?.action.includes('center.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
      unCheckedChildren="禁用" onChange={(e) => { 
        props?.centerFunc?.modifyAccountStatus({id:record?.accountId,status:Number(e),type: 1}).then(() => {
          props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
        });
      }}/> : statusMap[text];
    }
  }, {
    title: '是否为平台账户',
    dataIndex: 'isPlatform',
    key: 'isPlatform',
    width: 100,
    render: (text,record) => {
      let statusMap = {
        false: '否',
        true: '是'
      };
      return props?.action.includes('center.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="是"
      unCheckedChildren="否" onChange={(e) => {
        
        props?.centerFunc?.modifyAccountStatus({id:record?.accountId,status:Number(e),type:2}).then(() => {
          props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
        });
      }}/> : statusMap[text];
    }
  }, {
    title: '是否为虚拟账户',
    dataIndex: 'isVisual',
    width: 100,
    key: 'isVisual',
    render: (text,record) => {
      let statusMap = {
        false: '否',
        true: '是'
      };
      return props?.action.includes('center.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="是"
      unCheckedChildren="否" onChange={(e) => {
        
        props?.centerFunc?.modifyAccountStatus({id:record?.accountId,status:Number(e),type:3}).then(() => {
          props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
        });
      }}/> : statusMap[text];
    }
  }, {
    title: '是否允许提款',
    dataIndex: 'allowCashOut',
    width: 100,
    key: 'allowCashOut',
    render: (text,record) => {
      let statusMap = {
        false: '否',
        true: '是'
      };
      return props?.action.includes('center.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="是"
      unCheckedChildren="否" onChange={(e) => {
        
        props?.centerFunc?.modifyAccountStatus({id:record?.accountId,status:Number(e),type:4}).then(() => {
          props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
        });
      }}/> : statusMap[text];
    }
  }, {
    title: '是否允许收款',
    dataIndex: 'allowCashIn',
    key: 'allowCashIn',
    width: 100,
    render: (text,record) => {
      let statusMap = {
        false: '否',
        true: '是'
      };
      return props?.action.includes('center.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="是"
      unCheckedChildren="否" onChange={(e) => {
        
        props?.centerFunc?.modifyAccountStatus({id:record?.accountId,status:Number(e),type:5}).then(() => {
          props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
        });
      }}/> : statusMap[text];
    }
  }, {
    title: '是否允许自动提款',
    dataIndex: 'autoCashOut',
    key: 'autoCashOut',
    width: 100,
    render: (text,record) => {
      let statusMap = {
        false: '否',
        true: '是'
      };
      return props?.action.includes('center.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="是"
      unCheckedChildren="否" onChange={(e) => {
        
        props?.centerFunc?.modifyAccountStatus({id:record?.accountId,status:Number(e),type:6}).then(() => {
          props?.centerFunc?.getCenterList(props?.history?.location?.pathname);
        });
      }}/> : statusMap[text];
    }
  }, {
    title: '最小提款金额',
    dataIndex: 'minCashOut',
    width: 100,
    key: 'minCashOut'
  },{
    title: '开始提款金额',
    dataIndex: 'seedCashOut',
    width: 100,
    key: 'seedCashOut'
  }, {
    title: '云支付账户名',
    dataIndex: 'cloudPayAccountName',
    width: 100,
    key: 'cloudPayAccountName'
  }, {
    title: '微信支付渠道key',
    width: 100,
    dataIndex: 'posWxChannelKey',
    key: 'posWxChannelKey'
  }, {
    title: '支付宝支付渠道key',
    dataIndex: 'posAliChannelKey',
    width: 100,
    key: 'posAliChannelKey'
  }, {
    title: '易极支付渠道key',
    width: 100,
    dataIndex: 'yijiChannelKey',
    key: 'yijiChannelKey'
  }, {
    title: '提款手续费',
    dataIndex: 'cashOutRate',
    width: 100,
    key: 'cashOutRate'
  }, {
    title: '默认手续费',
    dataIndex: 'defaultRate',
    width: 100,
    key: 'defaultRate'
  }, {
    title: '默认支付宝账户',
    width: 100,
    dataIndex: 'defaultAlipayMerNO',
    key: 'defaultAlipayMerNO'
  },{
    title: '默认微信账户',
    width: 100,
    dataIndex: 'defaultWepayMerNO',
    key: 'defaultWepayMerNO'
  },{
    title: '默认和包支付账户',
    width: 100,
    dataIndex: 'defaultCmPayMerNO',
    key: 'defaultCmPayMerNO'
  },{
    title: '默认翼支付账户',
    width: 100,
    dataIndex: 'defaultBestpayMerNO',
    key: 'defaultBestpayMerNO'
  },{
    title: '默认银联账户',
    width: 100,
    dataIndex: 'defaultUnionPayMerNO',
    key: 'defaultUnionPayMerNO'
  },{
    title: '默认沃钱包账户',
    width: 100,
    dataIndex: 'defaultUnicompayMerNO',
    key: 'defaultUnicompayMerNO'
  }, {
    title: '操作',
    key: 'action',
    width: 200,
    // eslint-disable-next-line
    render: (text) => {
      return (<Dropdown overlay={menu(text)} name="action">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>);
    }
  }];
  return (
    <div className="account-list">
      {head('账户列表')}
      {
        props?.center?.list && <BaseTable formObj={centerAccountSearchFrom} querySubmit={querySubmit} dataSource={props?.center?.list} columns={columns} pagination={pagination} action={props?.action} list={[{ name: '添加账户', permission: 'center.addaccount', type: 'primary', icon: <PlusCircleOutlined />, click: () => { onOpenDarw();  } }]} x={2300}/>
      }
      <Drawer
        title={mapHandleType[handleType]}
        width={720}
        visible={showDarw}
        onClose={onClose}
      >
        <BaseFrom list={centerCreateAccountFrom()} onFinish={onFinish} initialValues={initFromValue} onClose={onClose}/>
      </Drawer>
    </div>
  );
};
AccountList.propTypes = {
  x: PropTypes.number,
  centerFunc: PropTypes.object,
  center: PropTypes.object,
  action: PropTypes.array,
  history: PropTypes.object
};
export default connect(state => ({
  center: state?.center,
}), dispatch => {
  return{
    centerFunc:bindActionCreators(centerAction, dispatch)
  };
})(AccountList);