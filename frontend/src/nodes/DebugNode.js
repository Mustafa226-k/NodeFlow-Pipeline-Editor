import { BaseNode } from "./BaseNode";

export const DebugNode = ({ id }) => (
  <BaseNode
    title="Debug"
    inputs={[{ id: `${id}-data` }]}
  >
    <div>Logs data</div>
  </BaseNode>
);