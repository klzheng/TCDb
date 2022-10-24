import React from "react"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Trailer from "./Trailer"
import PosterBackground from "./PosterBackground"
import Header from "./Header"
import Overview from "./Overview"
import Cast from "./Cast"
import Other from "./Other"
import MovieContext from "../../context/MovieContext"
import { useContext } from "react"
import Background from "../Background"
import Container from "../Container"
import Navbar from "../Navbar"


export default function MoviePage() {
    const [pageDetails, setPageDetails] = useState([])
    const [trailerKey, setTrailerKey] = useState("")
    const [cast, setCast] = useState([])
    const [writers, setWriters] = useState([])
    const [director, setDirector] = useState([])
    const [languages, setLanguages] = useState([])
    const [releaseDate, setReleaseDate] = useState([])
    const [genres, setGenres] = useState([])


    // grabbing params
    const res = useParams()

    // async/await fn, returns data from api url
    const {grabData} = useContext(MovieContext)

    // urls
    const apiVideo = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos`
    const apiDetails = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    const apiCrew = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`


    useEffect(() => {
        // getting video key
        grabData(apiVideo)
            .then(data => {
                setTrailerKey(data.results
                    .filter((item) => item.type === "Trailer")[0].key)
            })

        // getting movie details
        grabData(apiDetails)
            .then(data => {
                
                setPageDetails(data)

                setLanguages(data.spoken_languages
                    .map(item => item.english_name))

                setGenres(data.genres
                    .map(item => item.name)
                    .join(" • "))

                setReleaseDate((data.release_date || data.first_air_date))
            })

        // getting movie crew details
        grabData(apiCrew)
            .then(data => {
                setCast(data.cast.slice(0, 11))

                setDirector(data.crew
                    .filter(item => item.known_for_department === "Directing" || item.department === "Directing")[0].name)

                setWriters(data.crew
                    .filter(item => item.department === "Writing").map(item => item.name))
            })
    }, [apiCrew, apiDetails, apiVideo, grabData])



    return (
        <Background>
            <Navbar />
            <PosterBackground imgPath={pageDetails.backdrop_path} />
            <Container>
                <Trailer trailerKey={trailerKey} />
                <div className={" flex-col space-y-12 mt-20 "}>
                    <Header
                        details={pageDetails}
                        releaseDate={releaseDate}
                        genres={genres} />

                    <Overview
                        details={pageDetails} />

                    <Cast
                        cast={cast} title="Cast" people={true}/>

                    <Other
                        director={director}
                        writers={writers}
                        releaseDate={moment(releaseDate).format("L")}
                        languages={languages} />
                </div>

            </Container>
        </Background>
    )
}