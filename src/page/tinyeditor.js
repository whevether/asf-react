import React from 'react';
// import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
const TinyEditor = (props) => {
  const handleEditor = (value,edior) => {
    console.log(value);
    console.log(edior);
  };
  return(
    <div className="editor">
      {head('富文本编辑器')}
      <Editor id="editor" apiKey="f0ujtvkxmw64jnj6xstg4adv3vgxh73c5wbsgusq7si3pi1n" init={{
        'plugins': 'print preview fullpage  searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount  imagetools textpattern help', 
        'min_height': 500,
        'insert_button_items': 'insertfile',
        'language': 'zh_CN',
        'language_url': 'assets/langs/zh_CN.js',
        'importcss_append': true,
        'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
        'image_advtab': true,
        'images_upload_handler': (blobInfo,success,failure)=>{
          console.log(blobInfo);
          
        }
      }} outputFormat= "html"  onEditorChange= {handleEditor} tagName="t_editor"/>
    </div>
  );
};
TinyEditor.propTypes = {

};
export default TinyEditor;