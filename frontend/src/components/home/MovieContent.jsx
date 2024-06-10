import { Link } from "react-router-dom"
import Card from "./Card"

export default function MovieContent(props) {
    return (
        <div className="flex overflow-auto scrollbar-default bg-black bg-opacity-30 rounded-lg px-4 ">
            {props && props.url.map((movie, index) => (
                <div key={index} className="w-40 mt-8 mb-3 mx-3 group relative">
                <Link to={`/${movie.media_type || (movie.first_air_date ? "tv" : "movie")}/${movie.id}`}>
                    <Card
                        id={movie.id}
                        title={movie.name || movie.title}
                        imageUrl={"https://image.tmdb.org/t/p/w780" + (movie.poster_path || movie.backdrop_path)}
                        overview={movie.overview}
                        rating={movie.vote_average}
                        displayOptions={{
                            "showDescriptionOnHover": true,
                            "showRatingInside": true,
                        }}
                    />
                    <p className="movie-content-title text-gray-300 truncate">{movie.name || movie.title}</p>
                </Link>
              </div>
            ))}
        </div>
    )
}