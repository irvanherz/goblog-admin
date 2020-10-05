import React, { useState } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CKEditorInput = ({ value, onChange }) => {
  const [editorData, setEditorData] = useState('')

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(value || changedValue || editorData)
    }
  };

  const onEditorChange = (event, editor) => {
    const data = editor.getData()
    if (value === undefined) {
      setEditorData(data)
    }

    triggerChange(data)
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={onEditorChange}
      data={value || editorData}
    />
  );
}

export default CKEditorInput