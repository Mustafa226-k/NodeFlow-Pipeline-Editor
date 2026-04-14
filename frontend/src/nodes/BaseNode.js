import { Handle, Position } from "reactflow";

const baseStyle = {
  width: 240,
  minHeight: 100,
  border: "1px solid rgba(2,6,23,0.08)",
  borderRadius: 8,
  padding: 12,
  background: "#F1E9E9",
  fontSize: 13,
  color: "#111827",
  boxShadow: "0 10px 30px rgba(2,6,23,0.45)",
  position: "relative",
  overflow: "visible",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
};

const contentStyle = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: 12,
  gap: 6,
};

const controlStyle = {
  padding: "6px 8px",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  fontSize: 13,
};

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
  customWidth,
  customHeight,
}) => {
  const nodeStyle = {
    ...baseStyle,
    ...(customWidth && { width: customWidth }),
    ...(customHeight && { minHeight: customHeight }),
  };

  return (
    <div style={nodeStyle}>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            ...(input.style || {}),
          }}
          title={input.label || input.id}
        />
      ))}

      <div style={headerStyle}>
        <strong>{title}</strong>
      </div>

      <div style={contentStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {children}
        </div>
      </div>

      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            ...(output.style || {}),
          }}
          title={output.label || output.id}
        />
      ))}
    </div>
  );
};