import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Home from "./views/HomePage";
import Signin from "./components/Authentication/Signin";
import Signup from "./components/Authentication/Signup";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import ConfirmPassword from "./components/Authentication/ConfirmPassword";
import FilmPage from "./views/FilmPage";
import ActorPage from "./views/ActorPage";
import ErrorPage from "./views/ErrorPage";
import SearchPage from "./views/SearchPage";
import ReviewPage from "./views/ReviewPage";
import WatchlistPage from "./views/WatchlistPage";


export default function App() {
    const location = useLocation()

    return (
        <MovieProvider>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/auth/signin" element={<Signin />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/forget-password" element={<ForgetPassword />} />
                <Route path="/auth/reset-password" element={<ConfirmPassword />} />
                <Route path="/:mediaType/:id" element={<FilmPage />} />
                <Route path="/person/:id" element={<ActorPage />} />
                <Route path="/search/:query" element={<SearchPage />} />
                <Route path="/my-films" element={<ReviewPage />} />
                <Route path="/my-watchlist" element={<WatchlistPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </MovieProvider>
    );
}
