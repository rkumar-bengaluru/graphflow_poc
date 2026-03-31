// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateAgent from './pages/CreateAgent';
import AgentStudio from './pages/AgentStudio';

type Page = 'home' | 'createAgent' | 'agentStudio';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onNavigate={setPage} />
      <main style={{ flex: 1, padding: '20px' }}>
        {page === 'home' && <Home />}
        {page === 'createAgent' && <CreateAgent />}
        {page === 'agentStudio' && <AgentStudio />}
      </main>
      <Footer />
    </div>
  );
}
