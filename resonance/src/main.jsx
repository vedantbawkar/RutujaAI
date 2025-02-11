import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import HomePage from './components/ui/HomePage.jsx';
import Dashboard from './components/ui/Dashboard.jsx';
import ChatBot from './components/ui/ChatBot';
import Microfinance from './components/ui/Microfinance.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/chatbot',
        element: <ChatBot />,
      },
      {
        path: '/microfinance',
        element: <Microfinance />,
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} >
    <App />
  </RouterProvider >,
)
