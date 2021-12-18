import React, { useEffect, useState,Fragment } from 'react';
import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
import { notification,Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorAction from 'store/actions/editor';
import { imagesFrom } from 'utils/json';
import { BaseFrom } from 'components/index';
import { useNavigate } from 'react-router-dom';
const AddEditor = (props) => {
  const [editorValue,setEditorValue] = useState({oldContent: null});
  let navigate = useNavigate();
  const handleEditor = (value) => {
    setEditorValue({...editorValue,oldContent:value});
  };
  const onSelectEditor = (value)=>{
    // setEditorValue(value[1]);
    // setPageId(value[2]);
    // setOldValue(value[3]);
    props.getEditor({id:value})
      .then(res=>{
        setEditorValue(res);
      });
  };
  const onFinish = (e)=>{
    if(!editorValue?.oldContent){
      notification['error']({
        message: '请选择需要添加的页面模版',
        description: ''
      });
      return;
    }
    let data = {
      id: editorValue.id,
      name: e.name,
      path: e.path,
      meta: e.meta,
      banner: {
        indexBanner: e.indexBanner,
        deviceBanner: e.deviceBanner,
        hezuo: e.hezuo
      },
      oldContent: editorValue?.oldContent
    };
    props.createEditor(data).then(() => {
      notification['success']({
        message: '添加成功',
        description: ''
      });
      setTimeout(()=>{
        navigate(-1);
      },1000);
    });
   
  };
  useEffect(() => {
    props.getEditorList();
  },[]);
  
  return(
    <div className="editor">
      {head('添加页面')}
      <div className="select-editor">
        <Select onChange={onSelectEditor} placeholder="选择需要添加的页面模版">
          {
            props?.list && props?.list.map((item,index)=>(
              <Select.Option key={index} value={item.id}>
                {item?.name}
              </Select.Option>
            ))
          }
        </Select>
      </div>
      {
        editorValue.oldContent && <Fragment>
          <Editor id="editor" apiKey="f0ujtvkxmw64jnj6xstg4adv3vgxh73c5wbsgusq7si3pi1n" init={{
          'plugins': 'print preview fullpage  searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount  imagetools textpattern help', 
          'min_height': 1200,
          'insert_button_items': 'insertfile',
          'language': 'zh_CN',
          'fontsize_formats': "8pt 10pt 12pt 14pt 16pt 18pt 22pt 24pt 36pt", // 第二步
          'language_url': '../../assets/langs/zh_CN.js',
          'importcss_append': true,
          'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
          'image_advtab': true,
          // 'images_upload_handler': (blobInfo,success,failure)=>{
          //   console.log(blobInfo);
            
          // }
        }} outputFormat= "html"  value={editorValue.oldContent} onEditorChange= {handleEditor} tagName="t_editor"/>
        </Fragment>
      }
      <div style={{fontSize:'14px',marginBottom:'15px'}}>注意页面路径选择的是那个页面模版，就填写那个模版路径并添加最后的页面文件名,例如/var/www/html/441/a/gongsixinwen/index.html模版路径，则新增页面路径为<span style={{color:'red'}}>/var/www/html/441/a/gongsixinwen/你需要新增的页面名称.html</span>红色字体中路路径就是你新增页面的链接,不要完全复制路径，否则会覆盖原有模版页面</div>
      <BaseFrom list={imagesFrom} onFinish={onFinish} initialValues={{'path': editorValue?.path}} onClose={()=>{navigate(-1);}}/>
    </div>
  );
};
AddEditor.propTypes = {
  createEditor: PropTypes.func,
  getEditorList: PropTypes.func,
  getEditor: PropTypes.func,
  list: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  list: state?.editor?.list
}),dispatch => bindActionCreators(editorAction,dispatch))(AddEditor);