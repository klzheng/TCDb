import React from "react"

export default function Signin() {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form action="" className="bg-secondary rounded p-5">
                    <h1 className="text-center text-3xl font-semibold mb-5">Sign in</h1>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" placeholder="klzheng@buffalo.edu" className="bg-transparent border-2 border-primary w-full placeholder-gray-500 px-1 rounded outline-none"/>
                    </div>
                </form>
            </div>
            
        </div>
    )
}