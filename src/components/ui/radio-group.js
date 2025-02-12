import React from "react";

const RadioGroup = ({ children, className }) => {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
};

const RadioGroupItem = ({ label, value, name, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className={`w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center ${checked ? 'border-purple-600' : ''}`}>
        {checked && <div className="w-3 h-3 bg-purple-600 rounded-full"></div>}
      </div>
      <span className="text-gray-800">{label}</span>
    </label>
  );
};

export { RadioGroup, RadioGroupItem };
