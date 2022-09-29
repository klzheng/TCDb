import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import { createUser } from "../../api/auth"
import FormInput from "../form/FormInput"
import Submit from "../form/Submit"


// validate form inputs
const validateUserInfo = ({name, email, password}) => {
    const nameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    // validating name input
    if (!name.trim()) return {ok: false, error: "Please enter your name"}
    if (!nameRegex.test(name)) return {ok: false, error: "Invalid name"}

    // validating email input
    if (!email.trim()) return {ok: false, error: "Please enter your email"}
    if (!emailRegex.test(email)) return {ok: false, error: "Invalid email"} 

    // validating password input
    if (!password.trim()) return {ok: false, error: "Please enter a password"}
    if (password.length < 8) return {ok: false, error: "Please must be at least 8 characters long"}
    return {ok: true}
}


export default function SignUp(){
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleChange = ({target}) => {
        const {value, name} = target
        setUserInfo({...userInfo, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {ok, error} = validateUserInfo(userInfo)

        if (!ok) return console.log(error)

        const response = await createUser(userInfo)
        if (response.error) return console.log(response.error)

        navigate("/auth/verification", {
            state: {user: response.user},
            replace: true // makes it so that the user cannot go back to previous page after verification
        })
        console.log(response.user)
    }

    const {name, email, password} = userInfo

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 flex justify-center items-center">
            <div className="max-w-screen-xl mx-auto ">
                <form onSubmit={handleSubmit} className="bg-secondary rounded p-5">
                    <h1 className="text-center text-3xl font-semibold mb-5">
                        Sign Up
                    </h1>
                    <FormInput 
                        onChange={handleChange}
                        value={name}
                        name="name" 
                        label="Name" 
                        placeholder="Kevin Zheng" 
                    />
                    <FormInput 
                        onChange={handleChange}
                        value={email}
                        name="email" 
                        label="Email" 
                        placeholder="klzheng@buffalo.edu" 
                    />
                    <FormInput
                        onChange={handleChange}
                        value={password} 
                        type="password"
                        name="password" 
                        label="Password" 
                        placeholder="**************" 
                    />
                    <Submit value="Sign Up"/>
                    
                    <div className="flex justify-between mt-2">
                        <Link 
                            className="text-gray-700 hover:text-black transition " 
                            to="/auth/forgot-password">Forgot Password</Link>
                        <Link 
                            className="text-gray-700 hover:text-black transition" 
                            to="/auth/signin">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}