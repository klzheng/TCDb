import { createContext, useState } from "react";

export const MovieContext = createContext()

export function MovieProvider(props) {
    const [url, setUrl] = useState([])
    
    const changeContent = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.results)
            })
    }

    return (
        <MovieContext.Provider value={{url, setUrl, changeContent}}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieContext