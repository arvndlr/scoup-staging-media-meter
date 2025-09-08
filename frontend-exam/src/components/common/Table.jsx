// src/components/common/Table.jsx

import React from 'react';

const Table = ({ children, ...props }) => {
  return (
    <table className="w-full text-left table-auto" {...props}>
      {children}
    </table>
  );
};

export default Table;