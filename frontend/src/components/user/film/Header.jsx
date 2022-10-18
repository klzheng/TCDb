import { FaHeart } from "react-icons/fa"

export default function Header(props) {

    const ratingColor = (rating) => {
        if (rating >= 8) return " border-green-400 bg-green-600 "
        else if (rating >= 6.5) return " border-yellow-300 bg-yellow-500 "
        else if (rating >= 5.5) return " bg-orange-500 border-orange-300 "
        else if (rating > 0) return " bg-red-500 border-red-300 "
        else return ""
    }

    return (
        <div>
            {console.log(props)}
            <div className="text-5xl font-light text-gray-400 mb-1">
                <span className="font-semibold text-white">
                    {(props.details.title || props.details.name)}
                </span>
                {props.releaseDate.length !== 0 && <span> ({props.releaseDate.slice(-4)})</span>}
            </div>

            <div>
                <span>{props.genres}</span>
            </div>

            {props.details.vote_average !== 0 &&
                <div className="flex flex-row items-center text-2xl my-4 justify-between">
                    <span>
                        <span className={"border-2 rounded px-1 mr-2 text-white" + ratingColor(props.details.vote_average)}>
                            {props.details.vote_average && props.details.vote_average.toFixed(1)}
                        </span>
                        TMDb Rating
                    </span>

                    <span className="flex flex-row items-center">
                        Rate
                        <FaHeart className="ml-1" />
                    </span>
                </div>}

        </div>
    )
}