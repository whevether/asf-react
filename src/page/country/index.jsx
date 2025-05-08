import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { inputFrom, countryFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as countryAction from 'store/actions/country';
import { timeToDate } from 'utils/storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Modal, Tag, notification } from 'antd';
import {  ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl, BaseFrom } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 国家 1: 修改国家
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
  //获取账户列表
  useEffect(() => {
    props?.countryFunc?.fetchCountryList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.country?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.countryFunc?.fetchCountryList({ pageNo: p, pageSize: size });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      setDrawType(type);
      let from = countryFrom();
      setFromData(from);
      setShowDarw(true);
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      props?.countryFunc?.createCountry(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加国家成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.countryFunc?.fetchCountryList({  pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.countryFunc?.modifyCountry(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改国家成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.countryFunc?.fetchCountryList({pageSize: pageSize });
          }, 500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.countryFunc?.fetchCountryList(e);
  };
  // 修改
  const list = [{
    name: '修改国家',
    permission: 'country.modify',
    click: (data) => {
      setInitFromValue(data);
      onOpenDarw(1);
    }
  }, {
    name: '删除国家',
    isAction: true,
    permission: 'country.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除国家!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除国家之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.countryFunc?.deleteCountry(data.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除国家成功'
              });
              setTimeout(() => {
                props?.countryFunc?.fetchCountryList({pageSize: pageSize});
              }, 500);
            });
        }
      });
    }
  }];
  const columns = [{
    title: '国家code',
    dataIndex: 'languageCode',
    key: 'languageCode',
    width: 100
  },{
    title: '国家名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '币种代码',
    dataIndex: 'currencyType',
    key: 'currencyType',
    width: 100
  }, {
    title: '目标国与RMB之间汇率',
    dataIndex: 'ratio',
    key: 'ratio',
    width: 180,
    render: (text) => {
      return `1: ${text}`;
    }
  }, {
    title: '目标国提现手续费利率',
    dataIndex: 'withdrawalRatio',
    key: 'withdrawalRatio',
    width: 180,
    render: (text) => {
      return `${text}%`;
    }
  },{
    title: '国家状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
     
    render: (text) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      let statusColorMap ={
        0: 'error',
        1: 'success'
      };
      return <Tag color={statusColorMap[text]}>{statusMap[text]}</Tag>;
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  },{
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 100,
    key: 'updateTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
     
    render: (record) => {
      return (<AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
    }
  }];
  const mapTitle = {
    0: '添加国家',
    1: '修改国家'
  };
  return (
    <div className="list">
      {head('国家列表')}
      <BaseTable formObj={inputFrom('国家名称或国家code', 'name')} querySubmit={querySubmit} dataSource={props?.country?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加国家', permission: 'country.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      <Drawer
        title={mapTitle[drawType]}
        width={720}
        open={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
Index.propTypes = {
  countryFunc: PropTypes.object,
  userInfo: PropTypes.object,
  country: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  country: state?.country,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    countryFunc: bindActionCreators(countryAction, dispatch)
  };
})(Index);