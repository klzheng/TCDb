import React from "react"

import { FaHeart } from "react-icons/fa"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Trailer from "./details/Trailer"


export default function MoviePage() {

    const [pageDetails, setPageDetails] = useState([])
    const [trailerKey, setTrailerKey] = useState("")
    const [credits, setCredits] = useState([])

    const [writers, setWriters] = useState([])
    const [director, setDirector] = useState([])
    const [cast, setCast] = useState([])
    const [languages, setLanguages] = useState([])
    const [releaseDate, setReleaseDate] = useState([])
    const [genres, setGenres] = useState([])

    const res = useParams()
    // console.log(res)



    const grabData = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }


    useEffect(() => {

        grabData(`https://api.themoviedb.org/3/${res.mediaType}/${res.id}/videos?api_key=5b7ff1ca08f2367f1d77090c6730231d`)
            .then(data => setTrailerKey(data.results.filter((item) => item.type === "Trailer")[0].key))

        grabData(`https://api.themoviedb.org/3/${res.mediaType}/${res.id}?api_key=5b7ff1ca08f2367f1d77090c6730231d`)
            .then(data => {
                setPageDetails(data)
                setLanguages(data.spoken_languages.map(item => item.english_name))
                setReleaseDate(moment(data.release_date || data.first_air_date).format('L'))
                console.log((data.backdrop_path))
                setGenres(data.genres.map(item => item.name).join(" • "))
            })

        grabData(`https://api.themoviedb.org/3/${res.mediaType}/${res.id}/credits?api_key=5b7ff1ca08f2367f1d77090c6730231d`)
            .then(data => {
                setCredits(data)
                setDirector(data.crew.filter(item => item.known_for_department === "Directing")[0].name)
                setWriters(data.crew.filter(item => item.known_for_department === "Writing").map(item => item.name))
                setCast(data.cast)
            })

    }, [res.id, res.mediaType])




    // https://image.tmdb.org/t/p/w500


    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">                   
            <img src={`https://image.tmdb.org/t/p/original${pageDetails.backdrop_path}`} className="backdrop-image my-16 min-w-full"/>
            <div className="mx-32 my-28 text-gray-400 flex-auto ">
                <Trailer trailerKey={trailerKey}/>

                

                <div className="flex-col space-y-12 mt-28">
                    <div>
                        <p className="text-4xl font-semibold text-white">
                            {(pageDetails.title || pageDetails.name)}
                            <span className="font-light text-gray-400"> {`(${releaseDate.slice(-4)})`}</span>
                        </p>

                        <div className="flex justify-between">
                            <span>
                                {genres}
                            </span>
                            <span className="flex flex-col items-center text-xl">


                            </span>
                        </div>
                        <span className="flex flex-row items-center text-2xl my-4 justify-between">
                            <span>
                                <span className="border-2 rounded px-1 mr-2 ">
                                    {pageDetails.vote_average && pageDetails.vote_average.toFixed(1)}
                                </span>
                                <span>
                                TMDb Rating
                                </span>
                            </span>

                            <span className="flex flex-row items-center">
                                Rate <FaHeart className="ml-1" />
                            </span>
                        </span>
                    </div>


                    <div>
                        <p className="drop-shadow-white-text text-gray-200 text-2xl">Overview</p>
                        <p>{pageDetails.overview}</p>
                    </div>

                    <div>
                        <p className="text-2xl text-gray-200 drop-shadow-white-text">
                            Cast
                        </p>
                        <p className="flex space-x-4 overflow-auto">
                            {cast.map((person) => (
                                <div className="text-center mt-1 mb-4">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                        alt="Cast Member"
                                        className="max-w-xs h-60 object-cover rounded" />
                                    <p className="font-bold text-gray-200 line-clamp-1 text-lg">
                                        {person.character}
                                    </p>
                                    <p className="line-clamp-1">
                                        {person.name}
                                    </p>
                                </div>
                            ))}
                        </p>
                    </div>


                    <div>
                        <p className="drop-shadow-white-text text-gray-200 text-2xl">Director</p>
                        <span className="text-lg">{director}</span>
                    </div>

                    <div>
                        <p className="drop-shadow-white-text text-gray-200 text-2xl">Writers</p>
                        <div className="flex-col space-x-5 text-lg">
                            {writers.map((writer) => (
                                <span className="">{writer}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="drop-shadow-white-text text-gray-200 text-2xl">Release Date</p>
                        <span className="text-lg">{releaseDate}</span>
                    </div>

                    <div>
                        <p className="drop-shadow-white-text text-gray-200 text-2xl">Languages</p>
                        <div className="flex-col space-x-5">
                            {languages.map((language) => (
                                <span className="text-lg">{language}</span>
                            ))}
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}