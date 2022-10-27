import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import SearchResults from "./SearchResults"


export default function SearchBar({ apiUrl, placeholder, liveSearch, setCurrentPage }) {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const navigate = useNavigate()

    // grabs API data and returns results
    const requestResultsData = useCallback(async (query) => {
        const res = await fetch(`${apiUrl + query}`)
        const data = await res.json()
        return data.results
    },[apiUrl])  

    // sets search query state to input field
    const handleChange = (e) => {
        if (e.target.value === "") setSearchResult([])
        setSearch(e.target.value)
    }

    // clears search results on blur
    const clearAll = () => {
        setSearch("")
        setSearchResult([])
    }

    // redirects to search page with results
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${search}`)
        if (setCurrentPage) setCurrentPage(1)
    }

    // grabs data and stores it if query is valid
    useEffect(() => {
        if (!search) return;
        requestResultsData(search)
            .then(setSearchResult)
    }, [search, requestResultsData])


    return (

        <div 
            className="relative text-center xs:my-10 2xs:my-6 mx-auto flex justify-center ">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                <input
                    id="main-search"
                    type="text"
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={() => setTimeout(clearAll, 100)}
                    value={search}
                    className="w-full max-w-3xl h-10 rounded-full border-none px-4 text-xl focus:bg-gray-300 focus:text-gray-600 outline-none bg-gray-600 peer transition-all " />
            </form>
            <button
                type="submit"
                onClick={search.length === 0 ? null : clearAll}
                className=" mx-2 rounded-full border-none min-w-10 min-h-10 bg-gray-600 text-gray-300 peer-focus:bg-gray-300 peer-focus:text-gray-600 transition-all 2xs:hidden sm:inline-block">
                {search.length === 0
                    ? <i className="fa-solid fa-magnifying-glass transition-all min-w-8  "></i>
                    : <i className="fa-solid fa-x transition-all duration-1000 min-w-8 "></i>
                }
            </button>
            <SearchResults 
                data={searchResult}
                display={liveSearch} />
        </div>

    )
}

