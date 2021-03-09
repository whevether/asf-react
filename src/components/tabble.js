import React, { useRef } from 'react';
import PropTypes, { object } from 'prop-types';
import {Form,Input,Button, InputNumber,notification,Table} from 'antd';
const BaseTabble = (props) => {
  const form  = useRef(null);
  // console.log(props);
  const onFinish = (e)=> {
    let data = null;
    // 过滤空值
    Object.keys(e).forEach(f => {
      if(e[f]){
         data = {
           [f]: e[f]
         }
      }
    });
    if(data === null){
      notification['error']({
        message: '至少输入一个查询值'
      });
    }else{
      props?.querySubmit(data);
    }
  };
  const onFinishFailed = (e) => {
    form?.current?.resetFields();
    notification['error']({
      message: '表单错误'
    });
  };
  const onCancel = () => {
    form?.current?.resetFields();
  };
  return(
    <div className="tabble-list">
      {props?.formObj && <div className="tabble-header">
        <Form
        ref = {form}
        layout="inline"
        name="tabble"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {
          props?.formObj.map((item,index) => (
            <Form.Item label={item.title} key={index} name = {item?.name} rules={item?.rules} style={{marginBottom:'10px'}}>
              {item?.fromType === 'inputNumber' ? <InputNumber placeholder={item?.placeholder} /> : <Input placeholder={item?.placeholder} />}
            </Form.Item>
          ))
        }

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button htmlType="button" style={{marginLeft:'10px'}} onClick={onCancel}>
            重置
          </Button>
        </Form.Item>
      </Form>
      </div>}
      { props?.dataSource&&props?.columns && <Table  dataSource={props?.dataSource} columns={props?.columns} scroll={{x: 968}}/>
      }
    </div>
  );
};
BaseTabble.propTypes = {
  dataSource: PropTypes.arrayOf(Object).isRequired,
  columns: PropTypes.arrayOf(Object).isRequired,
  querySubmit: PropTypes.func,
  formObj: PropTypes.arrayOf(Object)
};
export default BaseTabble;