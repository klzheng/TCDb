import { useState } from "react";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getAll, getSorted } from "../api/review";
import Background from "./Background";
import Container from "./Container";
import RatingModal from "./modals/RatingModal";
import Navbar from "./Navbar";

export default function UserFilm() {

    const [allReviews, setAllReviews] = useState([])
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedReviewData, setSelectedReviewData] = useState({})
    const [selectedSort, setSelectedSort] = useState("movieRelease")
    const [sortValue, setSortValue] = useState(-1)


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


    // sorts movies 
    const sortItems = async (filterTerm, filterValue) => {
        const response = await getSorted(filterTerm, filterValue)
        setSortValue(filterValue)
        setSelectedSort(filterTerm)
        setAllReviews(response)
    }


    const changeSort = () => {
        sortItems(selectedSort, sortValue * -1)

    }


    // refreshes all reviews from db when modal is toggled
    useEffect(() => {
        const grabAllReviews = async () => {
            const response = await getAll()
            // console.log(response)
            setAllReviews(response)
        }
        grabAllReviews()
    }, [displayModal])





    return (
        <Background>
            <Navbar />
            <Container>
                <h2 className="flex justify-end items-center pb-10 space-x-2 ">
                    {sortValue === -1
                        ? <IoIosArrowDown
                            className="text-white drop-shadow-white-text"
                            onClick={() => changeSort()} />
                        : <IoIosArrowUp
                            className="text-white drop-shadow-white-text"
                            onClick={() => changeSort()} />}
                    <span
                        onClick={() => sortItems("rating", -1)}
                        className={"hover:text-gray-200" + (selectedSort === "rating" ? " text-white drop-shadow-white-text " : " ")}
                    >
                        RATING
                    </span>
                    <span
                        onClick={() => sortItems("movieName", 1)}
                        className={"hover:text-gray-200" + (selectedSort === "movieName" ? " text-white drop-shadow-white-text " : " ")}
                    >
                        TITLE
                    </span>
                    <span
                        onClick={() => sortItems("movieRelease", -1)}
                        className={"hover:text-gray-200" + (selectedSort === "movieRelease" ? " text-white drop-shadow-white-text " : " ")}
                    >
                        RELEASE DATE
                    </span>
                </h2>
                <div className="grid grid-cols-6 gap-1">
                    {allReviews.length !== 0 && allReviews.map((review, index) => (
                        <div key={index} className="flex flex-col group relative">
                            <p
                                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 text-gray-200 px-1 rounded group-hover:opacity-100 whitespace-nowrap space-x-1 opacity-0 transition-all duration-400 ">
                                <span>
                                    {review.movieName}
                                </span>
                                <span>
                                    ({review.movieRelease.slice(0, 4)})
                                </span>
                            </p>
                            <img
                                src={`https://image.tmdb.org/t/p/w342${review.imgPath}`}
                                alt="Poster"
                                onClick={() => toggleModal(index)}
                                className="rounded-lg border-4 border-slate-400 border-opacity-0 hover:border-opacity-100 transition-all ">
                            </img>
                            <p className="flex items-center justify-center space-x-2">
                                <span>
                                    Rating:
                                    <span className="bg-slate-600 rounded mx-0.5 px-1 bg-opacity-60 text-white">
                                        {review.rating}
                                    </span>
                                </span>
                                <span >{review.liked ? <FaHeart className="text-red-400" /> : <FaRegHeart />}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                {displayModal &&
                    <RatingModal
                        title={selectedReviewData.title}
                        releaseDate={selectedReviewData.releaseDate}
                        imgPath={selectedReviewData.imgPath}
                        reviewDetails={selectedReviewData.reviewDetails}
                        toggleModal={() => setDisplayModal(!displayModal)}
                    />
                }
            </Container>
        </Background>
    )
}