from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    # Build a directed graph
    G = nx.DiGraph()
    for node in nodes:
        G.add_node(node["id"])
    for edge in edges:
        G.add_edge(edge["source"], edge["target"])

    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = nx.is_directed_acyclic_graph(G)

    return JSONResponse({
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    })
