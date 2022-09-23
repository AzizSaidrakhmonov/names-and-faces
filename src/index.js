import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameContextProvider } from './context/GameContext';
import 'normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GameContextProvider>
      <App />
    </GameContextProvider>
);

