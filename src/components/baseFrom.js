import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Select, Cascader } from 'antd';
const BaseFrom = (props) => {
  const fromRef = useRef(null);
  const onReset = () => {
    fromRef?.current?.resetFields();
  };
  const renderFromItem = (item) => {
    if(item?.fromType === 'select'){
      return (<Select placeholder={item?.placeholder} allowClear={item?.options?.allowClear}>
        {
          item?.selOption && item?.selOption.map((data,i)=>(
            <Select.Option value={data?.value} key={i}>{data?.name}</Select.Option>
          ))
        }
      </Select>);
    }else if(item?.fromType === 'cascader'){
      return <Cascader placeholder={item?.placeholder} allowClear={item?.options?.allowClear} options={item?.selOption}/>;
    }else{
      return <Input placeholder={item?.placeholder} allowClear={item?.options?.allowClear} type={item?.inputType}/>;
    }
  };
  return(
    <Form layout={props?.layout ?? 'vertical'} className="base-from" ref={fromRef} name="basefrom" onFinish={props?.onFinish}>
       {
         props?.list &&  props.list.map((item,i)=>(
          <Form.Item name={item?.name} label={item?.title} key={i} rules={item?.rules}>
            {renderFromItem(item)}
          </Form.Item>
         ))
       }
       <Form.Item>
        <Button type="primary" htmlType="submit" className="form-btn-submit">
          确定
        </Button>
        <Button type="default" htmlType="button" className="form-btn-cancel" onClick={onReset} style={{marginLeft:'15px'}}>
          取消
        </Button>
       </Form.Item>
    </Form>
  );
};
BaseFrom.propTypes = {
  list: PropTypes.arrayOf(Object),
  layout: PropTypes.string,
  onFinish: PropTypes.func
};
export default BaseFrom;