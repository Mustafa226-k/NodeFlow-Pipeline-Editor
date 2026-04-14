// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      alert(
        `Pipeline Analysis:\n\n` +
        `Number of Nodes: ${data.num_nodes}\n` +
        `Number of Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? "Yes" : "No"}`
      );

    } catch (error) {
      console.error(error);
      alert("Error connecting to backend.");
    }
  };

  return (
    <div className="submit-container">
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};