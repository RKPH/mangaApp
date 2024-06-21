import React from "react";

function FormInput({ label, value, onChange, type, placeholder }) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={label.toLowerCase()} className="text-black font-semibold">
        {label}
      </label>
      <div className="inputForm px-2 border border-gray-300 rounded-lg flex items-center transition duration-200 focus-within:border-blue-500">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          id={label.toLowerCase()}
          className="input p-2 placeholder-gray-400 outline-none focus:placeholder-opacity-0 flex-1"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default FormInput;
