import React from "react";


export default function FormContainer(props) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
      {props.children}
    </div>
  );
}
