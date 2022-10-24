import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";
import { useAuth } from "../../hooks";
import MovieContent from "./MovieContent";
import SearchBar from "../search/SearchBar";
import SectionContent from "./SectionContent";
import SectionHeader from "./SectionHeader";
import Slider from "./Slider";
import Welcome from "./Welcome";
import Background from "../Background";
import Container from "../Container";
import Navbar from "../Navbar";


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
        fetchDetails() // eslint-disable-next-line
    }, [])


    // redirect user to sign in page if no user already signed in
    useEffect(() => {
        if (!isLoggedIn) navigate("/auth/signin") // eslint-disable-next-line
    }, [isLoggedIn])

    return (

        <Background>
            <Navbar />
            <Container>

                <Welcome user={profile.name} />
                <SearchBar
                    apiUrl={searchUrl}
                    placeholder="Search for something specific..." 
                    liveSearch={true}/>

                <SectionContent>
                    <SectionHeader value="See what's popular this week" />
                    <Slider />
                    <MovieContent url={url} />
                </SectionContent>

                <SectionContent>
                    <SectionHeader value="In Theaters" />
                    <MovieContent url={movies} />
                </SectionContent>

            </Container>
        </Background>
    )
}
