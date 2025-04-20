import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './Context/SearchContext'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <SearchProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </SearchProvider>
  </ThemeProvider>
)
