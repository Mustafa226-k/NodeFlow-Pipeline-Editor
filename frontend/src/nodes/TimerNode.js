import { BaseNode } from "./BaseNode";

export const TimerNode = ({ id }) => (
  <BaseNode
    title="Timer"
    outputs={[{ id: `${id}-tick` }]}
  >
    <div>Emits event every 5s</div>
  </BaseNode>
);