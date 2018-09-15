import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const CodeBlock = (props) => {
  return (
      <div className="row">
        <div className="row col s10 offset-s1 code-block">
            <SyntaxHighlighter language='json' style={docco}>{props.codeString}</SyntaxHighlighter>
        </div>
      </div>

  )
}

export default CodeBlock
