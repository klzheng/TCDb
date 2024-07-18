import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { FaRegHeart } from "react-icons/fa"
import { BsBookmarkStar } from "react-icons/bs"
import { fetchReview } from "../../services/review"
import ModalBody from "../Shared/Modal/ModalBody"
import { addWatchlist, getWatchlistItem, removeWatchlist } from "../../services/watchlist"
import { useNotification } from "../../hooks"

export default function Header(props) {
    const [displayModal, setDisplayModal] = useState(false)
    const [reviewDetails, setReviewDetails] = useState({})
    const [inWatchlist, setInWatchlist] = useState(false)
    const [watchlistDetails, setWatchlistDetails] = useState({})

    const { mediaType, id } = useParams()
    const { updateNotification } = useNotification()

    const addToList = async () => {
        const movieData = {
            movieName: props.details.title || props.details.name,
            releaseDate: props.releaseDate,
            imgPath: props.details.poster_path,
        }
        const { error, message, data } = await addWatchlist(mediaType, id, movieData)
        if (error) {
            updateNotification("error", error)
        } else {
            updateNotification("success", message)
            setInWatchlist(true)
            setWatchlistDetails(data)
        }
    }

    const removeFromList = async () => {
        if (!watchlistDetails) return updateNotification("error", "Watchlist item not found")
        const response = await removeWatchlist(watchlistDetails._id)
        if (response.error) return updateNotification("error", response.error)
        updateNotification("success", response.message)
        setInWatchlist(false)
        setWatchlistDetails(null)
    }

    const ratingColor = (rating) => {
        if (rating >= 8) return " border-green-400 bg-green-600 "
        else if (rating >= 6.5) return " border-yellow-300 bg-yellow-500 "
        else if (rating >= 5.5) return " bg-orange-500 border-orange-300 "
        else if (rating > 0) return " bg-red-500 border-red-300 "
        else return ""
    }

    useEffect(() => {
        const grabData = async () => {
            try {
                const reviewData = await fetchReview(id, mediaType);
                setReviewDetails(reviewData);
            } catch (err) {
                console.log(err);
            }
        }
        grabData()
    }, [displayModal, id, mediaType])

    useEffect(() => {
        const checkWatchlist = async () => {
            const watchlistItem = await getWatchlistItem(mediaType, id)
            
            if (watchlistItem) {
                setInWatchlist(true)
                setWatchlistDetails(watchlistItem)
            }
            else setInWatchlist(false)
        }
        checkWatchlist()
    }, [id, mediaType])

    return (
        <div>
            <div className="xs:text-5xl 2xs:text-3xl font-light text-gray-400 mb-1 ">
                <span className="font-semibold text-white">
                    {props.details.title || props.details.name}
                </span>
                {props.releaseDate.length !== 0 && <span> ({props.releaseDate.slice(0, 4)})</span>}
            </div>

            <div>
                <span>{props.genres}</span>
            </div>

            {props.details.vote_average !== 0 &&
                <div className="flex flex-row items-center xs:text-2xl 2xs:text-xl my-4 justify-between">
                    <span>
                        <span className={"border-2 rounded px-1 mr-2 text-white" + ratingColor(props.details.vote_average)}>
                            {props.details.vote_average && props.details.vote_average.toFixed(1)}
                        </span>
                        TMDb Rating
                    </span>

                    {props.details.length !== 0 &&
                        <div>
                            <motion.button
                                whileHover={{scale:1.1}}
                                whileTap={{scale:1}}
                                onClick={inWatchlist ? removeFromList : addToList}
                                className="flex items-center mr-2 hover:text-gray-300 outline-none"
                            >
                                <BsBookmarkStar className={" mr-2 " + (inWatchlist ? " text-yellow-300 " : "  ")} />
                                Add
                            </motion.button>

                            <motion.button
                                whileHover={{scale:1.1}}
                                onClick={() => setDisplayModal(true)}
                                className="flex flex-row items-center hover:text-gray-300 group "
                            >
                                <FaRegHeart className={"mr-2 " + (Object.keys(reviewDetails).length && " text-red-500 group-hover:text-red-400 ")} />
                                Rate
                            </motion.button>
                        </div>
                    }

                    {displayModal &&
                        <ModalBody
                            title={props.details.title || props.details.name}
                            releaseDate={props.releaseDate}
                            imgPath={props.details.poster_path}
                            reviewDetails={reviewDetails}
                            reloadOnDelete={true}
                            onClose={() => setDisplayModal(false)}
                        />
                    }
                </div>
            }
        </div>
    )
}