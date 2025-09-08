import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="min-w-sm p-6 bg-white rounded-3xl shadow-xl">
      {children}
    </div>
  );
};

export default Card;