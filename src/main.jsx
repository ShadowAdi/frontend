import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'
import Feed from './Feed.jsx'
import UserDetails from './UserDetails.jsx'
import { UserContextProvider } from '../context/UserContext.jsx'
import Users from './Users.jsx'
import EditProfile from './EditProfile.jsx'
import { ToastProvider } from '../context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/user/:userId" element={<UserDetails />} />
              <Route path="/users" element={<Users />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </ToastProvider>
  </StrictMode>,
)
