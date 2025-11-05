
import React from 'react';
import { createRoot } from 'react-dom/client';
import SCMApp from './SCMApp.tsx';
import './index.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <SCMApp />
    </React.StrictMode>
  );
}
