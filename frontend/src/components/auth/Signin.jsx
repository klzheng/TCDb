import React from "react"
import {Link} from "react-router-dom"
import FormInput from "../form/FormInput"
import Submit from "../form/Submit"

export default function SignIn() {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form action="" className="bg-secondary rounded p-5">
                    <h1 className="text-center text-3xl font-semibold mb-5">
                        Sign in
                    </h1>
                    <FormInput 
                        name="email" 
                        label="Email" 
                        placeholder="klzheng@buffalo.edu" 
                    />
                    <FormInput 
                        name="password" 
                        label="Password" 
                        placeholder="**************" 
                    />
                    <Submit value="Sign In"/>
                    <div className="flex justify-between mt-2">
                        <Link 
                            className="text-gray-700 hover:text-black transition " 
                            to="/auth/forgot-password">Forgot Password</Link>
                        <Link 
                            className="text-gray-700 hover:text-black transition" 
                            to="/auth/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}