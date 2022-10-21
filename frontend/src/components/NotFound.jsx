import React from "react";
import Background from "./Background";
import Container from "./Container";


export default function NotFound() {
    return (
        <Background>
            <Container>
                <div className="flex justify-center items-center">
                    Page not found
                </div>
            </Container>
        </Background>
    )
}
