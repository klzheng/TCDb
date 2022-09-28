import React from "react"

export default function Submit({ value }) {
    return (
        <input type="submit" className="w-full bg-primary text-white rounded hover:bg-gray-800 transition font-semibold text-lg py-2 mt-1" value={value} />
    )
}