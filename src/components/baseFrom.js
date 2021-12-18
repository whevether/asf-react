import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Select, Cascader, Switch, InputNumber } from 'antd';
const BaseFrom = (props) => {
  const fromRef = useRef(null);
  const onReset = () => {
    fromRef?.current?.resetFields();
    props.onClose();
  };
  useEffect(() => {
    if (props.initialValues) {
      fromRef?.current?.setFieldsValue(props?.initialValues);
    } else {
      fromRef?.current?.resetFields();
    }
  }, [props?.initialValues]);
  const renderFromItem = (item, i) => {
    if (item?.fromType === 'select') {
      return (<Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}>
        <Select placeholder={item?.placeholder} allowClear={item?.options?.allowClear} mode={item?.mode} optionLabelProp={item?.optionLabel}>
          {
            item?.selOption && item?.selOption.map((data, i) => (
              <Select.Option value={data?.id} key={i} label={data?.name}>{data?.name}</Select.Option>
            ))
          }
        </Select></Form.Item>);
    } else if (item?.fromType === 'cascader') {
      return <Form.Item label={item?.title} key={i}><Form.Item name={item?.name} rules={item?.rules} noStyle><Cascader placeholder={item?.placeholder} allowClear={item?.options?.allowClear} options={item?.selOption} /></Form.Item> </Form.Item>;
    } else if (item?.fromType === 'switch') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} valuePropName="checked"> <Switch checkedChildren={item?.options?.yes} unCheckedChildren={item?.options?.no} /> </Form.Item>;
    } else if (item?.fromType === 'inputnumber') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><InputNumber style={{ width: '100%' }} stringMode min={item?.options?.min} max={item?.options?.max} step={item?.options?.step} placeholder={item?.placeholder} /></Form.Item>;
    } else {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><Input placeholder={item?.placeholder} allowClear={item?.options?.allowClear} type={item?.inputType} /></Form.Item>;
    }
  };
  return (
    <Form layout={props?.layout ?? 'vertical'} className="base-from" ref={fromRef} name="basefrom" onFinish={props?.onFinish}>
      {
        props?.list && props.list.map((item, i) => (
          // <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}>
          renderFromItem(item, i)
          // </Form.Item>
        ))
      }
      <Form.Item>
        <Button type="primary" htmlType="submit" className="form-btn-submit">
          确定
        </Button>
        <Button type="default" htmlType="button" className="form-btn-cancel" onClick={onReset} style={{ marginLeft: '15px' }}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};
BaseFrom.propTypes = {
  list: PropTypes.arrayOf(Object),
  onClose: PropTypes.func,
  layout: PropTypes.string,
  onFinish: PropTypes.func,
  initialValues: PropTypes.object
};
export default BaseFrom;