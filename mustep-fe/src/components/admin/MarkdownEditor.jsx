import React, { useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import axios from "axios";

const MarkdownEditor = ({ contents, setContents }) => {
  return (
    <div className="container">
      <MDEditor
        height={500}
        value={contents}
        onChange={setContents}
        data-color-mode="light"
      />
      {/* <MDEditor.Markdown source={value} style={{whiteSpace: 'pre-wrap'}} /> */}
    </div>
  );
};

export default MarkdownEditor;
