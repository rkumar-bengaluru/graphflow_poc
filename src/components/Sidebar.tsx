import React, { useState } from 'react';
import { Integration, ActionDefinition } from '../types';

interface SidebarProps {
  integrations: Integration[];
}

export default function Sidebar({ integrations }: SidebarProps) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const onDragStart = (
    event: React.DragEvent,
    integration: Integration,
    action: ActionDefinition
  ) => {
    const payload = JSON.stringify({
      integration: integration.Name,
      actionName: action.Name,
      description: action.Description,
      ActionType: action.ActionType,
      inputSchema: action.InputSchema,
      outputSchema: action.OutputSchema,
    });
    event.dataTransfer.setData('application/reactflow', payload);
    event.dataTransfer.effectAllowed = 'move';
  };

  // If search is active, collect all matching actions across integrations
  const globalMatches: { integration: string; action: ActionDefinition }[] = [];
  if (search) {
    integrations.forEach((integration) => {
      integration.Actions.forEach((a) => {
        if (
          a.Name.toLowerCase().includes(search.toLowerCase()) ||
          a.Description.toLowerCase().includes(search.toLowerCase())
        ) {
          globalMatches.push({ integration: integration.Name, action: a });
        }
      });
    });
  }

  return (
    <aside
      style={{
        width: 260,
        background: '#f9f9f9',
        padding: 10,
        overflowY: 'auto',
      }}
    >
      <input
        type="text"
        placeholder="Search actions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 6 }}
      />

      {search ? (
        // Flat list of matches
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {globalMatches.map(({ integration, action }) => (
            <li
              key={integration + action.Name}
              draggable
              onDragStart={(e) =>
                onDragStart(e, { Name: integration, Description: '', Actions: [] }, action)
              }
              style={{
                margin: '4px 0',
                padding: '6px',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'grab',
                background: '#fff',
              }}
            >
              <strong>{integration}</strong> → {action.Name}
            </li>
          ))}
          {globalMatches.length === 0 && (
            <li style={{ fontSize: '12px', color: '#999' }}>No matching actions</li>
          )}
        </ul>
      ) : (
        // Accordion view when no search
        integrations.map((integration) => (
          <div key={integration.Name} style={{ marginBottom: 10 }}>
            <div
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '6px',
                background: '#eee',
                borderRadius: 4,
              }}
              onClick={() =>
                setExpanded(expanded === integration.Name ? null : integration.Name)
              }
            >
              {integration.Name}
            </div>
            {expanded === integration.Name && (
              <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 6 }}>
                {integration.Actions.map((action) => (
                  <li
                    key={action.Name}
                    draggable
                    onDragStart={(e) => onDragStart(e, integration, action)}
                    style={{
                      margin: '4px 0',
                      padding: '6px',
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      cursor: 'grab',
                      background: '#fff',
                    }}
                  >
                    {action.Name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </aside>
  );
}
