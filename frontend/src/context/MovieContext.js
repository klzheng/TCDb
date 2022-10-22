import { createContext, useState } from "react";

export const MovieContext = createContext()

export function MovieProvider(props) {
    const [url, setUrl] = useState([])

    // sets url state to the fetch results
    const changeContent = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setUrl(data.results)
    }

    // async/await fn, returns data from api url
    const grabData = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

return (
    <MovieContext.Provider value={{ url, setUrl, changeContent, grabData }}>
        {props.children}
    </MovieContext.Provider>
)
}

export default MovieContext