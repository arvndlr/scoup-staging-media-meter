import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="min-w-lg p-4 bg-white rounded-3xl shadow-xl">
      {children}
    </div>
  );
};

export default Card;