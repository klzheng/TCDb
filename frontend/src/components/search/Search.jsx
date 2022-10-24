import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Background from "../Background";
import Container from "../Container";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar";

export default function Search() {

    const myRef = useRef(null)
    const { query } = useParams()
    const [searchResults, setSearchResults] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const url = `https://api.themoviedb.org/3/search/multi?sort_by=popularity.desc&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${currentPage}&query=`


    const getImgUrl = (path1, path2) => {
        if (path1) return `https://image.tmdb.org/t/p/w500/${path1}`
        else if (path2) return `https://image.tmdb.org/t/p/w500/${path2}`
        return 'default_profile.png'
    }


    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1)
            myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const firstPage = () => {
        setCurrentPage(1)
        myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1)
            myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const lastPage = () => {
        setCurrentPage(totalPages)
        myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }


    useEffect(() => {
        const grabData = async (url) => {
            const response = await fetch(url)
            const data = await response.json()
            setTotalPages(data.total_pages)
            setSearchResults(data.results)
        }
        grabData(`${url + query}`)
    }, [url, query])


    useEffect(() => {
        document.title = `Search results for '${query}' • (Page ${currentPage})`;
    }, [url, query, currentPage]);


    return (
        <Background>
            <div ref={myRef}></div>
            <Navbar />
            <Container>
                {/* SEARCH BAR */}
                <SearchBar
                    apiUrl={url}
                    liveSearch={false}
                    placeholder="Search for different results..."
                    setCurrentPage={setCurrentPage} />

                {/* RESULTS */}
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

                                <p className="text-md line-clamp-5 leading-snug">
                                    {result.overview || result.known_for_department}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* PAGINATION */}
                <div className="flex justify-center items-center space-x-3 text-lg">
                    <i
                        onClick={firstPage}
                        className="ti ti-angle-double-left drop-shadow-white-text font-bold hover:text-gray-200 transition">
                    </i>
                    <i
                        onClick={prevPage}
                        className="ti ti-angle-left drop-shadow-white-text font-bold hover:text-gray-200 transition">
                    </i>
                    <p className="px-2 text-2xl font-bold text-gray-200">
                        {currentPage}
                    </p>
                    <i
                        onClick={nextPage}
                        className="ti ti-angle-right drop-shadow-white-text font-bold hover:text-gray-200 transition">
                    </i>
                    <i
                        onClick={lastPage}
                        className="ti ti-angle-double-right drop-shadow-white-text font-bold hover:text-gray-200 transition">
                    </i>
                </div>

            </Container>
        </Background>
    )
}