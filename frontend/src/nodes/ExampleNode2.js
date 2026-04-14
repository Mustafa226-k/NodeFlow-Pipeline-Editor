import { BaseNode } from "./BaseNode";

export const ExampleNode2 = ({ id }) => (
  <BaseNode
    title="Example 2"
    inputs={[
      { id: `${id}-a`, style: { top: "30%" } },
      { id: `${id}-b`, style: { top: "70%" } }
    ]}
    outputs={[{ id: `${id}-result` }]}
  >
    <div>Combines two inputs</div>
  </BaseNode>
);