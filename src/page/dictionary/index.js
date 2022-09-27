import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { inputFrom, dictionaryFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as dictionaryAction from 'store/actions/dictionary';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Dropdown, Modal, notification } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseTable, AuthControl, BaseFrom } from 'components/index';
import { useNavigate } from 'react-router-dom';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 字典 1: 修改字典
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(20);
  let navigate = useNavigate();
  //获取账户列表
  useEffect(() => {
    props?.dictionaryFunc?.fetchDictionaryList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.dictionary?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.dictionaryFunc?.fetchDictionaryList({ pageNo: p, pageSize: size });
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
      let from = dictionaryFrom();
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
      setFromData(from);
      setShowDarw(true);
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      props?.dictionaryFunc?.createDictionary(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加字典成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.dictionaryFunc?.fetchDictionaryList({pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.dictionaryFunc?.modifyDictionary(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改字典成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.dictionaryFunc?.fetchDictionaryList({pageSize: pageSize });
          }, 500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.dictionaryFunc?.fetchDictionaryList(e);
  };
  // 修改
  const list = [{
    name: '字典详情',
    permission: 'dictionary.details',
    click: (data) => {
      navigate(`/control/dictionary/details?id=${data?.id}`);
    }
  }, {
    name: '修改字典',
    permission: 'dictionary.modify',
    click: (data) => {
      setInitFromValue({
        id: data?.id,
        name: data?.name,
        key: data?.key,
        tenancyId: data?.tenancyId,
        value: data?.value
      });
      onOpenDarw(1);
    }
  }, {
    name: '删除字典',
    isAction: true,
    permission: 'dictionary.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除字典!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除字典之后将无法恢复!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.dictionaryFunc?.deleteDictionary(data.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除字典成功'
              });
              setTimeout(() => {
                props?.dictionaryFunc?.fetchDictionaryList({pageSize: pageSize});
              }, 500);
            });
        }
      });
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 150,
    key: 'tenancyId',
    render: (text) => {
      let data = props?.tenancyList.find(f => f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: '字典名',
    dataIndex: 'name',
    key: 'name',
    width: '100px'
  }, {
    title: '键',
    dataIndex: 'key',
    key: 'key',
    width: '100px'
  }, {
    title: '值',
    dataIndex: 'value',
    key: 'value',
    width: '100px'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
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
  const mapTitle = {
    0: '添加字典',
    1: '修改字典'
  };
  return (
    <div className="list">
      {head('字典列表')}
      <BaseTable formObj={inputFrom('字典名称', 'name')} querySubmit={querySubmit} dataSource={props?.dictionary?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加字典', permission: 'dictionary.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
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
  dictionaryFunc: PropTypes.object,
  userInfo: PropTypes.object,
  dictionary: PropTypes.object,
  dictionaryList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  tenancyList: PropTypes.arrayOf(Object),
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  dictionary: state?.dictionary,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    dictionaryFunc: bindActionCreators(dictionaryAction, dispatch)
  };
})(Index);