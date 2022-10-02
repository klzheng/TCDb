import React, { useState } from "react";
import { forgetPassword } from "../../api/auth";
import { useNotification } from "../../hooks";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();
  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    if (!isValidEmail.test(email))
      return updateNotification("error", "Invalid email!");
    
      const { error, message } = await forgetPassword(email);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };


  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className="bg-secondary rounded p-5 w-80">
          <h1 className="text-center text-xl font-semibold mb-5">
            Please Enter Your Email
          </h1>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <Submit value="Send Link" />

          <div className="flex justify-between mt-2">
            <CustomLink to="/auth/signin">Sign In</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
