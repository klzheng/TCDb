import { useState } from "react";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getAll, getReview } from "../../api/review";
import Background from "../Background";
import Container from "../Container";
import RatingModal from "../modals/RatingModal";
import Navbar from "../Navbar";
import SortBy from "./SortBy";
import LoadingImage from "../utils/LoadingImage";
import { Reorder } from "framer-motion";
import SearchBar from "./SearchBar";


const SearchBarInactive = () => {
    return (
        <h1 className="text-3xl text-gray-300">
            <span className="drop-shadow-white-text">MY FILMS</span>
        </h1>
    )
}

const UserFilm = () => {
    document.title = "My Reviews • TCDb";
    const [allReviews, setAllReviews] = useState([])
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedReviewData, setSelectedReviewData] = useState({})
    const [selected, setSelected] = useState("movieRelease")
    const [sortValue, setSortValue] = useState(-1)
    const [loadedImages, setLoadedImages] = useState({})
    const [searchQuery, setSearchQuery] = useState("");

    // grabs movie data from TMDB 
    const grabData = async (movieType, movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/${movieType}/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        const data = await response.json()
        return data
    }

    // opens modal for review
    const toggleModal = async (index) => {
        const mediaType = allReviews[index].movieType
        const id = allReviews[index].movieId
        const data = await grabData(mediaType, id)
        const reviewData = await getReview(mediaType, id)

        setSelectedReviewData({
            "title": data.title || data.name,
            "releaseDate": data.release_date || data.first_air_date,
            "imgPath": data.poster_path || data.backdrop_path,
            "reviewDetails": reviewData,
        })
        setDisplayModal(!displayModal)
    }

    // sorts movies 
    const sortItems = (filterTerm, filterValue) => {
        allReviews.sort((a, b) => {
            if (filterTerm === "movieRelease") {
                return (new Date(a.movieRelease) - new Date(b.movieRelease)) * filterValue;
            } else if (filterTerm === "movieName") {
                return a.movieName.localeCompare(b.movieName) * filterValue;
            } else if (filterTerm === "rating") {
                return (a.rating - b.rating) * filterValue;
            } else {
                return 0;
            }
        });

        setSortValue(filterValue)
        setSelected(filterTerm)
    }

    // reverses sort order
    const changeSort = () => {
        sortItems(selected, sortValue * -1)
    }

    // filters reviews based on input query
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    // loads all reviews on page load
    useEffect(() => {
        const grabAllReviews = async () => {
            const response = await getAll()
            setAllReviews(response)
        }
        grabAllReviews()
    }, [])

    // shows loading skeletons for movie posters
    useEffect(() => {
        allReviews.forEach((review) => {
            const img = new Image();
            img.src = `https://image.tmdb.org/t/p/w342${review.imgPath}`;
            img.onload = () => {
                setLoadedImages((prevLoadedImages) => ({ ...prevLoadedImages, [review.movieId]: true }));
            };
        });
    }, [allReviews]);
    

    return (
        <Background>
            <Navbar />
            <Container>
                <div className="flex justify-between items-center pb-5">
                    <SearchBar 
                        onSearch={handleSearch} 
                        inactiveElement={<SearchBarInactive />} />
                    <SortBy
                        sortValue={sortValue}
                        changeSort={changeSort}
                        selected={selected}
                        sortItems={sortItems}
                        numItems={allReviews.length} 
                    />
                </div>
                <Reorder.Group axis="y" onReorder={setAllReviews} values={allReviews}>
                    <div className="grid gap-1 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 2xs:grid-cols-2 transition-all">
                        {allReviews.length !== 0 && allReviews.filter((review) => {
                            return searchQuery === "" ? true : review.movieName.toLowerCase().includes(searchQuery.toLowerCase())
                        }).map((review, index) => (
                            <Reorder.Item key={review.movieId} value={review} transition={{ duration: .2 }} layout className="w-40 group relative">
                                <p className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 text-gray-200 px-1 rounded group-hover:block whitespace-nowrap space-x-1 hidden transition-all duration-400 border-1">
                                    <span>{review.movieName}</span>
                                    <span>({review.movieRelease.slice(0, 4)})</span>
                                </p>
                                {!loadedImages[review.movieId] 
                                    ? <LoadingImage />
                                    : <img
                                        src={`https://image.tmdb.org/t/p/w342${review.imgPath}`}
                                        alt="Poster"
                                        onClick={() => toggleModal(index)}
                                        className="h-60 w-40 min-w-40 box-content rounded-lg border-4 border-slate-400 border-opacity-0 hover:border-opacity-100 transition-all hover:cursor-pointer" 
                                    />}
                                <p className="flex items-center justify-center space-x-2 md:space-x-1 sm:space-x-1 lg:space-x-2 ">
                                    <span>
                                        Rating:
                                        <span className="bg-slate-600 rounded mx-0.5 px-1 bg-opacity-60 text-white ">
                                            {review.rating}
                                        </span>
                                    </span>
                                    <span>{review.liked ? <FaHeart className="text-red-400" /> : <FaRegHeart />}</span>
                                </p>
                            </Reorder.Item>
                        ))}
                    </div>
                </Reorder.Group>

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

export default UserFilm;