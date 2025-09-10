import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="min-w-[494px] p-[28px] bg-white rounded-4xl shadow-card gap-6">
      {children}
    </div>
  );
};

export default Card;