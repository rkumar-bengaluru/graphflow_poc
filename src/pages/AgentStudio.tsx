// src/pages/AgentStudio/AgentStudio.tsx
import React, { useState } from 'react';
import ListWorkflows from './AgentStudio/ListWorkflows';
import CreateWorkflow from './AgentStudio/CreateWorkflow';
import { ReactFlowProvider } from 'reactflow';

export default function AgentStudio() {
  const [tab, setTab] = useState<'list' | 'create'>('list');

  return (
    <ReactFlowProvider>
      <div>
        <nav style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setTab('list')}>List Workflows</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setTab('create')}>Create Workflow</span>
        </nav>
        {tab === 'list' ? <ListWorkflows /> : <CreateWorkflow />}
      </div>
    </ReactFlowProvider>
  );
}
