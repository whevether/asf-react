import React, { useEffect, useState,Fragment } from 'react';
import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
import { Button,Drawer,notification,Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorAction from 'store/actions/editor';
import { imagesFrom } from 'utils/json';
import { BaseFrom } from 'components/index';
const TinyEditor = (props) => {
  const [visable,setVisable] = useState(false);
  const [editorValue,setEditorValue] = useState(null);
  const [oldValue,setOldValue] = useState('');
  const [pageId, setPageId] = useState(0);
  const handleEditor = (value) => {
    setEditorValue(value);
  };
  const onSubmit = () => {
    let data = {
      id: pageId,
      newContent: editorValue
    };
    props.modifyEditor(data).then(() => {
      notification['success']({
        message: '修改成功',
        description: ''
      });
    });
  };
  const onReset = () =>{
    setEditorValue(oldValue);
  };
  const onSelectEditor = (value)=>{
    setEditorValue(value[1]);
    setPageId(value[2]);
    setOldValue(value[3]);
  };
  const onAddImages = () => {
    if(pageId === 0){
      notification['error']({
        message: '请先选择需要修改的页面',
        description: '请先选择需要修改的页面'
      });
    }else{
      setVisable(true);
    }
  };
  const onFinish = (e)=>{
    let data = {
      id: pageId,
      banner: JSON.stringify(e)
    };
    props.modifyEditor(data).then(() => {
      notification['success']({
        message: '修改成功',
        description: ''
      });
      setVisable(false);
    });
   
  };
  useEffect(() => {
    props.getEditorList();
  },[]);
  
  return(
    <div className="editor">
      {head('富文本编辑器')}
      <div className="select-editor">
        <Button type="primary" onClick={onAddImages}>添加轮播图片</Button>
        <Select onChange={onSelectEditor} placeholder="选择需要编辑的页面">
          {
            props?.list && props?.list.map((item,index)=>(
              <Select.Option key={index} value={[item?.name,item?.newContent ?? item?.oldContent,item.id,item?.oldContent]}>
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
          'fontsize_formats': "8pt 10pt 12pt 14pt 16pt 18pt 22pt 24pt 36pt", // 第二步
          'language_url': 'assets/langs/zh_CN.js',
          'importcss_append': true,
          'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
          'image_advtab': true,
          // 'images_upload_handler': (blobInfo,success,failure)=>{
          //   console.log(blobInfo);
            
          // }
        }} outputFormat= "html"  value={editorValue} onEditorChange= {handleEditor} tagName="t_editor"/>
        <div className="editor-btn">
          <Button type="primary" htmlType="button" onClick={onSubmit}>提交修改内容</Button>
          <Button type="primary" htmlType="button" danger onClick={onReset}>重置内容</Button>
        </div>
        </Fragment>
      }
      
      <Drawer
        title="添加轮播图"
        width={720}
        visible={visable}
        onClose={() => setVisable(false)}
      >
        <BaseFrom list={imagesFrom} onFinish={onFinish}/>
      </Drawer>
    </div>
  );
};
TinyEditor.propTypes = {
  modifyEditor: PropTypes.func,
  getEditorList: PropTypes.func,
  list: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  list: state?.editor?.list
}),dispatch => bindActionCreators(editorAction,dispatch))(TinyEditor);