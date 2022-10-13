import React from "react";
import { Link } from "react-router-dom";


export default function CustomLink(props) {
  return (
    <Link
      className="text-gray-700 hover:text-black transition"
      to={props.to}
    >
      {props.children}
    </Link>
  );
}
