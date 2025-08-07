import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../api/userApi";

const RegisterForm = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, error, isLoading } = useSelector(state => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(userRegister({ fullName, email, password }))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h2>
                    <p className="text-gray-600">Create your new account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:border-gray-300"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:border-gray-300"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:border-gray-300"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
