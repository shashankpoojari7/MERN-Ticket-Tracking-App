import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({children}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authStatus = useSelector(state => state.auth.isAuthenticated)

    useEffect(() => {
        if (!authStatus) {
            navigate('/login');
        }
    }, [authStatus]);

    return authStatus ? <>{children}</> : null;
}

export default AuthLayout
