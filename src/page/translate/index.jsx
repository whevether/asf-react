import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { inputFrom, translateFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as translateAction from 'store/actions/translate';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Modal, notification } from 'antd';
import {  ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl, BaseFrom } from 'components/index';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 多语言 1: 修改多语言
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
  //获取账户列表
  useEffect(() => {
    props?.translateFunc?.fetchTranslateList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.translate?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.translateFunc?.fetchTranslateList({ pageNo: p, pageSize: size });
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
      let from = translateFrom();
      //判断是否为超级管理员。如果为则显示选择租户
      if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
        from.unshift({
          title: '租户',
          fromType: 'select',
          name: 'tenancyId',
          selOption: props?.tenancyList,
          placeholder: '请选择租户',
          rules: [{ required: true, message: '租户不能为空' }],
          options: {
            allowClear: true//是否显示清除框
          }
        });
      }
      from.unshift({
        title: '国家',
        fromType: 'select',
        name: 'countryId',
        selOption: props?.countryList,
        placeholder: '请选择国家',
        rules: [{ required: true, message: '国家不能为空' }],
        options: {
          allowClear: true//是否显示清除框
        }
      });
      setFromData(from);
      setShowDarw(true);
    }
  };
  //提交表单
  const onFinish = (data) => {
    let country = props?.countryList?.find(f=>f?.id === data?.countryId);
    if(country){
      data = {...data,country:country?.name,countryCode: country?.languageCode};
    }
    if (drawType === 0) {
      props?.translateFunc?.createTranslate(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加多语言成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.translateFunc?.fetchTranslateList({ pageNo: 1, pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.translateFunc?.modifyTranslate(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改多语言成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.translateFunc?.fetchTranslateList({pageNo: 1,pageSize: pageSize });
          }, 500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.translateFunc?.fetchTranslateList(e);
  };
  // 修改
  const list = [{
    name: '修改多语言',
    permission: 'translate.modify',
    click: (data) => {
      setInitFromValue(data);
      onOpenDarw(1);
    }
  }, {
    name: '删除多语言',
    isAction: true,
    permission: 'translate.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除多语言!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除多语言之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.translateFunc?.deleteTranslate(data.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除多语言成功'
              });
              setTimeout(() => {
                props?.translateFunc?.fetchTranslateList({pageSize: pageSize});
              }, 500);
            });
        }
      });
    }
  }];
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 100,
    key: 'tenancyId',
    render: (text) => {
      let data = props?.tenancyList.find(f => f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: '语种',
    dataIndex: 'country',
    key: 'country',
    width: 100
  },{
    title: '语种代码',
    dataIndex: 'countryCode',
    key: 'countryCode',
    width: 100
  },{
    title: '多语言名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '键',
    dataIndex: 'key',
    key: 'key',
    width: 100
  }, {
    title: '值',
    dataIndex: 'value',
    key: 'value',
    width: 100
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
    0: '添加多语言',
    1: '修改多语言'
  };
  return (
    <div className="list">
      {head('多语言列表')}
      <BaseTable formObj={inputFrom('多语言名称', 'name')} querySubmit={querySubmit} dataSource={props?.translate?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加多语言', permission: 'translate.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
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
  translateFunc: PropTypes.object,
  userInfo: PropTypes.object,
  translate: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  countryList: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  userInfo: state?.common?.data,
  translate: state?.translate,
  tenancyList: state?.common?.tenancyList,
  countryList: state?.common?.countryList
}), dispatch => {
  return {
    translateFunc: bindActionCreators(translateAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  };
})(Index);