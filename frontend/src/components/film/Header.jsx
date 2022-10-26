import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa"
import { BsBookmarkStar } from "react-icons/bs"
import { getReview } from "../../api/review"
import RatingModal from "../modals/RatingModal"
import { addWatchlist, getWatchlistItem, removeWatchlist } from "../../api/watchlist"
import { useNotification } from "../../hooks"
import { motion, AnimatePresence } from "framer-motion"


export default function Header(props) {

    const [displayModal, setDisplayModal] = useState(false)
    const [reviewDetails, setReviewDetails] = useState({})
    const [inWatchlist, setInWatchlist] = useState(false)
    const [watchlistDetails, setWatchlistDetails] = useState({})

    const { mediaType, id } = useParams()
    const { updateNotification } = useNotification()


    const addToList = async () => {
        const data = {
            movieName: props.details.title || props.details.name,
            releaseDate: props.releaseDate,
            imgPath: props.details.poster_path,
        }
        const { error, message } = await addWatchlist(mediaType, id, data)

        if (error) return updateNotification("error", error)
        updateNotification("success", message)
        setInWatchlist(true)
    }

    const removeFromList = async () => {
        const { error, message } = await removeWatchlist(watchlistDetails._id)
        if (error) return updateNotification("error", error)
        updateNotification("success", message)
        setInWatchlist(false)
    }


    const toggleModal = async () => {
        await setDisplayModal(prevState => !prevState)
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

    }, [displayModal, id, mediaType])


    // checks if movie is already on user's watchlist and sets state
    useEffect(() => {
        const checkWatchlist = async () => {
            const { response } = await getWatchlistItem(mediaType, id)
            if (response) {
                setInWatchlist(true)
                setWatchlistDetails(response)
            }
            else setInWatchlist(false)
        }
        checkWatchlist()
    }, [inWatchlist, id, mediaType])


    return (

        <div>
            <div className="xs:text-5xl 2xs:text-3xl 2xs:-mt-12 sm:mt-4 md:mt-16 lg:mt-16 xl:mt-40 font-light text-gray-400 mb-1 ">
                <span className="font-semibold text-white">
                    {(props.details.title || props.details.name)}
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
                                <BsBookmarkStar
                                    className={" mr-2 " + (inWatchlist ? " text-yellow-300 " : "  ")} />Add
                            </motion.button>

                            <motion.button
                                whileHover={{scale:1.1}}
                                onClick={toggleModal}
                                className="flex flex-row items-center hover:text-gray-300 group "
                            >
                                <FaRegHeart
                                    className={"mr-2 " + (reviewDetails.liked ? " text-red-500 group-hover:text-red-400 " : " ")} />
                                Rate
                            </motion.button>
                        </div>
                    }

                    <AnimatePresence>
                        {displayModal &&
                            <RatingModal
                                title={props.details.title || props.details.name}
                                releaseDate={props.releaseDate}
                                imgPath={props.details.poster_path}
                                reviewDetails={reviewDetails}
                                reloadOnDelete={true}
                                toggleModal={toggleModal}
                            />
                        }
                    </AnimatePresence>
                </div>}

        </div>

    )
}