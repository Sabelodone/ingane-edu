// src/components/ui/textarea.jsx

import React from "react";

const Textarea = ({ id, name, value, onChange, placeholder, rows = 4, className = "" }) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${className}`}
    />
  );
};

export default Textarea;
