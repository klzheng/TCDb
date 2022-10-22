import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Background from "./Background";
import Container from "./Container";
import SearchBar from "./home/SearchBar";
import Navbar from "./Navbar";

export default function Search() {

    const { query } = useParams()
    const url = `https://api.themoviedb.org/3/search/multi?sort_by=popularity.desc&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&query=`
    const [searchResults, setSearchResults] = useState([])


    const getImgUrl = (path1, path2) => {
        if (path1) return `https://image.tmdb.org/t/p/w500/${path1}`
        else if (path2) return `https://image.tmdb.org/t/p/w500/${path2}`
        return 'default_profile.png'
    }

    useEffect(() => {
        const grabData = async (url) => {
            const response = await fetch(url)
            const data = await response.json()
            setSearchResults(data.results.filter(item => item.popularity > 10))
        }
        grabData(`${url+query}`)
    },[url, query])


    return (
        <Background>
            <Navbar />
            <Container>
                <SearchBar 
                    apiUrl={url} 
                    liveResults={false}
                    placeholder="Search for different results..."/>
                {searchResults.length !== 0 && searchResults.map((result, index) => (
                    <Link to={`/${result.media_type}/${result.id}`} key={index}>
                    <div 
                        key={index} 
                        className="flex font-karla justify-start rounded-lg bg-gray-700 p-2 my-8 hover:bg-slate-600 transition ">
                        <img
                            src={getImgUrl(result.profile_path, result.poster_path)}
                            alt="Poster"
                            className="max-w-32 min-w-32 h-52 object-cover rounded overflow-auto" />
                        <div className="flex flex-col w-full px-3 text-gray-300 ">
                            <p className="text-2xl font-bold text-gray-200 line-clamp-1">
                                {(result.title || result.name)}
                            </p>

                            {(result.vote_average !== 0 && result.vote_average) && 
                                <p className="text-lg text-yellow-100 pt-2">
                                    Rating: 
                                    <span className="bg-slate-900 bg-opacity-70 px-1 mx-1 rounded text-white">
                                        {result.vote_average}
                                    </span>
                                </p>}

                            {(result.release_date || result.first_air_date) && 
                                <p className="text-sm text-slate-400 py-1">
                                    Release Date: ({result.release_date || result.first_air_date})
                                </p>}

                            <p className="text-sm line-clamp-5 leading-snug">
                                {result.overview || result.known_for_department}
                            </p>
                        </div>
                    </div>
                </Link>
                ))}
            </Container>
        </Background>
    )
}