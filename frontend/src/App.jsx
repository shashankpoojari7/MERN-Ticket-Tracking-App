import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import { setCurrentUserData } from './store/authSlice'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))
        
        if(userData) {
            dispatch(setCurrentUserData(userData))
        }
    },[])

return (
    <div className="min-h-screen bg-gray-50">
            <Header />
            <Notification />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>

)
}

export default App