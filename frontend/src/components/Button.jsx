import React, { useState } from 'react';

const Button = ({ 
    children, 
    variant = "primary", 
    type = "button",
    className = "",
    ...props 
  }) => {
    const baseStyles = "group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
      primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500"
    };
  
    return (
      <button
        type={type}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };