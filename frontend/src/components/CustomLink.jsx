import React from "react";
import { Link } from "react-router-dom";


export default function CustomLink({ to, children }) {
  return (
    <Link
      className="text-gray-700 hover:text-black transition"
      to={to}
    >
      {children}
    </Link>
  );
}
