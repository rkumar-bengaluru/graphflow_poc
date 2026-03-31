// src/components/Header.tsx
import React from 'react';

type Page = 'home' | 'createAgent' | 'agentStudio';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  return (
    <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>Home</span>
        <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('createAgent')}>Create Agent</span>
        <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('agentStudio')}>Agent Studio</span>
      </nav>
    </header>
  );
}
