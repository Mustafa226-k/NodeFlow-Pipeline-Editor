import { BaseNode } from "./BaseNode";

export const ConditionNode = ({ id }) => (
  <BaseNode
    title="Condition"
    inputs={[{ id: `${id}-value` }]}
    outputs={[
      { id: `${id}-true`, style: { top: "30%" } },
      { id: `${id}-false`, style: { top: "70%" } }
    ]}
  >
    <div>If value {'>'} 10</div>
  </BaseNode>
);