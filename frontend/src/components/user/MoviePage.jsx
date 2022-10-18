import React from "react"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Trailer from "./film/Trailer"
import PosterBackground from "./film/PosterBackground"
import Header from "./film/Header"
import Overview from "./film/Overview"
import Cast from "./film/Cast"
import Other from "./film/Other"
import MovieContext from "../../context/MovieContext"
import { useContext } from "react"


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
    const apiVideo = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}/videos?api_key=5b7ff1ca08f2367f1d77090c6730231d`
    const apiDetails = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}?api_key=5b7ff1ca08f2367f1d77090c6730231d`
    const apiCrew = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}/credits?api_key=5b7ff1ca08f2367f1d77090c6730231d`


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

                setReleaseDate(moment(data.release_date || data.first_air_date).format('L'))
            })

        // getting movie crew details
        grabData(apiCrew)
            .then(data => {
                console.log(data.cast)
                setCast(data.cast.slice(0, 11))

                setDirector(data.crew
                    .filter(item => item.known_for_department === "Directing" || item.department === "Directing")[0].name)

                setWriters(data.crew
                    .filter(item => item.department === "Writing").map(item => item.name))
            })
    }, [apiCrew, apiDetails, apiVideo, grabData])



    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">

            <PosterBackground imgPath={pageDetails.backdrop_path} />
            <div className="mx-32 my-28 text-gray-400 flex-auto ">

                <Trailer trailerKey={trailerKey} />
                <div className={" flex-col space-y-12 " + (
                    pageDetails.backdrop_path ? " mt-40 " : " mt-20 ")}>
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
                        releaseDate={releaseDate}
                        languages={languages} />
                </div>
            </div>
        </div>
    )
}