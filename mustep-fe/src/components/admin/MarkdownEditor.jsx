import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

const MarkdownEditor = ({contents, setContents}) => {


  return (
    <div className='container'> 
      <MDEditor height={500} value={contents} onChange={setContents} />
      {/* <MDEditor.Markdown source={value} style={{whiteSpace: 'pre-wrap'}} /> */}
    </div>
  )
}

export default MarkdownEditor
