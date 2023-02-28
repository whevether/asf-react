import React, { Fragment, useEffect, useRef, useState } from 'react';
import Calendar from '@toast-ui/calendar';
import ImageEditor from 'tui-image-editor';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
import TuiGrid from 'tui-grid';
import TuiEditor from '@toast-ui/editor';
import { blackTheme, locale } from './option';
import 'tui-grid/dist/tui-grid.min.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import 'tui-image-editor/dist/tui-image-editor.min.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
const Index = () => {
  const calendarRef = useRef(null);
  const [editorValue, setEditorValue] = useState('');
  const imageEditRef = useRef(null);
  const gridRef = useRef(null);
  const tuieditorRef = useRef(null);
  const handleEditor = (value) => {
    setEditorValue(value);
  };
  const onRenderCalendar = () => {
    const options = {
      defaultView: 'week',
      theme: {
        // week daygrid 'daygrid'
        'week.daygrid.borderRight': '1px solid #ddd',
        'week.daygrid.backgroundColor': 'inherit',

        'week.daygridLeft.width': '77px',
        'week.daygridLeft.backgroundColor': '#a8def74d',
        'week.daygridLeft.paddingRight': '5px',
        'week.daygridLeft.borderRight': '1px solid #ddd',

        'week.today.backgroundColor': '#b857d81f',
        'week.weekend.backgroundColor': 'inherit',

        // week timegrid 'timegrid'
        'week.timegridLeft.width': '77px',
        'week.timegridLeft.backgroundColor': '#03a9f44d',
        'week.timegridLeft.borderRight': '1px solid #ddd',
        'week.timegridLeft.fontSize': '12px',
        'week.timegridLeftTimezoneLabel.height': '51px',
        'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

        'week.timegridOneHour.height': '48px',
        'week.timegridHalfHour.height': '24px',
        'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
        'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

        'week.timegrid.paddingRight': '10px',
        'week.timegrid.borderRight': '1px solid #ddd',
        'week.timegridSchedule.borderRadius': '0',
        'week.timegridSchedule.paddingLeft': '0',

        'week.currentTime.color': '#135de6',
        'week.currentTime.fontSize': '12px',
        'week.currentTime.fontWeight': 'bold',

        'week.pastTime.color': '#808080',
        'week.pastTime.fontWeight': 'normal',

        'week.futureTime.color': '#333',
        'week.futureTime.fontWeight': 'normal',

        'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
        'week.currentTimeLineBullet.backgroundColor': '#135de6',
        'week.currentTimeLineToday.border': '1px solid #135de6',
        'week.currentTimeLineFuture.border': '1px solid #135de6',

        // week creation guide style
        'week.creationGuide.color': '#135de6',
        'week.creationGuide.fontSize': '12px',
        'week.creationGuide.fontWeight': 'bold',

        // week daygrid schedule style
        'week.dayGridSchedule.borderRadius': '0',
        'week.dayGridSchedule.height': '18px',
        'week.dayGridSchedule.marginTop': '2px',
        'week.dayGridSchedule.marginLeft': '10px',
        'week.dayGridSchedule.marginRight': '10px'
      },
      calendars: [{ id: 'cal1', name: '日历' }],
      usageStatistics: true,
      heightResizable: true,
    };
    const calendar = new Calendar(calendarRef.current, options);
    calendar.setOptions({
      useFormPopup: true,
      useDetailPopup: true,
    });
  };
  const onRenderImageEditor = () => {
    const options = {
      includeUI: {
        theme: blackTheme, // or whiteTheme
        initMenu: 'filter',
        menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'text', 'filter'],
        menuBarPosition: 'bottom',
        locale: locale
      },
      cssMaxHeight: 500,
      cssMaxWidth: 700
    };
    new ImageEditor(imageEditRef.current, options);
  };
  const onRenderGrid = () => {
    const options = {
      el: gridRef.current,
      data: [
        {
          name: 'Beautiful Lies',
          artist: 'Birdy',
          release: '2016.03.26',
          type: 'Deluxe',
          genre: 'Pop'
        },
        {
          name: 'X',
          artist: 'Ed Sheeran',
          release: '2014.06.24',
          type: 'Deluxe',
          genre: 'Pop',
          _attributes: {
            disabled: true // A current row is disabled
          }
        },
        {
          name: 'Moves Like Jagger',
          release: '2011.08.08',
          artist: 'Maroon5',
          type: 'Single',
          genre: 'Pop,Rock',
          _attributes: {
            checkDisabled: true // A checkbox is disabled only
          }
        },
        {
          name: 'A Head Full Of Dreams',
          artist: 'Coldplay',
          release: '2015.12.04',
          type: 'Deluxe',
          genre: 'Rock',
          _attributes: {
            checked: true, // A checkbox is already checked while rendering
            className: {
              // Add class name on a row
              row: ['red']
            }
          }
        },
        {
          name: '19',
          artist: 'Adele',
          release: '2008.01.27',
          type: 'EP',
          genre: 'Pop,R&B',
          _attributes: {
            rowSpan: {
              // Merge rows
              artist: 3,
              genre: 2
            }
          }
        },
        {
          name: '21',
          artist: 'Adele',
          release: '2011.01.21',
          type: 'Deluxe',
          genre: 'Pop,R&B'
        },
        {
          name: '25',
          artist: 'Adele',
          release: '2015.11.20',
          type: 'EP',
          genre: 'Pop',
          _attributes: {
            className: {
              // Add class name on each columns
              column: {
                type: ['blue'],
                genre: ['blue']
              }
            }
          }
        }
      ],
      columns: [
        {
          header: 'Name',
          name: 'name',
          sortable: true,
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true }
        },
        {
          header: 'Artist',
          name: 'artist',
          sortable: true
        },
        {
          header: 'Type',
          name: 'type',
          sortable: true
        },
        {
          header: 'Release',
          name: 'release',
          sortable: true
        },
        {
          header: 'Genre',
          name: 'genre',
          sortable: true
        }
      ],
      rowHeight: 25,
      heightResizable: true,
      draggable: true,
      rowHeaders: ['checkbox']
    };
    new TuiGrid(options);
  };
  const onRenderTuiEditor = ()=>{
    const options = {
      el: tuieditorRef.current,
      initialValue: '欢迎使用',
      previewStyle: 'vertical',
      height: '600px',
      language: 'zh_CN',
      initialEditType: 'markdown',
      useCommandShortcut: true
    };
    new TuiEditor(options);
  };
  useEffect(() => {
    onRenderCalendar();
    onRenderImageEditor();
    onRenderGrid();
    onRenderTuiEditor();
  },[]);
  return (
    <div className="demo-wrapper">
      {head('组件示例')}
      <Fragment>
        <h3>日历组件</h3>
        <div style={{ height: '600px' }} ref={calendarRef} />
      </Fragment>

      <Fragment>
        <h3>tiny 富文本</h3>
        <Editor apiKey="f0ujtvkxmw64jnj6xstg4adv3vgxh73c5wbsgusq7si3pi1n" init={{
          'plugins': 'print preview fullpage  searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount  imagetools textpattern help',
          'min_height': 1200,
          'insert_button_items': 'insertfile',
          'language': 'zh_CN',
          'fontsize_formats': "8pt 10pt 12pt 14pt 16pt 18pt 22pt 24pt 36pt", // 第二步
          'language_url': '/assets/langs/zh_CN.js',
          'importcss_append': true,
          'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
          'image_advtab': true,
          // 'images_upload_handler': (blobInfo,success,failure)=>{
          //   console.log(blobInfo);

          // }
        }} outputFormat="html" value={editorValue} onEditorChange={handleEditor} tagName="t_editor" />
      </Fragment>
      <Fragment>
        <h3>图片编辑器</h3>
        <div style={{ height: '600px' }} ref={imageEditRef} />
      </Fragment>
      <Fragment>
        <h3 style={{ marginTop: '20px' }}>tui 表格</h3>
        <div ref={gridRef} />
      </Fragment>
      <Fragment>
        <h3 style={{ marginTop: '20px' }}>tui 富文本</h3>
        <div ref={tuieditorRef} style={{ height: '600px' }}/>
      </Fragment>
    </div>
  );
};
export default Index;