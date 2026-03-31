// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateAgent from './pages/CreateAgent';
import AgentStudio from './pages/AgentStudio';
import CreateWorkflow from './pages/AgentStudio/CreateWorkflow';
import { Routes, Route } from 'react-router-dom';
type Page = 'home' | 'createAgent' | 'agentStudio';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createagent" element={<CreateAgent />} />
      <Route path="/agentstudio" element={<AgentStudio />} />
      <Route path="/createworkflow" element={<CreateWorkflow />} />
    </Routes>
  );
}