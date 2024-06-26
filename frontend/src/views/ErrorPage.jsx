import React from "react";
import { Link } from "react-router-dom";
import Background from "../components/Shared/Layout/Background";
import Container from "../components/Shared/Layout/Container";


export default function ErrorPage() {
    return (
        <Background>
            <Container>
                <div className="flex flex-col justify-center items-center ">
                    <p className="text-5xl py-10">Page not found</p>
                    <p className="text-xl">Please go to the homepage&nbsp;  
                        <Link to="/" className="underline text-gray-200">here</Link>
                    </p>
                </div>
            </Container>
        </Background>
    )
}
