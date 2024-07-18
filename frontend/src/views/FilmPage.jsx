import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player";
import moment from "moment"
import Header from "../components/Film/Header";
import Summary from "../components/Film/Summary"
import Cast from "../components/Film/Cast"
import MovieContext from "../context/MovieContext"
import Background from "../components/Shared/Layout/Background"
import Container from "../components/Shared/Layout/Container"
import Navbar from "../components/Shared/Layout/Navbar"
import Info from "../components/Film/Info"



export default function FilmPage() {
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
        document.title = `${pageDetails.title || pageDetails.name} • TCDb`;
    }, [pageDetails]);


    useEffect(() => {
        // getting video key
        grabData(apiVideo)
            .then(data => {
                setTrailerKey(data.results
                    ?.filter((item) => item.type === "Trailer")[0].key)
            })

        // getting movie details
        grabData(apiDetails)
            .then(data => {
                setPageDetails(data)
                setLanguages(data.spoken_languages.map(item => item.english_name))
                setGenres(data.genres.map(item => item.name).join(" • "))
                setReleaseDate((data.release_date || data.first_air_date))
            })

        // getting movie crew details
        grabData(apiCrew)
            .then(data => {
                if (data.cast.length !== 0) {
                    setCast(data.cast.slice(0, 11))
                }

                if (data.crew.length !== 0) {
                    setDirector(data.crew?.filter(item => item.known_for_department === "Directing" || item.department === "Directing")[0].name)
                    setWriters(data.crew?.filter(item => item.department === "Writing").map(item => item.name))
                }
            })
    }, [apiCrew, apiDetails, apiVideo, grabData])


    return (
        <Background>
            <Navbar />
            <Container>
                <div className="flex-col space-y-12">
                    <ReactPlayer
                        url={`youtube.com/watch?v=${trailerKey}`}
                        controls={true}
                        volume={0.05}
                        width="100%"
                        height="56.25%"
                        style={{
                            "maxWidth": "56rem",
                            "aspectRatio": "16/9",
                        }}
                    />
                    
                    <Header
                        details={pageDetails}
                        releaseDate={releaseDate}
                        genres={genres}
                    />

                    <Summary details={pageDetails} />

                    <Cast cast={cast} title="Cast" people={true} />

                    <Info
                        director={director}
                        writers={writers}
                        releaseDate={moment(releaseDate).format("L")}
                        languages={languages}
                    />
                </div>
            </Container>
        </Background>
    );
}