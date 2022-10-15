import React from "react"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Trailer from "./details/Trailer"
import PosterBackground from "./details/PosterBackground"
import Header from "./details/Header"
import Overview from "./details/Overview"
import Cast from "./details/Cast"
import Other from "./details/Other"


export default function MoviePage() {
    const [pageDetails, setPageDetails] = useState([])
    const [trailerKey, setTrailerKey] = useState("")
    const [cast, setCast] = useState([])
    const [writers, setWriters] = useState([])
    const [director, setDirector] = useState([])
    const [languages, setLanguages] = useState([])
    const [releaseDate, setReleaseDate] = useState([])
    const [genres, setGenres] = useState([])


    const res = useParams()

    // urls
    const apiVideo = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}/videos?api_key=5b7ff1ca08f2367f1d77090c6730231d`
    const apiDetails = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}?api_key=5b7ff1ca08f2367f1d77090c6730231d`
    const apiCrew = `https://api.themoviedb.org/3/${res.mediaType}/${res.id}/credits?api_key=5b7ff1ca08f2367f1d77090c6730231d`
    

    // async/await fn, returns data from api url
    const grabData = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }


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

                setCast(data.cast)

                setDirector(data.crew
                    .filter(item => item.known_for_department === "Directing")[0].name)

                setWriters(data.crew
                    .filter(item => item.known_for_department === "Writing").map(item => item.name))
            })
    }, [apiCrew, apiDetails, apiVideo])



    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">                   

            <PosterBackground imgPath={pageDetails.backdrop_path}/>
            <div className="mx-32 my-28 text-gray-400 flex-auto ">

                <Trailer trailerKey={trailerKey}/>
                <div className="flex-col space-y-12 mt-40">

                    <Header 
                        details={pageDetails} 
                        releaseDate={releaseDate} 
                        genres={genres} />

                    <Overview 
                        details={pageDetails}/>

                    <Cast 
                        cast={cast}/>

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