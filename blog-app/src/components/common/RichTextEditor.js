import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div className="rich-text-editor">
      <Editor
        apiKey="0jpjvcikpobaao99ynw4aak9lasfhv74rg3kvu30w44f7qmw"
        value={value}
        init={{
          height: 400,
          menubar: true,
          skin: 'oxide-dark',
          content_css: 'dark',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'emoticons', 'codesample'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic underline strikethrough | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | link image media table | code codesample | ' +
            'forecolor backcolor emoticons | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' }
          ],
          image_advtab: true,
          image_title: true,
          automatic_uploads: false, // 禁用自动上传
          file_picker_types: 'image',
          // 自定义文件选择器回调，只允许通过URL插入图片
          file_picker_callback: function(cb, value, meta) {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', '请输入图片URL');
            
            input.onchange = function() {
              cb(this.value, { title: 'Image' });
            };
            
            input.click();
          }
        }}
        onEditorChange={(content) => onChange(content)}
      />
    </div>
  );
};

export default RichTextEditor;