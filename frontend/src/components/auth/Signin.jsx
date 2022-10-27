import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import FormContainer from "./form/FormContainer";
import FormBackground from "./form/FormBackground";
import FormInput from "./form/FormInput";
import Submit from "./form/Submit";


const validateUserInfo = ({ email, password }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line

    if (!email.trim()) return { ok: false, error: "Email is missing!" }
    if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" }
    if (!password.trim()) return { ok: false, error: "Password is missing!" }
    if (password.length < 8)
        return { ok: false, error: "Password must be 8 characters long!" }
    return { ok: true }
};

export default function Signin() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()
    const { updateNotification } = useNotification()
    const { handleLogin, authInfo } = useAuth()
    const { isPending, isLoggedIn } = authInfo

    const handleChange = ({ target }) => {
        const { value, name } = target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { ok, error } = validateUserInfo(userInfo)
        if (!ok) return updateNotification("error", error)
        handleLogin(userInfo.email, userInfo.password)
    };

    useEffect(() => {
        // redirect user to homepage
        if (isLoggedIn) navigate("/") 
    }, [isLoggedIn, navigate])

    return (
        <FormBackground>
            <FormContainer>
                <form onSubmit={handleSubmit} className="bg-secondary rounded p-5">
                    <h1 className="text-center text-3xl font-semibold mb-5">
                        Sign in
                    </h1>
                    <FormInput
                        value={userInfo.email}
                        onChange={handleChange}
                        label="Email"
                        placeholder="name@email.com"
                        name="email"
                    />
                    <FormInput
                        value={userInfo.password}
                        onChange={handleChange}
                        label="Password"
                        placeholder="**********"
                        name="password"
                        type="password"
                    />
                    <Submit value="Sign in" busy={isPending} />

                    <div className="flex justify-between">
                        <Link to="/auth/forget-password" className="text-gray-700 hover:text-black transition">Forgot Password</Link>
                        <Link to="/auth/signup" className="text-gray-700 hover:text-black transition">Sign Up</Link>
                    </div>
                </form>
            </FormContainer>
        </FormBackground>
    );
}
