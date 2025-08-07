import React from 'react';

const LoadingOverlay = (props) => {
    return (
        <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-10 flex flex-col items-center shadow-2xl border border-gray-100 backdrop-blur-sm max-w-sm w-full">
                {/* Enhanced Loading Spinner */}
                <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
                    
                    {/* Additional spinning ring */}
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animation-delay-150"></div>
                </div>

                {/* Loading Text */}
                <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-gray-800">{props.text1}</p>
                    <p className="text-sm text-gray-500">{props.text2}</p>
                </div>

                {/* Progress Dots */}
                <div className="flex space-x-2 mt-6">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce animation-delay-400"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;