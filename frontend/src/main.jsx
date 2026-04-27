// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './home.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// This tells React: "Don't touch the whole page, just control the button spot!"
const buttonElement = document.getElementById('reroute-button-root');

if (buttonElement) {
  ReactDOM.createRoot(buttonElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
