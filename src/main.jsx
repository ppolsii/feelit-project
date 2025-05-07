// main.jsx - Entry point of the React app

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './Context/SearchContext';
import { LayoutProvider } from './Context/LayoutContext'; // Layout mode context
import App from './App';

// Wrap the entire app with required providers (theme, layout, search, routing)
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <LayoutProvider> {/* Provides layoutMode: 'inici' or 'search' */}
      <SearchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchProvider>
    </LayoutProvider>
  </ThemeProvider>
);
