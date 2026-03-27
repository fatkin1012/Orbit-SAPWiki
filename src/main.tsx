import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import createMockContext from './mockContext';
import { PLUGIN_ROOT_ID } from './types';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Ensure dev preview uses the same prefixed plugin root id so styles apply
rootElement.id = PLUGIN_ROOT_ID;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App context={createMockContext()} />
  </React.StrictMode>
);
