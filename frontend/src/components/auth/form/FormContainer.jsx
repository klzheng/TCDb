import React from "react";


export default function Container(props) {
    return (
        <div className={"max-w-screen-xl mx-auto items-center "}>
            {props.children}
        </div>
    );
}
