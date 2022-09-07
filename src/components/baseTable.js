import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, InputNumber, Table,Select } from 'antd';
import AuthControl from './authControl';
const BaseTable = (props) => {
  const form = useRef(null);
  // console.log(props);
  const onFinish = (e) => {
    props?.querySubmit(e);
  };
  const onCancel = () => {
    form?.current?.resetFields();
  };
  const rederSearch = (item) => {
    if (item?.fromType === 'inputNumber') {
      return <InputNumber placeholder={item?.placeholder} />;
    } else if (item?.fromType === 'select') {
      return (
        <Select showSearch={item?.showSearch ?? false} placeholder={item?.placeholder} allowClear={item?.options?.allowClear} mode={item?.mode} optionLabelProp={item?.optionLabel} optionFilterProp="title"
        filterOption={(input, option) =>
          option.label.indexOf(input) >= 0
        }>
          {
            item?.selOption && item?.selOption.map((data, i) => (
              <Select.Option value={data?.id} key={i} label={data?.name}>{data?.name}</Select.Option>
            ))
          }
        </Select>);
    } else {
      return <Input placeholder={item?.placeholder} />;
    }
  };
  return (
    <div className="tabble-list">
      {props?.formObj && <div className="tabble-header">
        <Form
          ref={form}
          layout="inline"
          name="tabble"
          onFinish={onFinish}
        >
          {
            props?.formObj.map((item, index) => (
              <Form.Item label={item.title} key={index} name={item?.name} rules={item?.rules} style={{ marginBottom: '10px' }}>
                {rederSearch(item)}
              </Form.Item>
            ))
          }
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button htmlType="button" style={{ marginLeft: '10px' }} onClick={onCancel}>
              重置
            </Button>
            {/* 权限按钮 */}
            <AuthControl userInfo={props?.userInfo} list={props?.list} type="button" />
          </Form.Item>
        </Form>
      </div>}
      {
        props?.columns && <Table dataSource={props?.dataSource} columns={props?.columns} scroll={{ x: props?.x ?? 968 }} pagination={props?.pagination} rowSelection={props?.rowSelection}/>
      }
    </div>
  );
};
BaseTable.propTypes = {
  x: PropTypes.number,
  dataSource: PropTypes.arrayOf(Object).isRequired,
  columns: PropTypes.arrayOf(Object).isRequired,
  rowSelection: PropTypes.object,
  querySubmit: PropTypes.func,
  pagination: PropTypes.object,
  formObj: PropTypes.arrayOf(Object),
  userInfo: PropTypes.object,
  list: PropTypes.arrayOf(Object)
};
export default BaseTable;