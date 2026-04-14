import { useState, useRef, useEffect } from "react";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [height, setHeight] = useState(80);
  const [width, setWidth] = useState(240);
  const textareaRef = useRef(null);

  // Parse variables from text (pattern: {{ variableName }})
  const extractVariables = (text) => {
    const variableRegex = /{{\s*(\w+)\s*}}/g;
    const variables = [];
    let match;
    while ((match = variableRegex.exec(text)) !== null) {
      const varName = match[1];
      if (!variables.find(v => v === varName)) {
        variables.push(varName);
      }
    }
    return variables;
  };

  // Get all variables from current text
  const variables = extractVariables(currText);

  // Create input handles for each variable
  const inputs = variables.map((varName, index) => ({
    id: `${id}-${varName}`,
    label: varName,
    style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` }
  }));

  // Auto-resize textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.max(80, Math.min(textarea.scrollHeight, 300));
      setHeight(newHeight);
      
      // Calculate width based on longest line
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length));
      const estimatedWidth = Math.max(240, Math.min(60 + maxLineLength * 8, 400));
      setWidth(estimatedWidth);
    }
  }, [currText]);

  const textareaStyle = {
    padding: '8px 10px',
    border: '1px solid #d1c4c4',
    borderRadius: '4px',
    background: '#ffffff',
    color: '#111827',
    fontSize: '13px',
    fontFamily: 'monospace',
    resize: 'none',
    width: '100%',
    height: `${height - 80}px`,
    minHeight: '60px',
    transition: 'height 0.2s ease-in-out',
  };

  return (
    <BaseNode
      title="Text"
      inputs={inputs}
      outputs={[
        { id: `${id}-output` }
      ]}
      customWidth={width}
      customHeight={height}
    >
      <label style={{ width: '100%' }}>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#111827' }}>
          Text (use {`{{ variableName }}`} for variables)
        </span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={textareaStyle}
        />
      </label>
      
      {variables.length > 0 && (
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};