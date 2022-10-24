import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import MoviePage from "./components/film/MoviePage";
import ActorPage from "./components/actor/ActorPage";
import NotFound from "./components/NotFound";
import Search from "./components/search/Search";
import UserFilm from "./components/user/UserFilm";
import { MovieProvider } from "./context/MovieContext";


export default function App() {
  return (
    <>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ConfirmPassword />} />
          <Route path="/:mediaType/:id" element={<MoviePage />}/>
          <Route path="/person/:id" element={<ActorPage />}/>
          <Route path="/search/:query" element={<Search />} />
          <Route path="/my-films" element={<UserFilm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MovieProvider>
    </>
  );
}
