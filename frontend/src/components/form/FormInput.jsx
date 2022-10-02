import React from "react";


export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="my-3">
      <label
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="bg-transparent border-2 border-primary w-full placeholder-gray-500 px-2 py-1 rounded outline-none"
        placeholder={placeholder}
        {...rest}
      />

    </div>
  );
}
