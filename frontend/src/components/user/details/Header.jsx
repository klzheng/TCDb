import { FaHeart } from "react-icons/fa"

export default function Header(props) {
    return (
        <div>

            <div className="text-4xl font-light text-gray-400">
                <span className="font-semibold text-white">
                    {(props.details.title || props.details.name)}
                </span>
                {` (${props.releaseDate.slice(-4)})`}
            </div>


            <div>
                <span>{props.genres}</span>
            </div>


            <div className="flex flex-row items-center text-2xl my-4 justify-between">
                <span>
                    <span className="border-2 rounded px-1 mr-2 ">
                        {props.details.vote_average && props.details.vote_average.toFixed(1)}
                    </span>
                    TMDb Rating
                </span>

                <span className="flex flex-row items-center">
                    Rate 
                    <FaHeart className="ml-1" />
                </span>
            </div>

        </div>
    )
}