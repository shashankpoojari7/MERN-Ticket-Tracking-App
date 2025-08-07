import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../store/notificationSlice.js'

const AuthLayout = ({children}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authStatus = useSelector(state => state.auth.isAuthenticated)

    useEffect(() => {
        if (!authStatus) {
            dispatch(showNotification({
                message: "You're logged out. Log in again to access!",
                type: 'info'   
            }))
            navigate('/login');
        }
    }, [authStatus]);

    return authStatus ? <>{children}</> : null;
}

export default AuthLayout
