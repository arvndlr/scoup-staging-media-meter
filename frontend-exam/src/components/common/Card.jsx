import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
      {children}
    </div>
  );
};

export default Card;