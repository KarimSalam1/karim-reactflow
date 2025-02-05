"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import InputNode from "./components/nodes/InputNode";
import SelectNode from "./components/nodes/SelectNode";
import AddPanel from "./components/panels/AddPanel";
import EditPanel from "./components/panels/EditPanel";

const nodeTypes = { inputNode: InputNode, selectNode: SelectNode };

const initialNodes = [
  {
    id: "1",
    type: "inputNode",
    position: { x: 0, y: 0 },
    data: {
      value: "",
      label: "Username",
      inputType: "text",
      onchange: (evt) => {
        data.value = evt.target.value;
      },
    },
  },
  {
    id: "2",
    type: "selectNode",
    position: { x: 0, y: 100 },
    data: {
      value: "",
      label: "Habits",
      options: ["Reading", "Exercise", "Meditation", "Coding"],
      onchange: (evt) => {
        data.value = evt.target.value;
      },
    },
  },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => [
        ...eds,
        {
          ...connection,
          id: `e${connection.source}-${connection.target}`,
          type: "default",
          animated: true,
          style: { stroke: "#555" },
        },
      ]);
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPanelClose = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const onAddNode = useCallback(
    (data) => {
      const newNode = {
        id: Date.now().toString(),
        type: data.type,
        position: { x: 100, y: 100 },
        data: {
          label: data.label,
          ...(data.type === "selectNode" && { options: data.options }),
        },
      };

      setNodes((nds) => [...nds, newNode]);

      if (nodes.length > 0) {
        const previousNode = nodes[nodes.length - 1];
        setEdges((eds) => [
          ...eds,
          {
            id: `e${previousNode.id}-${newNode.id}`,
            source: previousNode.id,
            target: newNode.id,
            type: "custom",
            animated: true,
            style: { stroke: "#555" },
          },
        ]);
      }
    },
    [nodes, setNodes, setEdges]
  );

  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onEdgeClick={(event, edge) => {
        setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
      }}
      nodeTypes={nodeTypes}
      fitView
    >
      <Panel position="top-left">
        <AddPanel onAddNode={onAddNode} />
      </Panel>
      <EditPanel
        selectedNode={selectedNode}
        onClose={onPanelClose}
        updateNode={updateNodeData}
      />
      <Controls />
      <MiniMap />
      <Background />
    </ReactFlow>
  );
}

export default Flow;
