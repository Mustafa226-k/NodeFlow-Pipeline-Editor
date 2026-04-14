import { BaseNode } from "./BaseNode";

export const ExampleNode = ({ id }) => (
  <BaseNode
    title="Example 1"
    inputs={[{ id: `${id}-input` }]}
    outputs={[{ id: `${id}-output` }]}
  >
    <div>Basic pass-through node</div>
  </BaseNode>
);