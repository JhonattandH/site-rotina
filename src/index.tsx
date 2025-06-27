// index.tsx - Ponto de entrada da aplicação React
// Renderiza o componente App no DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Busca o elemento root no HTML
 * Este é o elemento onde a aplicação React será renderizada
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Renderiza a aplicação principal
 * React.StrictMode ajuda a identificar problemas no desenvolvimento
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
