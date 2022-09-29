import React from "react"
import {Link} from "react-router-dom"
import {FiSun} from "react-icons/fi"
// import Container from "../Container"

export default function Navbar() {
    return (
        <div className="bg-primary text-secondary drop-shadow-xl py-5">
            <div className="max-w-screen-xl mx-auto items-center flex justify-between px-5">
                <div className="flex items-center space-x-1">
                    <Link to="/">
                        <img src="./logo.png" alt="Logo" className="h-8 items-center" />
                    </Link>
                    <Link to="/">
                        <span className="font-bold text-2xl">TCDb</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button>
                        <FiSun className="h-8" size={24} />
                    </button>
                    <input type="text" placeholder="Search" className="border-2 border-gray-300 bg-gray-300 rounded-md px-1 text-gray-500 outline-none" />
                    <Link to="auth/signin">
                        <span className="tracking-wider">LOGIN</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}