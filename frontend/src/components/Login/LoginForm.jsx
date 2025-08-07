import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../api/userApi";
import LoadingOverlay from "../LoadingOverlay";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated, error, isLoading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(userLogin({ email, password }));
    };

    if (isLoading) return <LoadingOverlay text1="Authenticating..." text2="Please wait a moment" />

    return (
        <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 hover:border-gray-300"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 hover:border-gray-300"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;