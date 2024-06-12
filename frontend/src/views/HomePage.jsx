import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import { useAuth } from "../hooks";
import CardListRow from "../components/Home/CardListRow";
import SearchBar from "../components/Shared/Search/SearchBar";
import Slider from "../components/Home/ToggleMenu";
import Welcome from "../components/Home/Hero";
import Background from "../components/Shared/Layout/Background";
import Container from "../components/Shared/Layout/Container";
import Navbar from "../components/Shared/Layout/Navbar";

export default function Home() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const { url, setUrl } = useContext(MovieContext)
    const { authInfo } = useAuth()
    const { isLoggedIn, profile } = authInfo

    // api urls
    const trendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&vote_count.gte=50&language=en-US&page=1`
    const theatersUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&vote_count.gte=50&language=en-US&page=1`
    const searchUrl = `https://api.themoviedb.org/3/search/multi?&api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&language=en-US&page=1&query=`

    // default movie results
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const trendingRes = await fetch(trendingUrl)
                const trendingData = await trendingRes.json()
                setUrl(trendingData.results)

                const theatersRes = await fetch(theatersUrl)
                const theatersData = await theatersRes.json()
                setMovies(theatersData.results)

            } catch (err) {
                console.log(err)
            }
        }
        fetchDetails() 
    }, [setUrl, theatersUrl, trendingUrl])


    // redirect user to sign in page if no user already signed in
    useEffect(() => {
        if (!isLoggedIn) navigate("/auth/signin") // eslint-disable-next-line
    }, [isLoggedIn])

    // browser tab titling
    useEffect(() => {
        document.title = `TCDb`;
    }, []);

    return (
        <Background>
            <Navbar />
            <Container>
                <Welcome user={profile.name} />
                <SearchBar
                    apiUrl={searchUrl}
                    placeholder="Search for something specific..." 
                    liveSearch={true}/>

                <div className="xs:mt-20 2xs:mt-10 2xs:mb-10">
                    <h1 className=" font-semibold my-5 2xs:text-xl xs:text-2xl sm:text-3xl 2xs:text-center sm:text-left">
                        See What's popular this week
                    </h1>
                    <Slider />
                    <CardListRow url={url} />
                </div>
                
                <div className="xs:mt-20 2xs:mt-10 2xs:mb-10">
                    <h1 className=" font-semibold my-5 2xs:text-xl xs:text-2xl sm:text-3xl 2xs:text-center sm:text-left">
                        In Theaters
                    </h1>
                    <CardListRow url={movies} />
                </div>
            </Container>
        </Background>
    )
}
