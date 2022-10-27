import React from "react";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect } from "react";


export default function Navbar() {
    const navigate = useNavigate()
    const { authInfo, handleLogout } = useAuth();
    const { isLoggedIn } = authInfo;
    const [active, setActive] = useState(false)
    const [search, setSearch] = useState("")
    const [activeMenu, setActiveMenu] = useState(false)


    const toggleMenu = () => {
        setActiveMenu(prevState => !prevState)
    }

    const toggleSearch = () => {
        setActiveMenu(false)
        setActive(prevState => !prevState)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${search}`)
    }

    // closes hamburger menu after 10s
    useEffect(() => {
        const timer = setTimeout(() => setActiveMenu(false), 10000)

        return () => {
            clearTimeout(timer)
        }
    },[activeMenu])

    return (
        <>
            <nav 
                className="bg-primary text-secondary drop-shadow-xl py-4 overflow-hidden flex justify-between items-center px-32 md:px-12 sm:px-4 xs:px-2 2xs:px-1">

                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center space-x-1 ">
                        <img src="./logo.png" alt="Logo" className="h-8 items-center 2xl:h-12" />
                        <span className="font-bold text-2xl 2xl:text-3xl 3xl:text-5xl">TCDb</span>
                    </div>
                </Link>

                {/* Right Sided elements */}
                <div className="flex items-center space-x-4 relative 2xs:pr-2 sm:pr-0 2xl:py-3 3xl:space-x-10 nav-right ">


                    {/* Mini search-bar */}
                    <div className={"flex items-center justify-end rounded-full outline-none transition-all duration-500 2xl:text-3xl md:w-60 " + (active ? " bg-gray-300 text-primary 2xs:w-36 xs:w-48  2xl:w-72 " : " text-gray-200 ")} >
                        {active
                            ? <form onSubmit={handleSubmit} className="flex items-center">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search"
                                    value={search}
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    className="bg-inherit outline-none text-primary px-1 transition-all duration-50 absolute 2xs:w-28 xs:w-40  left-1.5 tracking-tight 2xl:text-2xl 2xl:w-60 2xs:text-base md:w-52" />
                                <FiX
                                    onClick={toggleSearch}
                                    className=" min-w-4 min-h-4 m-1 2xs:w-6 2xs:h-6" />
                            </form>
                            : <HiOutlineSearch
                                onClick={toggleSearch}
                                className={"  min-w-4 min-h-4 m-1 2xs:w-6 2xs:h-6 "} />
                        }
                    </div>

                    <nav className="relative sm:hidden text-2xl" >
                        {activeMenu ? <FiX onClick={toggleMenu}/> : <FiMenu onClick={toggleMenu} />}
                    </nav>

                    {/* User's watchlist */}
                    <Link
                        to="/watchlist"
                        className="text-lg  hover:text-white transition 2xl:text-xl 3xl:text-3xl">
                        Watchlist
                    </Link>

                    {/* User's films */}
                    <Link
                        to="/my-films"
                        className="text-lg hover:text-white transition  2xl:text-xl 3xl:text-3xl">
                        <p>Films</p>
                    </Link>

                    {/* Login/Signout */}
                    <Link
                        to="/auth/signin"
                        onClick={isLoggedIn ? handleLogout : ""}
                        className=" text-lg hover:text-white transition 2xl:text-xl 3xl:text-3xl ">
                        {isLoggedIn ? "Sign Out " : "Login"}
                    </Link>
                </div>

            </nav>

            {activeMenu && 
            <div
                className="absolute flex flex-col text-gray-200 right-0 top-12 bg-slate-500 rounded py-2 px-3 sm:hidden z-50 ">
                <Link
                    to="/watchlist"
                    className="text-lg hover:text-white transition 2xl:text-3xl ">
                    Watchlist
                </Link>


                <Link
                    to="/my-films"
                    className="text-lg hover:text-white transition 2xl:text-3xl ">
                    <p>Films</p>
                </Link>


                <Link
                    to="/auth/signin"
                    onClick={isLoggedIn ? handleLogout : ""}
                    className=" text-lg hover:text-white transition 2xl:text-3xl ">
                    {isLoggedIn ? "Sign Out " : "Login"}
                </Link>
            </div>}
        </>
    );
}
