import React from "react";
import { Link } from "react-router-dom";
import { useAuth} from "../hooks";


export default function Navbar() {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

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
          <input type="text" placeholder="Search" className="border-2 border-gray-300 bg-gray-300 rounded-md px-1 text-gray-500 outline-none" />
          {isLoggedIn ? (<button onClick={handleLogout} className="font-bold text-xl hover:text-white transition">SIGN OUT</button>) : (
              <Link to="auth/signin">
                  <span className="tracking-wider font-bold text-xl hover:text-white transition">LOGIN</span>
              </Link>
          )}
        </div>
      </div>
    </div>
  );
}
