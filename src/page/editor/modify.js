import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
import { notification, Image } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorAction from 'store/actions/editor';
import { imagesFrom } from 'utils/json';
import { BaseFrom } from 'components/index';
import { useNavigate,useSearchParams } from 'react-router-dom';
/* eslint-disable react/jsx-wrap-multilines */
const TinyEditor = (props) => {
  const [editorValue, setEditorValue] = useState({ oldContent: null });
  let navigate = useNavigate();
  let [searchParams]  = useSearchParams();
  const handleEditor = (value) => {
    setEditorValue({ ...editorValue, newContent: value });
  };
  const onFinish = (e) => {
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
      newContent: editorValue?.newContent ?? editorValue?.oldContent 
    };
    props.modifyEditor(data).then(() => {
      notification['success']({
        message: '修改成功',
        description: ''
      });
      setTimeout(()=>{
        navigate(-1);
      },1000);
    });

  };
  useEffect(() => {
    props.getEditor({ id: searchParams.get('id') })
      .then(res => {
        setEditorValue(res);
      });
  }, []);

  return (
    <div className="editor">
      {head('编辑页面')}
      <div>
        {
          editorValue.oldContent && <Fragment>
            <div>网站内容编辑</div>
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
            }} outputFormat="html" value={editorValue.newContent ?? editorValue.oldContent} onEditorChange={handleEditor} tagName="t_editor" />
          </Fragment>
        }
        <span style={{ color: 'red', marginBottom: '15px' }}>首页轮播图预览:</span>
        {
          editorValue?.banner?.indexBanner && editorValue?.banner?.indexBanner.split(',').map((item, index) => {
            return <span key={index + 'index'} style={{ marginTop: '10px', marginRight: '10px' }}><Image
              width={50}
              src={item} /></span>;
          })
        }
      </div>
      <div>
        <span style={{ color: 'red', marginBottom: '15px' }}>资质图片预览:</span>
        {
          editorValue?.banner?.deviceBanner && editorValue?.banner?.deviceBanner.split(',').map((item, index) => {
            return <span key={index + 'dev'} style={{ marginTop: '10px', marginRight: '10px' }}><Image

              width={50}
              src={item} /></span>;
          })
        }
      </div>
      <div>
        <span style={{ color: 'red', marginBottom: '15px' }}>合作伙伴图片预览:</span>
        {
          editorValue?.banner?.hezuo && editorValue?.banner?.hezuo.split(',').map((item, index) => {
            return <span key={index + 'hz'} style={{ marginTop: '10px', marginRight: '10px' }}><Image

              width={50}
              src={item} /></span>;
          })
        }
      </div>
      <BaseFrom list={imagesFrom} onFinish={onFinish} onClose={()=>{navigate(-1);}} initialValues={{ 'indexBanner': editorValue?.banner?.indexBanner, 'deviceBanner': editorValue?.banner?.deviceBanner, 'hezuo': editorValue?.banner?.hezuo,'name': editorValue?.name,'path': editorValue?.path,meta:editorValue?.meta}} />
    </div>
  );
};
TinyEditor.propTypes = {
  modifyEditor: PropTypes.func,
  getEditorList: PropTypes.func,
  getEditor: PropTypes.func,
  list: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  list: state?.editor?.list
}), dispatch => bindActionCreators(editorAction, dispatch))(TinyEditor);