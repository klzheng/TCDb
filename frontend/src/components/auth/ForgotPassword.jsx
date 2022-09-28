import React from "react"
import {Link} from "react-router-dom"
import FormInput from "../form/FormInput"
import Submit from "../form/Submit"


export default function ForgotPassword() {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form action="" className="bg-secondary rounded p-5 w-96">
                    <h1 className="text-center text-xl font-semibold mb-5">
                        Please Enter Your Email
                    </h1>
                    <FormInput 
                        name="email" 
                        label="Email" 
                        placeholder="klzheng@buffalo.edu" 
                    />
                    <Submit value="Send Link" />
                    <div className="flex justify-between mt-2">
                        <Link 
                            className="text-gray-700 hover:text-black transition " 
                            to="/auth/signin">Sign In</Link>
                        <Link 
                            className="text-gray-700 hover:text-black transition" 
                            to="/auth/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}