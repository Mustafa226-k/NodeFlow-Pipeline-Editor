from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


class Pipeline(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]


def is_dag(nodes, edges):
    graph = defaultdict(list)
    in_degree = {node["id"]: 0 for node in nodes}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        graph[source].append(target)
        in_degree[target] += 1

    # Kahn's Algorithm
    queue = deque([node for node in in_degree if in_degree[node] == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status
    }