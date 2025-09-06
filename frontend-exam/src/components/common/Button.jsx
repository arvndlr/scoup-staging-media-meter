import React from 'react';

const Button = ({ children, className, ...props }) => {
  const baseStyles = 'rounded-md text-white font-semibold py-2 px-4 transition-colors duration-200';
  
  return (
    <button
      className={`${baseStyles} w-full block ${className}`} // Add w-full and block here
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;