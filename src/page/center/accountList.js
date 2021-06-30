import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { centerAccountSearchFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as centerAction from 'store/actions/center';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer,notification, Switch } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
const AccountList = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [darwTitle, setDarwTitle] = useState('');
  const [initFromValue,setInitFromValue] = useState(null);
  //获取账户列表
  useEffect(() => {
    props?.centerFunc?.getCenterAccountList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.center?.listTotal,
    onChange: (page, pageSize) => {
      props?.centerFunc?.getCenterAccountList({pageNo:page,pageSize:pageSize});
    },
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (title) => {
      setDarwTitle(title);
      setShowDarw(true);
  };
  //提交表单
  const onFinish = (data) => {
    data.departmentId = data.departmentId.slice(-1)[0];
    props?.centerFunc?.createAccount(data)
      .then(() => {
        notification['success']({
          message: '添加成功',
          description: '添加账户成功'
        });
        setShowDarw(false);
      });
  };
  // 提交表格查询
  const querySubmit = (e) => {
    console.log(e);
  };
  // 修改
  const list = [{
    name: '账户详情',
    permission: 'account.details',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户',
    permission: 'account.modify',
    click: (data) => {
      setInitFromValue({
        'tenancyId': data?.tenancyId,
        'departmentId': [data?.department?.pid,data?.department?.id],
        'username': data?.name,
        'password': data?.password,
        'telphone': data?.telPhone.replace('86+',''),
        'email': data?.email,
        'name': data?.name,
        'sex': data?.sex
      });
      onOpenDarw('编辑账户');
    }
  }, {
    name: '分配账户角色',
    permission: 'account.assignrole',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '分配账户部门',
    permission: 'account.assigndepartment',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '分配账户岗位',
    permission: 'account.assignpost',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '删除账户',
    permission: 'account.delete.[0-9]{1,12}',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户密码',
    permission: 'account.resetpassword',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户手机',
    permission: 'account.modifytelphone',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户邮箱',
    permission: 'account.modifyemail',
    click: (data) => {
      console.log(data);
    }
  }, {
    name: '修改账户头像',
    permission: 'account.modifyavatar',
    click: (data) => {
      console.log(data);
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl action={props?.action} list={list} record={record} type="menu" />
    );
  };
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
    dataIndex: 'allowShopType',
    width: 100,
    key: 'allowShopType',
    render: (text,row)=>{
      return row?.allowShopTypeValue[text];
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
      return props?.action.includes('account.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
      unCheckedChildren="禁用" onChange={(e) => {
        // props?.centerFunc?.modifyAccountStatus({id:record?.id,status:Number(e)}).then(() => {
        //   props?.centerFunc?.fetchAccountList();
        // });
      }}/> : statusMap[text];
    }
  }, {
    title: '是否为平台账户',
    dataIndex: 'isPlatform',
    key: 'isPlatform',
    width: 100,
    render: (text) => {
      return text === true ? '是': '否';
    }
  }, {
    title: '是否为虚拟账户',
    dataIndex: 'IsVisual',
    width: 100,
    key: 'IsVisual',
    render: (text) => {
      return text === true ? '是': '否';
    }
  }, {
    title: '是否允许提款',
    dataIndex: 'allowCashOut',
    width: 100,
    key: 'allowCashOut',
    render: (text)=>{
      return text === true ? '是': '否';
    }
  }, {
    title: '是否允许收款',
    dataIndex: 'allowCashIn',
    key: 'allowCashIn',
    width: 100,
    render: (text)=>{
      return text === true ? '是': '否';
    }
  }, {
    title: '是否允许自动提款',
    dataIndex: 'autoCashOut',
    key: 'autoCashOut',
    width: 100,
    render: (text) => {
      return text === true ? '是': '否';
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
        props?.center?.list && <BaseTable formObj={centerAccountSearchFrom} querySubmit={querySubmit} dataSource={props?.center?.list} columns={columns} pagination={pagination} action={props?.action} list={[{ name: '添加账户', permission: 'account.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null);onOpenDarw('创建账户');  } }]} x={2000}/>
      }
      <Drawer
        title={darwTitle}
        width={720}
        visible={showDarw}
        onClose={() => setShowDarw(false)}
      >
        {/* <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue}/> */}
      </Drawer>
    </div>
  );
};
AccountList.propTypes = {
  x: PropTypes.number,
  centerFunc: PropTypes.object,
  getCenterAccountList: PropTypes.func,
  center: PropTypes.object,
  action: PropTypes.array,
  createAccount: PropTypes.func,
  tenancyList: PropTypes.arrayOf(Object),
  initialValues: PropTypes.object
};
export default connect(state => ({
  center: state?.center,
}), dispatch => {
  return{
    centerFunc:bindActionCreators(centerAction, dispatch)
  };
})(AccountList);