import { Link } from "react-router-dom"

export default function SearchResults({ data, display }) {
    
    // getting poster img
    const getImgUrl = (index) => {
        if (data[index].poster_path) return "https://image.tmdb.org/t/p/w185" + data[index].poster_path
        else if (data[index].backdrop_path) return "https://image.tmdb.org/t/p/w185" + data[index].backdrop_path
        else if (data[index].profile_path) return "https://image.tmdb.org/t/p/w185" + data[index].profile_path
        else return "/default.jpg"
    }

    if (data.length === 0 || display === false) return null
    return (
        <div
            className="absolute w-9/12 max-w-3xl flex flex-col right-14 left-0 top-10 z-10 bg-gray-400 p-2 max-h-128 space-y-2 overflow-auto mx-auto mt-1 text-left rounded-md text-gray-700 border-2 border-gray-500 shadow-blur tracking-tight">
            {data.slice(0, 20).map((result, index) => {
                return (
                    <Link to={`/${result.media_type}/${result.id}`} key={index}>
                        <div
                            key={index}
                            className="flex font-karla justify-start rounded bg-gray-300 p-2 hover:bg-slate-200 transition ">
                            <img
                                src={getImgUrl(index)}
                                alt="Poster"
                                className="max-w-24 min-w-24 h-36 object-cover rounded overflow-auto" />
                            <div className="flex flex-col w-full px-2 space-y-1 ">
                                <p className="text-xl font-bold line-clamp-1">
                                    {(result.title || result.name)}
                                </p>
                                <p className="text-md line-clamp-5  leading-tight">
                                    {result.overview || result.known_for_department}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}


