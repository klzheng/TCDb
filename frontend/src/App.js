import React from "react"
import {Route, Routes} from "react-router-dom"
import Navbar from "./components/user/Navbar"
import SignIn from "./components/auth/Signin"
import SignUp from "./components/auth/Signup"
import Home from "./components/Home"
import EmailVerification from "./components/auth/EmailVerification"
import ForgotPassword from "./components/auth/ForgotPassword"
import ConfirmNewPass from "./components/auth/ConfirmNewPass"
// import { isCompositeComponent } from "react-dom/test-utils"


export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/verification" element={<EmailVerification />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/confirm-password" element={<ConfirmNewPass />} />
                <Route path="/auth/signup" element={<SignUp />} />
            </Routes>
        </>

    )

}