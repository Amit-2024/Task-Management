import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "react-hot-toast"
import { TaskContextProvider } from './context/TaskContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
    <Toaster /> 
  </React.StrictMode>,
)
