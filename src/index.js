import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.createElement('div');
container.id = 'react-extension-root';
document.body.appendChild(container);

const root = ReactDOM.createRoot(document.getElementById(container.id));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
