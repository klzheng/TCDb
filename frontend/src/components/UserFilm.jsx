import { useState } from "react";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getAll } from "../api/review";
import Background from "./Background";
import Container from "./Container";
import RatingModal from "./modals/RatingModal";
import Navbar from "./Navbar";

export default function UserFilm() {

    const [allReviews, setAllReviews] = useState([])
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedReviewData, setSelectedReviewData] = useState({})
    const [hoverInfo, setHoverInfo] = useState([])

    // grabs movie data from TMDB 
    const grabData = async (movieType, movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/${movieType}/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        const data = await response.json()
        return data
    }

    // grabs data from clicked movie, opens modal, and sets state
    const toggleModal = async (index) => {
        const mediaType = allReviews[index].movieType
        const id = allReviews[index].movieId
        const data = await grabData(mediaType, id)

        setSelectedReviewData({
            "title": data.title || data.name,
            "releaseDate": data.release_date || data.first_air_date,
            "imgPath": data.poster_path || data.backdrop_path,
            "reviewDetails": allReviews[index],
        })
        setDisplayModal(!displayModal)
    }

    // refreshes all reviews from db when modal is toggled
    useEffect(() => {
        const grabAllReviews = async () => {
            const { response } = await getAll()
            setAllReviews(response)
        }
        grabAllReviews()
    }, [displayModal])


    // grabs data for each review item and sets state 
    useEffect(() => {
        allReviews.forEach(async (review) => {
            const data = await grabData(review.movieType, review.movieId)
            const info = {
                "title": data.title || data.name,
                "releaseYear": data.release_date || data.first_air_date
            }
            setHoverInfo(prevState => [...prevState, info])
            setHoverInfo(prevState => prevState.slice(0, allReviews.length))
        })
    }, [allReviews])


    return (
        <Background>
            <Navbar />
            <Container>
                <div className="grid grid-cols-6 gap-1">
                    {console.log(allReviews, hoverInfo)}
                    {(hoverInfo.length === allReviews.length) && allReviews.map((review, index) => (
                        <div key={index} className="flex flex-col group relative">
                            <p
                                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 text-gray-200 px-1 rounded group-hover:opacity-100 whitespace-nowrap space-x-1 opacity-0 transition-all duration-400 ">
                                <span>
                                    {hoverInfo[index].title}
                                </span>
                                <span>
                                    ({hoverInfo[index].releaseYear.slice(0, 4)})
                                </span>
                            </p>
                            <img
                                src={`https://image.tmdb.org/t/p/w342${review.imgPath}`}
                                alt="Poster"
                                onClick={() => toggleModal(index)}
                                className="rounded-lg border-4 border-slate-400 border-opacity-0 hover:border-opacity-100 transition-all ">
                            </img>
                            <p className="flex items-center justify-center space-x-2 -mt-1">
                                <span>Rating: {review.rating} </span>
                                <span >{review.liked ? <FaHeart className="text-red-400"/> : <FaRegHeart/> }
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                {displayModal &&
                    <RatingModal
                        title={selectedReviewData.title}
                        releaseYear={selectedReviewData.releaseDate.slice(0, 4)}
                        imgPath={selectedReviewData.imgPath}
                        reviewDetails={selectedReviewData.reviewDetails}
                        toggleModal={() => setDisplayModal(!displayModal)}
                    />
                }
            </Container>
        </Background>
    )
}