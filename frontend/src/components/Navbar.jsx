import React from "react";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";


export default function Navbar() {
    const navigate = useNavigate()
    const { authInfo, handleLogout } = useAuth();
    const { isLoggedIn } = authInfo;
    const [active, setActive] = useState(false)
    const [search, setSearch] = useState("")

    const toggleSearch = () => {
        setActive(prevState => !prevState)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${search}`)
    }

    return (
        <nav className="bg-primary text-secondary drop-shadow-xl py-4 overflow-hidden flex justify-between items-center px-32">

            {/* Logo */}
            <Link to="/">
                <div className="flex items-center space-x-1">
                    <img src="./logo.png" alt="Logo" className="h-8 items-center" />
                    <span className="font-bold text-2xl">TCDb</span>
                </div>
            </Link>

            {/* Right Sided elements */}
            <div className="flex items-center space-x-4 relative">


                {/* Mini search-bar */}
                <div className={"flex items-center justify-end rounded-full outline-none transition-all duration-500 " + (active ? " bg-gray-300 text-primary w-36 py-0.5 " : " text-gray-200 ")} >
                    {active
                        ? <form onSubmit={handleSubmit}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                className="bg-inherit outline-none text-primary text-sm mx-1 transition-all duration-50 absolute w-28 left-1.5 bottom-1 tracking-tight " />
                            <FiX
                                onClick={toggleSearch}
                                className=" min-w-4 min-h-4 m-1 " />
                        </form>
                        : <HiOutlineSearch
                            onClick={toggleSearch}
                            className={"  min-w-4 min-h-4 m-1  "} />
                    }
                </div>

                {/* User's films */}
                <Link 
                    to="/my-films"
                    className="text-lg hover:text-white transition">
                    <p>Films</p>
                </Link>

                {/* Login/Signout */}
                <Link
                    to="/auth/signin"
                    onClick={isLoggedIn ? handleLogout : ""}
                    className=" text-lg hover:text-white transition">
                    {isLoggedIn ? "Sign Out " : "Login"}
                </Link>
            </div>

        </nav>
    );
}
