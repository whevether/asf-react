import React, { useState, useRef } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import PropTypes from 'prop-types';
import * as dictionaryAction from 'store/actions/dictionary';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BetaSchemaForm, DrawerForm, ProTable } from '@ant-design/pro-components';
import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AuthControl } from 'components/index';

const Index = (props) => {
  const actionRef = useRef();
  const [showDarw, setShowDarw] = useState(false);
  const [drawType, setDrawType] = useState(0);
  const [initFromValue, setInitFromValue] = useState(null);

  head('字典列表');

  const isSuperAdmin = props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1';

  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      setDrawType(type);
      setShowDarw(true);
    }
  };

  const onFinish = async (data) => {
    if (drawType === 0) {
      await props?.dictionaryFunc?.createDictionary(data);
      notification.success({ message: '添加成功', description: '添加字典成功' });
      actionRef.current?.reload();
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      await props?.dictionaryFunc?.modifyDictionary(data);
      notification.success({ message: '修改成功', description: '修改字典成功' });
      actionRef.current?.reload();
    }
  };

  const formColumns = [
    ...(isSuperAdmin ? [{
      title: '租户',
      dataIndex: 'tenancyId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择租户',
        allowClear: true,
        options: (props?.tenancyList || []).map((item) => ({ label: item.name, value: item.id })),
      },
      formItemProps: { rules: [{ required: true, message: '租户不能为空' }] },
    }] : []),
    {
      title: '会员所属国家',
      dataIndex: 'countryCode',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择会员所属国家',
        allowClear: true,
        options: (props?.countryList || []).map((item) => ({ label: item.name, value: item.id })),
      },
      formItemProps: { rules: [{ required: true, message: '所属国家不能为空' }] },
    },
    {
      title: '字典名称',
      dataIndex: 'name',
      valueType: 'text',
      fieldProps: { placeholder: '请输入字典名称', allowClear: true },
      formItemProps: { rules: [{ required: true, message: '字典名称不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的字典名称或最多输入50个字符的字典名称' }] },
    },
    {
      title: '字典键',
      dataIndex: 'key',
      valueType: 'text',
      fieldProps: { placeholder: '请输入字典键', allowClear: true },
      formItemProps: { rules: [{ required: true, message: '字典键不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的字典键或最多输入50个字符的字典键' }] },
    },
    {
      title: '字典值',
      dataIndex: 'value',
      valueType: 'text',
      fieldProps: { placeholder: '请输入字典值', allowClear: true },
      formItemProps: { rules: [{ required: true, message: '字典值不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的字典值或最多输入50个字符的字典值' }] },
    },
    {
      title: '字典编码',
      dataIndex: 'code',
      valueType: 'text',
      fieldProps: { placeholder: '请输入字典编码', allowClear: true },
      formItemProps: { rules: [{ required: true, message: '字典编码不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的字典编码或最多输入50个字符的字典编码' }] },
    },
    {
      title: '字典额外配置',
      dataIndex: 'option',
      valueType: 'text',
      fieldProps: { placeholder: '请输入字典额外配置', allowClear: true },
    },
  ];

  const request = async (params) => {
    const { current, pageSize, ...rest } = params || {};
    const res = await props?.dictionaryFunc?.fetchDictionaryList({ pageNo: current, pageSize, ...rest });
    return { data: res?.data ?? [], total: res?.totalCount ?? 0, success: true };
  };

  const list = [
    {
      name: '修改字典',
      permission: 'dictionary.modify',
      click: (data) => {
        setInitFromValue({
          id: data?.id,
          name: data?.name,
          key: data?.key,
          tenancyId: data?.tenancyId,
          value: data?.value,
        });
        onOpenDarw(1);
      },
    },
    {
      name: '删除字典',
      isAction: true,
      permission: 'dictionary.delete.[0-9]{1,100}',
      click: (data) => {
        Modal.confirm({
          title: '确认删除字典',
          icon: <ExclamationCircleOutlined />,
          content: '删除字典之后将无法恢复',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            props?.dictionaryFunc?.deleteDictionary(data.id).then(() => {
              notification.success({ message: '删除成功', description: '删除字典成功' });
              actionRef.current?.reload();
            });
          },
        });
      },
    },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, search: false },
    {
      title: '所属租户',
      dataIndex: 'tenancyId',
      width: 100,
      key: 'tenancyId',
      search: false,
      render: (_, record) => {
        const t = props?.tenancyList?.find((f) => f.id == record.tenancyId);
        return t?.name ?? '-';
      },
    },
    { title: '字典名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '键', dataIndex: 'key', key: 'key', width: 100, search: false },
    { title: '值', dataIndex: 'value', key: 'value', width: 100, search: false },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
      key: 'createTime',
      search: false,
      render: (_, record) => timeToDate(record.createTime, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      search: false,
      render: (_, record) => <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />,
    },
  ];

  const mapTitle = { 0: '添加字典', 1: '修改字典' };

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={request}
        columns={columns}
        scroll={{ x: 968 }}
        pagination={{ pageSize: 20, pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showTotal: (total) => `总条目: ${total} 条` }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <AuthControl
            key="add"
            userInfo={props?.userInfo}
            list={[{ name: '添加字典', permission: 'dictionary.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]}
            type="button"
          />,
        ]}
      />
      <DrawerForm
        title={mapTitle[drawType]}
        open={showDarw}
        layout="vertical"
        initialValues={initFromValue || {}}
        drawerProps={{ width: 720, destroyOnHidden: true }}
        onOpenChange={setShowDarw}
        onFinish={async (values) => {
          await onFinish(values);
          return true;
        }}
        onReset={() => setShowDarw(false)}
        submitter={{ searchConfig: { submitText: '确定', resetText: '取消' } }}
      >
        <BetaSchemaForm layoutType="Embed" submitter={false} columns={formColumns} />
      </DrawerForm>
    </div>
  );
};

Index.propTypes = {
  dictionaryFunc: PropTypes.object,
  userInfo: PropTypes.object,
  dictionary: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  countryList: PropTypes.arrayOf(Object),
};

export default connect(
  (state) => ({
    userInfo: state?.common?.data,
    dictionary: state?.dictionary,
    countryList: state?.common?.countryList,
    tenancyList: state?.common?.tenancyList,
  }),
  (dispatch) => ({ dictionaryFunc: bindActionCreators(dictionaryAction, dispatch) })
)(Index);
