import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom"
import RegisterForm from './components/Register/RegisterForm.jsx'
import LoginForm from './components/Login/LoginForm.jsx'
import CreateTicket from './components/CreateTicket/CreateTicket.jsx'
import ViewTicket from './components/ViewTicket/ViewTicket.jsx'
import AuthLayout from './components/AuthLayout.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App/>}>
        <Route index element={
          <AuthLayout>
            <CreateTicket/>
          </AuthLayout>
        } />
        <Route 
        path="create-ticket" 
        element={
          <AuthLayout>
            <CreateTicket/>
          </AuthLayout>
        } />
        <Route 
        path="view-ticket" 
        element={
          <AuthLayout>
            <ViewTicket />
          </AuthLayout>
        } />
        <Route path ="register" element = {<RegisterForm/>}/>
        <Route path ="login" element = {<LoginForm/>}/>
      </Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
