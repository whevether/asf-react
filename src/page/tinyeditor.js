import React, { useEffect, useState,Fragment } from 'react';
import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
import { Button,Modal,Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorAction from 'store/actions/editor';
const TinyEditor = (props) => {
  const [visable,setVisable] = useState(false);
  const [editorValue,setEditorValue] = useState(null);
  const handleEditor = (value) => {
    setEditorValue(value);
  };
  const onSubmit = () => {
    setVisable(true);
  };
  const onReset = () =>{
    
  };
  const onSelectEditor = (value)=>{
    setEditorValue(value);
  };
  useEffect(() => {
    props.getEditorList();
  },[]);
  
  return(
    <div className="editor">
      {head('富文本编辑器')}
      <div className="select-editor">
        <Button type="primary">添加轮播图片</Button>
        <Select onChange={onSelectEditor} placeholder="选择需要编辑的页面">
          {
            props?.list && props?.list.map((item,index)=>(
              <Select.Option key={index} value={item?.oldContent}>
                {item?.name}
              </Select.Option>
            ))
          }
        </Select>
      </div>
      {
        editorValue && <Fragment>
          <Editor id="editor" apiKey="f0ujtvkxmw64jnj6xstg4adv3vgxh73c5wbsgusq7si3pi1n" init={{
          'plugins': 'print preview fullpage  searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount  imagetools textpattern help', 
          'min_height': 1200,
          'insert_button_items': 'insertfile',
          'language': 'zh_CN',
          'language_url': 'assets/langs/zh_CN.js',
          'importcss_append': true,
          'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
          'image_advtab': true,
          // 'images_upload_handler': (blobInfo,success,failure)=>{
          //   console.log(blobInfo);
            
          // }
        }} outputFormat= "html"  value={editorValue} onEditorChange= {handleEditor} tagName="t_editor"/>
        <Modal width="100%" visible={visable} title="测试编辑html" onOk={() => {setVisable(false)}} onCancel={()=>{setVisable(false)}}>
          <div dangerouslySetInnerHTML={{__html:editorValue}} style={{width:'968',height:'100%'}} />
        </Modal>
        <div className="editor-btn">
          <Button type="primary" htmlType="button" onClick={onSubmit}>提交修改内容</Button>
          <Button type="primary" htmlType="button" danger onClick={onReset}>重置内容</Button>
        </div>
        </Fragment>
      }
      
      
    </div>
  );
};
TinyEditor.propTypes = {
  editor: PropTypes.object,
  list: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  list: state?.editor?.list
}),dispatch => bindActionCreators(editorAction,dispatch))(TinyEditor);