import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {Form,Input,Button, InputNumber,Table} from 'antd';
import AuthControl from './authControl';
const BaseTable = (props) => {
  const form  = useRef(null);
  // console.log(props);
  const onFinish = (e)=> {
    props?.querySubmit(e);
    // let data = null;
    // // 过滤空值
    // Object.keys(e).forEach(f => {
    //   if(e[f]){
    //     data = Object.assign({...data,[f]: e[f]});
    //   }
    // });
    // if(data === null){
    //   notification['error']({
    //     message: '至少输入一个查询值'
    //   });
    // }else{
    //   props?.querySubmit(data);
    // }
  };
  const onCancel = () => {
    form?.current?.resetFields();
  };
  const rederSearch = (item) => {
    if(item?.fromType === 'inputNumber'){
      return <InputNumber placeholder={item?.placeholder} />;
    }else{
      return  <Input placeholder={item?.placeholder} />;
    }
  };
  return(
    <div className="tabble-list">
      {props?.formObj && <div className="tabble-header">
        <Form
        ref = {form}
        layout="inline"
        name="tabble"
        onFinish={onFinish}
      >
        {
          props?.formObj.map((item,index) => (
            <Form.Item label={item.title} key={index} name = {item?.name} rules={item?.rules} style={{marginBottom:'10px'}}>
              {rederSearch(item)}
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
          {/* 权限按钮 */}
          <AuthControl action={props?.action} list={props?.list} type="button"/>
        </Form.Item>
      </Form>
      </div>}
      { 
        props?.dataSource&&props?.columns && <Table  dataSource={props?.dataSource} columns={props?.columns} scroll={{x: props?.x ?? 968}} pagination={props?.pagination} />
      }
    </div>
  );
};
BaseTable.propTypes = {
  x: PropTypes.number,
  dataSource: PropTypes.arrayOf(Object).isRequired,
  columns: PropTypes.arrayOf(Object).isRequired,
  querySubmit: PropTypes.func,
  pagination: PropTypes.object,
  formObj: PropTypes.arrayOf(Object),
  action: PropTypes.arrayOf(String),
  list: PropTypes.arrayOf(Object)
};
export default BaseTable;