import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/dark-logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const handlelogout = () => {
        dispatch(logout());
        navigate('/login', { state: { fromLogout: true } });
        dispatch(showNotification({
            message: "Logged out successfully.",
            type: 'info'
        }));
    };

    return (
        <header className='w-full h-[70px] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-lg sticky top-0 z-50'>
            <nav className='flex justify-between items-center h-full px-4 lg:px-8 max-w-7xl mx-auto'>
                {/* Logo */}
                <div className='flex-shrink-0'>
                    <Link to="/" className='block'>
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className='h-12 w-auto hover:scale-105 transition-transform duration-200' 
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className='hidden md:flex items-center'>
                    <ul className='flex space-x-8'>
                        <li>
                            <NavLink 
                                to="/create-ticket"
                                className={({ isActive }) =>
                                    `text-white font-medium text-sm lg:text-base uppercase tracking-wide px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-yellow-300 ${
                                        isActive 
                                            ? "bg-white/20 text-yellow-300 border-b-2 border-yellow-300" 
                                            : "border-b-2 border-transparent"
                                    }`
                                }
                            >
                                Create Ticket
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/view-ticket"
                                className={({ isActive }) =>
                                    `text-white font-medium text-sm lg:text-base uppercase tracking-wide px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-yellow-300 ${
                                        isActive 
                                            ? "bg-white/20 text-yellow-300 border-b-2 border-yellow-300" 
                                            : "border-b-2 border-transparent"
                                    }`
                                }
                            >
                                View Tickets
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Auth Buttons */}
                <div className='flex items-center space-x-3'>
                    {isAuthenticated ? (
                        <button
                            onClick={handlelogout}
                            className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95'
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className='bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95'>
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95'>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header