import React from "react"
// import {Link} from "react-router-dom"
// import FormInput from "../form/FormInput"
import Submit from "../form/Submit"

const MAX_LENGTH = 6

export default function EmailVerification() {
    const OTP = new Array(1).fill("")
    
    // prevents any invalid OTP input
    const blockInvalidChar = (e) => {
        ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
        e.target.value.length >= e.target.maxLength && e.preventDefault()
            // const newDigit = e.key
            // e.target.value = e.target.value.substring(1,5) + newDigit
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form action="" className="bg-secondary rounded p-5">
                    <div className="mb-4">
                        <h1 className="text-center text-xl font-semibold">
                            Enter OTP
                        </h1>
                        <p className="text-center">
                            Check your email for your OTP
                        </p>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                        {OTP.map((digit, index) => {
                            return (
                                <input 
                                    key={index}
                                    type="number"
                                    maxLength={MAX_LENGTH} 
                                    onKeyPress={blockInvalidChar}
                                    className="w-120 h-12 border-2 rounded border-gray-700 bg-transparent outline-none text-center text-3xl" />
                            )
                        })}
                    </div>

                    <Submit value="Send Link" />
                </form>
            </div>
        </div>
    )
}