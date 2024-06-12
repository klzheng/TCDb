import { useState, useEffect } from "react";
import { fetchAllReviews, fetchReview } from "../services/review.js";
import { fetchFilm } from "../services/film.js";
import Background from "../components/Shared/Layout/Background.jsx";
import Container from "../components/Shared/Layout/Container.jsx";
import ModalBody from "../components/Shared/Modal/ModalBody.jsx";
import Sortable from "../components/Shared/Sortable.jsx";
import { Reorder } from "framer-motion";
import SearchBar from "../components/Shared/SearchBar.jsx";
import Card from "../components/Shared/Card.jsx";
import Navbar from "../components/Shared/Layout/Navbar.jsx";

const SearchBarPlaceholder = () => {
    return (
        <h1 className="text-3xl text-gray-300">
            <span className="drop-shadow-white-text">MY REVIEWS</span>
        </h1>
    )
}

const Review = () => {
    const [reviews, setReviews] = useState([])
    const [reviewsCount, setReviewsCount] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentReview, setCurrentReview] = useState({})
    const [searchQuery, setSearchQuery] = useState("");

    const sortOptions = [
        { value: "movieRelease", label: "Release Date" },
        { value: "movieName", label: "Title" },
        { value: "rating", label: "Rating" }
    ];

    const toggleModal = async (movieId, mediaType) => {
        const movieData = await fetchFilm(movieId, mediaType)
        const reviewData = await fetchReview(movieId, mediaType)

        setIsModalOpen(!isModalOpen)
        setCurrentReview({
            "title": movieData.title || movieData.name,
            "releaseDate": movieData.release_date || movieData.first_air_date,
            "imgPath": movieData.poster_path || movieData.backdrop_path,
            "reviewDetails": reviewData,
        })
    }

    const handleSort = (sortedData) => {
        setReviews(sortedData);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    useEffect(() => {
        const filteredReviews = reviews.filter((review) => {
            return searchQuery === "" ? true : review.movieName.toLowerCase().includes(searchQuery.toLowerCase())
        });
        setReviewsCount(filteredReviews.length);
    }, [searchQuery, reviews]);

    useEffect(() => {
        const grabAllReviews = async () => {
            const response = await fetchAllReviews()
            setReviews(response)
        }
        grabAllReviews()
        document.title = "My Reviews • TCDb";
    }, [])

    return (
        <Background>
            <Navbar />
            <Container>
                <div className="flex justify-between items-center pb-5">
                    <SearchBar 
                        onSearch={handleSearch} 
                        inactiveElement={<SearchBarPlaceholder />} />
                    <Sortable
                        onSort={handleSort}
                        sortOptions={sortOptions}
                        data={reviews}
                        dataCount={reviewsCount}
                    />
                </div>
                <Reorder.Group axis="y" onReorder={setReviews} values={reviews}>
                    <div className="grid-container">
                        {reviews.length !== 0 && 
                        reviews.filter((review) => {
                            return searchQuery === "" ? true : review.movieName.toLowerCase().includes(searchQuery.toLowerCase())
                        }).map((review) => (
                            <Reorder.Item key={review.movieId} value={review} transition={{ duration: .2 }} layout className="w-40 group relative">
                                <Card
                                    id={review.movieId}
                                    title={review.movieName}
                                    imageUrl={`https://image.tmdb.org/t/p/w342${review.imgPath}`}
                                    rating={review.rating}
                                    liked={review.liked}
                                    onClick={() => toggleModal(review.movieId, review.movieType)}
                                    displayOptions={{
                                        "showTitleOnHover": true,
                                        "showUserRating": true,
                                    }}
                                />
                            </Reorder.Item>
                        ))}
                    </div>
                </Reorder.Group>

                {isModalOpen &&
                    <ModalBody
                        title={currentReview.title}
                        releaseDate={currentReview.releaseDate}
                        imgPath={currentReview.imgPath}
                        reviewDetails={currentReview.reviewDetails}
                        toggleModal={() => setIsModalOpen(!isModalOpen)}
                    />
                }
            </Container>
        </Background>
    )
}

export default Review;