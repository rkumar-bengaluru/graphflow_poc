import React, { useState, useCallback } from 'react';
import Sidebar from '../../components/Sidebar';
import { Handle, Position } from 'reactflow';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodePropertiesPanel from '../../components/NodePropertiesPanel';
import { getIntegrations } from '../../data/integrations';
// Custom node component
function ActionNode({ data }: { data: any }) {
  return (
    <div style={{
      padding: '10px',
      border: '1px solid #333',
      borderRadius: 4,
      background: '#e6f7ff',
      minWidth: 120,
      textAlign: 'center',
    }}>
      <strong>{data.actionName}</strong>
      {/* Input handle (left side) */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

      {/* Output handle (right side) */}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    
    </div>
  );
}

const nodeTypes = { actionNode: ActionNode };

export default function CreateWorkflow() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  // inside component
const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const payload = event.dataTransfer.getData('application/reactflow');
      if (!payload) return;

      const action = JSON.parse(payload);
      const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
      const position = { x: event.clientX - bounds.left - 250, y: event.clientY - bounds.top };

      const newNode: Node = {
        id: `${action.integration}_${action.actionName}_${Date.now()}`,
        type: 'actionNode',
        position,
        data: action,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };
const handleUpdateNode = (updatedNode: Node) => {
  setNodes((nds) =>
    nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
  );
  setSelectedNode(updatedNode);
};
  return (
    <div>
      <h3>Create Workflow</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', height: '70vh', border: '1px solid #ccc' }}>
        <Sidebar integrations={getIntegrations()}/>
        <div style={{ flex: 1 }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
        {/* Right side panel */}
        <NodePropertiesPanel selectedNode={selectedNode} onUpdateNode={handleUpdateNode} />
       
      </div>
    </div>
  );
}
