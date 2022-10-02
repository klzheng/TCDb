import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../hooks";


export default function Home() {

  const navigate = useNavigate()
  const { authInfo } = useAuth()
  const { isLoggedIn } = authInfo

  // redirect user to sign in page if no user already signed in
  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/signin")
  }, [isLoggedIn])

  return (
    <div></div>
  )
}
