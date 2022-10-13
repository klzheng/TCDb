import { useContext, useState } from "react"
import MovieContext from "../../context/MovieContext"


export default function Slider() {
    // url variables
    const urlHeader = "https://api.themoviedb.org/3/"
    const urlParams = "?api_key=5b7ff1ca08f2367f1d77090c6730231d&language=en-US&page=1"

    const [isActive, setActive] = useState([true, false, false])
    const { changeContent } = useContext(MovieContext)

    // Changes slider content and styling on click
    const handleToggle = (e) => {
        switch (e.target.id) {
            case "all":
                changeContent(urlHeader + "trending/all/week" + urlParams)
                setActive([true, false, false])
                break
            case "movies":
                changeContent(urlHeader + "movie/popular" + urlParams)
                setActive([false, true, false])
                break
            case "shows":
                changeContent(urlHeader + "tv/popular" + urlParams)
                setActive([false, false, true])
        }
    }


    return (
        <>
            <div className="flex flex-row justify-evenly gap-1 w-72 border-2 border-solid border-teal rounded-full text-white mb-5">
                <button
                    onClick={handleToggle}
                    id="all"
                    className={(isActive[0] ? "bg-teal shadow-teal ease-in-out  duration-300 " : " ") + "w-1/3 py-1 rounded-full outline-none"}>All</button>
                <button
                    onClick={handleToggle}
                    id="movies"
                    className={(isActive[1] ? "bg-teal shadow-teal ease-in-out duration-300 " : " ") + "w-1/3 py-1 rounded-full outline-none"}>Movies</button>
                <button
                    onClick={handleToggle}
                    id="shows"
                    className={(isActive[2] ? "bg-teal shadow-teal ease-in-out duration-300 " : " ") + "w-1/3 py-1 rounded-full outline-none"}>Shows</button>
            </div>
        </>
    )
}
