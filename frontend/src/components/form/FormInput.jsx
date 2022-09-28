import React from "react"

export default function FormInput({name, placeholder, label, ...rest }) {
    return (
        <div className="my-3">
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} placeholder={placeholder} {...rest} className="bg-transparent border-2 border-primary w-full placeholder-gray-500 px-2 py-1 rounded outline-none"/>
        </div>
    )
}