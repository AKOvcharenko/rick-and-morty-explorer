import React from 'react';
import ReactDOM from 'react-dom/client';

import './reset.css';
import './index.css';
import App from './App';

const rootHolder = document.getElementById('root');

if (rootHolder) {
  ReactDOM.createRoot(rootHolder).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
