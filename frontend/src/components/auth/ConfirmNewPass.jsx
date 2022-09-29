import React from "react"
import {Link} from "react-router-dom"
import FormInput from "../form/FormInput"
import Submit from "../form/Submit"

export default function ConfirmNewPass() {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form action="" className="bg-secondary rounded p-5 w-96">
                    <h1 className="text-center text-xl font-semibold mb-5">
                        Enter New Password
                    </h1>
                    <FormInput 
                        name="password" 
                        label="New Password" 
                        placeholder="**********" 
                        type="password"
                    />
                    <FormInput 
                        name="confirmPassword" 
                        label="Confirm Password" 
                        placeholder="**********" 
                        type="password"
                    />
                    <Submit value="Save New Password" />
                </form>
            </div>
        </div>
    )
}