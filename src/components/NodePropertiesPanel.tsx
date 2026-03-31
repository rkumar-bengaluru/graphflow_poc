// src/components/NodePropertiesPanel.tsx
import React from 'react';
import { Node } from 'reactflow';

interface NodePropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (updatedNode: Node) => void;
}

export default function NodePropertiesPanel({ selectedNode, onUpdateNode }: NodePropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div style={{ width: 300, borderLeft: '1px solid #ccc', padding: 10, background: '#fafafa' }}>
        <p>Select a node to edit its properties</p>
      </div>
    );
  }

  const { actionName, integration, description, ActionType, inputSchema, outputSchema } = selectedNode.data;

  const handleChange = (field: string, value: string) => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        [field]: value,
      },
    };
    onUpdateNode(updatedNode);
  };

  return (
    <div style={{ width: 300, borderLeft: '1px solid #ccc', padding: 10, background: '#fafafa' }}>
      <h4>{actionName}</h4>
      <p><strong>Integration:</strong> {integration}</p>

      <label><strong>Description:</strong></label>
      <textarea
        value={description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
        style={{ width: '100%', minHeight: 60 }}
      />

      <label><strong>Action Type:</strong></label>
      <input
        type="text"
        value={ActionType || ''}
        onChange={(e) => handleChange('ActionType', e.target.value)}
        style={{ width: '100%' }}
      />

      <h5>Input Schema</h5>
      <textarea
        value={JSON.stringify(inputSchema || {}, null, 2)}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            handleChange('inputSchema', parsed);
          } catch {
            // ignore invalid JSON
          }
        }}
        style={{ width: '100%', minHeight: 120, fontFamily: 'monospace' }}
      />

      <h5>Output Schema</h5>
      <textarea
        value={JSON.stringify(outputSchema || {}, null, 2)}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            handleChange('outputSchema', parsed);
          } catch {
            // ignore invalid JSON
          }
        }}
        style={{ width: '100%', minHeight: 120, fontFamily: 'monospace' }}
      />
    </div>
  );
}
