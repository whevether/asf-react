import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Select, Cascader, Switch, InputNumber, Slider, DatePicker, Radio, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const BaseFrom = (props) => {
  const { RangePicker } = DatePicker;
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
  }, [props.initialValues ?? props?.list]);
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
    } else if (item?.fromType === 'radio') {
      return (<Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}>
        <Radio.Group>
          {
            item?.selOption && item?.selOption.map((data, i) => (
              <Radio.Button value={data?.id} key={i}>{data?.name}</Radio.Button>
            ))
          }
        </Radio.Group></Form.Item>);
    } else if (item?.fromType === 'cascader') {
      return <Form.Item label={item?.title} key={i}><Form.Item name={item?.name} rules={item?.rules} noStyle><Cascader placeholder={item?.placeholder} allowClear={item?.options?.allowClear} options={item?.selOption} changeOnSelect {...item?.rest} /></Form.Item> </Form.Item>;
    } else if (item?.fromType === 'switch') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} valuePropName="checked"> <Switch checkedChildren={item?.options?.yes} unCheckedChildren={item?.options?.no} /> </Form.Item>;
    } else if (item?.fromType === 'inputnumber') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><InputNumber style={{ width: '100%' }} stringMode min={item?.options?.min} max={item?.options?.max} step={item?.options?.step} placeholder={item?.placeholder} /></Form.Item>;
    } else if (item?.fromType === 'textarea') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><Input.TextArea placeholder={item?.placeholder} allowClear={item?.options?.allowClear} rows={item?.row ?? 6} /></Form.Item>;
    } else if (item?.fromType === 'slide') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><Slider tooltip={{ formatter: (value) => `${value}分` }} /></Form.Item>;
    } else if (item?.fromType === 'datetime') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><DatePicker placeholder={item?.placeholder} /></Form.Item>;
    } else if (item?.fromType === 'daterange') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><RangePicker placeholder={item?.placeholder} /></Form.Item>;
    } else if (item?.fromType === 'upload') {
      return (<Form.Item label={item?.title} key={i}>
        <Form.Item name={item?.name} valuePropName="files" noStyle>
          <Upload.Dragger name="files" customRequest={item?.onUpload} beforeUpload={item?.onBeforeUpload} accept={item?.accept}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>);
    }
    else {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}><Input placeholder={item?.placeholder} allowClear={item?.options?.allowClear} type={item?.inputType} /></Form.Item>;
    }
  };
  return (
    <Form layout={props?.layout ?? 'vertical'} className="base-from" ref={fromRef} name="basefrom" onFinish={props?.onFinish} onValuesChange={props?.onValuesChange}>
      {
        props?.list && props.list.map((item, i) => (
          // <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}>
          renderFromItem(item, i)
          // </Form.Item>
        ))
      }
      <Form.Item>
        <Button type="primary" htmlType="submit" className="form-btn-submit">
          {props?.submitText ?? '确定'}
        </Button>
        {
          !props?.hiddenCalcel && <Button type="default" htmlType="button" className="form-btn-cancel" onClick={onReset} style={{ marginLeft: '15px' }}>
            取消
          </Button>
        }
      </Form.Item>
    </Form>
  );
};
BaseFrom.propTypes = {
  list: PropTypes.arrayOf(Object),
  onValuesChange: PropTypes.func,
  onClose: PropTypes.func,
  submitText: PropTypes.string,
  hiddenCalcel: PropTypes.bool,
  layout: PropTypes.string,
  onFinish: PropTypes.func,
  initialValues: PropTypes.object
};
export default BaseFrom;