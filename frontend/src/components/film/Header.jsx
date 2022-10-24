import { useEffect } from "react"
import { useState } from "react"
import { FaHeart } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { getReview } from "../../api/review"
import RatingModal from "../modals/RatingModal"

export default function Header(props) {


    const [displayModal, setDisplayModal] = useState(false)
    const [reviewDetails, setReviewDetails] = useState({})
    const { mediaType, id } = useParams()

    const toggleModal = async () => {
        setDisplayModal(prevState => !prevState)
    }

    const ratingColor = (rating) => {
        if (rating >= 8) return " border-green-400 bg-green-600 "
        else if (rating >= 6.5) return " border-yellow-300 bg-yellow-500 "
        else if (rating >= 5.5) return " bg-orange-500 border-orange-300 "
        else if (rating > 0) return " bg-red-500 border-red-300 "
        else return ""
    }


    // grab review data on load
    useEffect(() => {
        const grabData = async () => {
            const { response } = await getReview(mediaType, id)
            if (response) setReviewDetails(response)
        }
        grabData()

    },[displayModal, id, mediaType])


    return (
        <div>
            {/* {console.log(props)} */}
            <div className="text-5xl font-light text-gray-400 mb-1 mt-32">
                <span className="font-semibold text-white">
                    {(props.details.title || props.details.name)}
                </span>
                {props.releaseDate.length !== 0 && <span> ({props.releaseDate.slice(0,4)})</span>}
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

                    {props.details.length !== 0 && <button onClick={toggleModal} className="flex flex-row items-center hover:text-gray-300 hover:drop-shadow-white-text">
                        <FaHeart className={"mr-2" + (reviewDetails.liked ? " text-red-400 " : " ")} />
                        Rate
                    </button>}

                    {displayModal &&
                        <RatingModal
                            title={props.details.title || props.details.name}
                            releaseDate={props.releaseDate}
                            imgPath={props.details.poster_path}
                            reviewDetails={reviewDetails}
                            toggleModal={toggleModal}
                        />
                    }

                </div>}

        </div>
    )
}