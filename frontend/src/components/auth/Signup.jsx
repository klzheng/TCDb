import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import FormContainer from "./form/FormContainer";
import FormBackground from "./form/FormBackground";
import FormInput from "./form/FormInput";
import Submit from "./form/Submit";


const validateUserInfo = ({ name, email, password }) => {
    const isValidName = /^[a-z A-Z]+$/; 
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //eslint-disable-line

    if (!name.trim()) return { ok: false, error: "Name is missing!" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };
    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
        return { ok: false, error: "Password must be 8 characters long!" };
    return { ok: true };
};

export default function Signup() {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { handleLogin, authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const { updateNotification } = useNotification();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { ok, error } = validateUserInfo(userInfo);
        if (!ok) return updateNotification("error", error);

        const response = await createUser(userInfo);
        if (response.error) return console.log(response.error);

        handleLogin(userInfo.email, userInfo.password);
    };

    useEffect(() => {
        // redirect user to homepage
        if (isLoggedIn) navigate("/"); // eslint-disable-next-line
    }, [isLoggedIn]);

    const { name, email, password } = userInfo;

    return (
        <FormBackground>
            <FormContainer>
                <form onSubmit={handleSubmit} className="bg-secondary rounded p-5">
                    <h1 className="text-center text-3xl font-semibold mb-5">
                        Sign Up
                    </h1>
                    <FormInput
                        value={name}
                        onChange={handleChange}
                        label="Name"
                        placeholder="Name"
                        name="name"
                    />
                    <FormInput
                        value={email}
                        onChange={handleChange}
                        label="Email"
                        placeholder="johndoe@email.com"
                        name="email"
                    />
                    <FormInput
                        value={password}
                        onChange={handleChange}
                        label="Password"
                        placeholder="********"
                        name="password"
                        type="password"
                    />
                    <Submit value="Sign up" />

                    <div className="flex justify-between mt-2">
                        <Link to="/auth/forget-password">Forget Password</Link>
                        <Link to="/auth/signin">Sign In</Link>
                    </div>
                </form>
            </FormContainer>
        </FormBackground>
    );
}
