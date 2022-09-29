import React, { useEffect, useState } from "react"
import {useLocation, useNavigate} from "react-router-dom"
import { verifyUserEmail } from "../../api/auth"
// import {Link} from "react-router-dom"
// import FormInput from "../form/FormInput"
import Submit from "../form/Submit"


const MAX_LENGTH = 6
let OTP = ""

function isValidOTP(OTP) {
    let isValid
    isValid = !(OTP.length === MAX_LENGTH)
    return isValid
}

export default function EmailVerification() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const user = state?.user

    // prevents any invalid OTP input
    const blockInvalidChar = (e) => {
        const allowable = ["Backspace", "Enter", "ArrowLeft", "ArrowRight", "Shift", "Control"]
        const unAllowable = ['e', 'E', '+', '-']
        const maxLength = e.target.value.length >= e.target.maxLength

        if (allowable.includes(e.key)) return true
        else if (unAllowable.includes(e.key) || maxLength) e.preventDefault()
    }

    // submits OTP and verifies user
    const handleSubmit = async (e) => {
        e.preventDefault()

        OTP = document.querySelector("#otp").value
        if (isValidOTP(OTP)) {
            return console.log("invalid OTP")
        }
        const {error, message} = await verifyUserEmail({
            OTP: OTP,
            userId: user.id
        })
        
        if (error) return console.log(error)
        console.log(message)
    }

    // if user does not exist, redirect to not found page
    useEffect(() => {
        if(!user) navigate("/not-found")
    }, [user])

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form onSubmit={handleSubmit} className="bg-secondary rounded p-5">
                    <div className="mb-4">
                        <h1 className="text-center text-xl font-semibold">
                            Enter OTP
                        </h1>
                        <p className="text-center">
                            Check your email for your OTP
                        </p>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                        <input 
                            id="otp"
                            type="number"
                            maxLength={MAX_LENGTH} 
                            onKeyDownCapture={blockInvalidChar}
                            className="w-120 h-12 border-2 rounded border-gray-700 bg-transparent outline-none text-center text-3xl" 
                        />
                    </div>

                    <Submit value="Submit" />
                </form>
            </div>
        </div>
    )
}