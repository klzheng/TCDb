import React from "react"
import ReactPlayer from "react-player"
import { AiFillStar } from "react-icons/ai"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"


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
                setReleaseDate(moment(data.release_date).format('MMMM Do YYYY'))
                setGenres(data.genres.map(item => item.name))
            })

        grabData(`https://api.themoviedb.org/3/${res.mediaType}/${res.id}/credits?api_key=5b7ff1ca08f2367f1d77090c6730231d`)
            .then(data => {
                setCredits(data)
                console.log(data.crew.filter(item => item.known_for_department === "Writing").map(item => item.name).join(" "))
                setDirector(data.crew.filter(item => item.known_for_department === "Directing")[0].name)
                setWriters(data.crew.filter(item => item.known_for_department === "Writing").map(item => item.name))
                setCast(data.cast)
            })

    }, [res.id, res.mediaType])







    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">
            <div className="mx-32 my-28 text-gray-400 flex-auto ">

                <div className="player-wrapper border-2 border-gray-500 ">
                    <ReactPlayer url={`youtube.com/watch?v=${trailerKey}`} controls={true} pip={true} width="100%" height="100%" className="react-player" />
                </div>
                <div className="flex-col space-y-4">
                    <p className="text-4xl font-semibold my-8 text-white flex justify-between">
                        {pageDetails.title || pageDetails.name}
                        <span className=" border-2 border-white rounded pl-2 flex items-center">
                            {pageDetails.vote_average && pageDetails.vote_average.toFixed(1)}
                            <AiFillStar className="" />
                        </span>
                    </p>
                    <p>{pageDetails.overview}</p>
                    <p className="text-xl ">
                        Cast
                    </p>
                    <p className="flex space-x-4 overflow-auto">
                        {cast.map((person) => (
                            <div className="text-center">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                    alt="Cast Member"
                                    className="max-w-xs h-60 object-cover rounded" />
                                <p className="font-bold text-gray-200">
                                    {person.character}
                                </p>
                                <p className="text-base">
                                    {person.name}
                                </p>
                            </div>
                        ))}
                    </p>

                    <div><p className="drop-shadow-white-text text-gray-200">Director:</p> <span className="mx-3">{director}</span></div>
                    <div><p className="drop-shadow-white-text text-gray-200">Writers:</p> 
                        {writers.map((writer) => (
                            <span className="px-3">{writer}</span>
                        ))}
                    </div>
                    <div><p className="drop-shadow-white-text text-gray-200">Release Date:</p> <span className="px-3">{releaseDate}</span></div>
                    <div><p className="drop-shadow-white-text text-gray-200">Genres:</p> 
                        {genres && genres.map((genre) => (
                            <span className="px-3">{genre}</span>
                        ))}
                    </div>
                    <div><p className="drop-shadow-white-text text-gray-200">Languages:</p> <span className="px-3">{languages}</span></div>
                </div>


            </div>
        </div>
    )
}