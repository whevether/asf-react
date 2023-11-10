import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Select, Cascader, Switch, InputNumber, Slider, DatePicker, Radio, Upload, Image, Tooltip, Empty } from 'antd';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { isImage,isVideo } from 'utils/help';
const BaseFrom = (props) => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const onReset = () => {
    form?.resetFields();
    if (props.onClose) {
      props.onClose();
    }
  };
  const onFinish = (e)=>{
    props?.onFinish(e);
    form?.resetFields();
  };
  useEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props?.initialValues);
    }
  }, [JSON.stringify(props.initialValues), props?.list]);
  const renderFromItem = (item, i) => {
    if (item?.fromType === 'select') {
      return (<Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}>
        <Select placeholder={item?.placeholder} allowClear={item?.options?.allowClear} mode={item?.mode} optionLabelProp={item?.optionLabel} {...item?.rest}>
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
      return <Form.Item name={item?.name} rules={item?.rules} label={item?.title} key={i} style={item?.style ?? {}} ><Cascader placeholder={item?.placeholder} allowClear={item?.options?.allowClear} options={item?.selOption} changeOnSelect {...item?.rest} /></Form.Item>;
    } else if (item?.fromType === 'switch') {
      return <Form.Item name={item?.name} rules={item?.rules} valuePropName="checked" style={item?.style ?? {}} label={item?.title} key={i}> <Switch checkedChildren={item?.options?.yes} unCheckedChildren={item?.options?.no} /> </Form.Item>;
    } else if (item?.fromType === 'inputnumber') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} style={item?.style ?? {}}><InputNumber style={{ width: '100%' }} stringMode min={item?.options?.min} max={item?.options?.max} step={item?.options?.step} placeholder={item?.placeholder} /></Form.Item>;
    } else if (item?.fromType === 'textarea') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} style={item?.style ?? {}}><Input.TextArea placeholder={item?.placeholder} allowClear={item?.options?.allowClear} rows={item?.row ?? 6} /></Form.Item>;
    } else if (item?.fromType === 'slide') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} style={item?.style ?? {}}><Slider tooltip={{ formatter: (value) => `${value}分` }} /></Form.Item>;
    } else if (item?.fromType === 'datetime') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} style={item?.style ?? {}}><DatePicker placeholder={item?.placeholder} style={{ width: '100%' }} /></Form.Item>;
    } else if (item?.fromType === 'daterange') {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} style={item?.style ?? {}}><RangePicker placeholder={item?.placeholder} style={{ width: '100%' }} /></Form.Item>;
    } else if (item?.fromType === 'upload') {
      return (<Form.Item name={item?.name} valuePropName="files" style={item?.style ?? {}} key={i} label={item?.title}>
        {
          props?.initialValues[item?.name] &&
          <div className="img-item">
            {
              isImage(props?.initialValues[item?.name]) && <Image src={props?.initialValues[item?.name]} style={{ width: 'auto', height: 'auto', maxHeight: '195px' }} />
            }
            {
              isVideo(props?.initialValues[item?.name]) && <video controls style={{ width: '100%', height: '100%', maxHeight: '250px' }}>
                <source src={props?.initialValues[item?.name]} />
              </video>
            }
            {
              !isImage(props?.initialValues[item?.name]) && !isVideo(props?.initialValues[item?.name]) && <Empty description="未知的文件"/>
            }
            <Tooltip title="删除">
              <DeleteOutlined onClick={()=>item?.rest?.onRemove(props?.initialValues)} />
            </Tooltip>
          </div>
        }
        {
          !props?.initialValues[item?.name] && <Upload.Dragger name="files" customRequest={(obj)=>item?.onUpload(obj,props?.initialValues)} beforeUpload={item?.onBeforeUpload} accept={item?.accept} {...item?.rest}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
          </Upload.Dragger>
        }
      </Form.Item>);
    }
    else {
      return <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules} style={item?.style ?? {}}><Input placeholder={item?.placeholder} allowClear={item?.options?.allowClear} type={item?.inputType} {...item?.rest} /></Form.Item>;
    }
  };
  return (
    <Form layout={props?.layout ?? 'vertical'} className="base-from" form={form} name="basefrom" onFinish={onFinish} >
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
            {
              props?.calcelText ?? '取消'
            }
          </Button>
        }
      </Form.Item>
    </Form>
  );
};
BaseFrom.propTypes = {
  list: PropTypes.arrayOf(Object),
  onClose: PropTypes.func,
  submitText: PropTypes.string,
  hiddenCalcel: PropTypes.bool,
  layout: PropTypes.string,
  onFinish: PropTypes.func,
  initialValues: PropTypes.object,
  calcelText: PropTypes.string
};
export default BaseFrom;