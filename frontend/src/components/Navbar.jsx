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
        <div className="bg-primary text-secondary drop-shadow-xl py-5 overflow-hidden">
            <div className="max-w-screen-xl mx-auto items-center flex justify-between px-28">
                <Link to="/">
                    <div className="flex items-center space-x-1">
                        <img src="./logo.png" alt="Logo" className="h-8 items-center" />
                        <span className="font-bold text-2xl">TCDb</span>
                    </div>
                </Link>
                <div className="flex items-center space-x-16 relative">
                    <div className={"flex items-center justify-end rounded-full outline-none transition-all duration-500 absolute right-3/4" + (active ? " bg-gray-300 text-primary w-36 " : " text-gray-200 ")} >
                        {active
                            ? <form onSubmit={handleSubmit}>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search"
                                    value={search}
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    className="bg-inherit outline-none text-primary text-sm mx-1 transition-all duration-50 absolute w-9/12 left-1.5 bottom-0.5 " />
                                <FiX
                                    onClick={toggleSearch}
                                    className=" min-w-4 h-4 m-1" />
                            </form>
                            : <HiOutlineSearch
                                onClick={toggleSearch}
                                className={"  min-w-4 h-4 m-1 "} />
                        }
                    </div>

                    <Link
                        to="auth/signin"
                        onClick={isLoggedIn ? handleLogout : ""}
                        className="font-bold text-xl hover:text-white transition">
                        {isLoggedIn ? "SIGN OUT" : "LOGIN"}
                    </Link>

                </div>
            </div>
        </div>
    );
}
