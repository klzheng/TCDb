import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import FormContainer from "./form/FormContainer";
import FormBackground from "./form/FormBackground";
import FormInput from "./form/FormInput";
import Submit from "./form/Submit";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";


export default function ConfirmPassword() {
    const [password, setPassword] = useState({
        one: "",
        two: "",
    });
    const [isVerifying, setIsVerifying] = useState(false);
    const [isValid, setIsValid] = useState(false);
    // using useSearchParams hook to grab token and id from url
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    const { updateNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        isValidToken();
    },);

    const isValidToken = async () => {
        const { error, valid } = await verifyPasswordResetToken(token, id);
        setIsVerifying(false);
        if (error) {
            // if token is wrong, redirect to reset password page and show notification
            navigate("/auth/reset-password", { replace: true });
            return updateNotification("error", error);
        }
        if (!valid) {
            setIsValid(false);
            return navigate("/auth/reset-password", { replace: true });
        }
        setIsValid(true);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setPassword({ ...password, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password.one.trim())
            return updateNotification("error", "Password is missing");
        if (password.one.trim().length < 8)
            return updateNotification("error", "Password must be 8 characters long");
        if (password.one !== password.two)
            return updateNotification("error", "Passwords do not match");
        const { error, message } = await resetPassword({
            newPassword: password.one,
            userId: id,
            token,
        });
        if (error) return updateNotification("error", error);

        updateNotification("success", message);
        navigate("/auth/signin", { replace: true });
    };

    // Waiting screen while verifying token
    if (isVerifying)
        return (
            <FormBackground>
                <FormContainer>
                    <div className="flex space-x-2 items-center">
                        <h1 className="text-4xl font-semibold dark:text-white text-primary">
                            Verifying token...
                        </h1>
                        <ImSpinner2 className="scale-in-center text-4xl dark:text-white text-primary" />
                    </div>
                </FormContainer>
            </FormBackground>
        );

    // If token is not valid show msg and redirect to sign-in
    if (!isValid) {
        setTimeout(() => navigate("/auth/signin", { replace: true }), 10000)
        return (
            <FormBackground>
                <FormContainer>
                    <h1 className="text-4xl font-semibold dark:text-white text-primary text-center py-4">
                        Token is invalid
                    </h1>
                    <p className="text-2xl font-semibold text-white text-center">Redirecting in 10 seconds...</p>
                </FormContainer>
            </FormBackground>
        );
    }

    // Set new password page
    return (
        <FormBackground>
            <FormContainer>
                <form onSubmit={handleSubmit} className="bg-secondary rounded p-5 w-96">
                    <h1 className="text-center text-xl font-semibold mb-5">
                        Enter New Password
                    </h1>
                    <FormInput
                        value={password.one}
                        onChange={handleChange}
                        label="New Password"
                        placeholder="********"
                        name="one"
                        type="password"
                    />
                    <FormInput
                        value={password.two}
                        onChange={handleChange}
                        label="Confirm Password"
                        placeholder="********"
                        name="two"
                        type="password"
                    />
                    <Submit value="Confirm Password" />
                </form>
            </FormContainer>
        </FormBackground>
    );
}
