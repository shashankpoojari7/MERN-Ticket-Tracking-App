import React from "react";

function Input({ label, type = "text", placeholder = "", className = "", ...props }, ref) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-semibold text-sm tracking-wide uppercase text-gray-700 ml-1">
                {label}:
            </label>
            {type === "textArea" ? (
                <textarea
                    className={`p-3 border-2 border-gray-200 rounded-xl text-sm resize-y transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 hover:border-gray-300 ${className}`}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                />
            ) : (
                <input
                    className={`p-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 hover:border-gray-300 ${className}`}
                    type={type}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                />
            )}
        </div>
    );
}

export default React.forwardRef(Input);