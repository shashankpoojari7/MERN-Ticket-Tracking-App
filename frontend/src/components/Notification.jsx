import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../store/notificationSlice';

const Notification = () => {
    const dispatch = useDispatch();
    const { message, type, show } = useSelector((state) => state.notification);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                dispatch(hideNotification());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, dispatch]);

    function handleClick(){
        dispatch(hideNotification())
    }

    if (!show) return null;

    const baseStyles = `fixed top-20 right-4 px-6 py-4 rounded-xl shadow-2xl transition-all duration-500 transform z-[9999] flex items-center justify-between min-w-[300px] max-w-md border backdrop-blur-sm`;

    const typeStyles = {
        success: 'bg-green-50 text-green-800 border-green-200 shadow-green-100',
        error: 'bg-red-50 text-red-800 border-red-200 shadow-red-100',
        info: 'bg-blue-50 text-blue-800 border-blue-200 shadow-blue-100',
    };

    const iconStyles = {
        success: (
            <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div className={`${baseStyles} ${typeStyles[type] || 'bg-gray-50 text-gray-800 border-gray-200'} animate-in slide-in-from-right duration-500`}>
            <div className="flex items-start">
                {iconStyles[type]}
                <div className="flex-1">
                    <p className="font-medium text-sm leading-relaxed">{message}</p>
                </div>
            </div>
            <button
                className="ml-4 p-1 rounded-full hover:bg-black/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                onClick={() => dispatch(hideNotification())}
                aria-label="Close notification"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Notification;