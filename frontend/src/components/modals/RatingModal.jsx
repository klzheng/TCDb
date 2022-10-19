import { useParams } from "react-router-dom"
import { FaHeart } from "react-icons/fa"
import { BiX } from "react-icons/bi"
import { useState } from "react"
import ModalContainer from "./ModalContainer"

export default function RatingModal(props) {

    const res = useParams()
    const regex = /^(0-9|\d)(\.\d{1})?$/
    const [liked, setLiked] = useState(false)
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")
    const [enlarge, setEnlarge] = useState(false)
    const { title, releaseYear, imgPath, toggleModal } = props

    const toggleLike = () => {
        setLiked(prevState => !prevState)
    }

    const toggleEnlarge = () => {
        setEnlarge(prevState => !prevState)
    }

    const handleRating = (e) => {
        if (regex.test(e.target.value) || e.target.value === "") {
            setRating(e.target.value)
        }
    }

    const handleChange = (e) => {
        setReview(e.target.value)
    }

    return (
        <ModalContainer>

            {/* LEFT COLUMN */}
            <section className="w-1/3 my-10 flex justify-center">
                <img
                    src={`https://image.tmdb.org/t/p/w342${imgPath}`}
                    alt="Poster"
                    className={"rounded w-40 h-60 object-cover drop-shadow-3xl"} />
            </section>

            {/* MIDDLE COLUMN */}
            <section className="w-3/4 flex flex-col justify-center relative my-8">

                {/* TITLE */}
                <p className="font-extrabold font-lora text-white tracking-tight">
                    {title}
                    <span className="font-thin text-gray-400 font-karla ">
                        {" " + releaseYear}
                    </span>
                </p>

                {/* LIKE && REVIEW */}
                <div className="flex my-2 w-40 space-x-6 bg-slate-500 rounded-lg px-2 py-1">
                    <div className="flex flex-col items-center space-y-1">
                        <h3 className="text-gray-200 tracking-tight text-base">
                            Like
                        </h3>
                        <FaHeart
                            onClick={toggleLike}
                            className={" drop-shadow-groove " +
                                (liked
                                    ? " text-red-400 "
                                    : " text-slate-700 hover:text-slate-800 ")} />
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <h3 className="text-gray-200 tracking-tight text-base">
                            Rating
                        </h3>
                        <div className="flex items-center space-x-1">
                            <input
                                type="number"
                                placeholder="—"
                                value={rating}
                                onChange={handleRating}
                                className="bg-inherit rounded w-9 h-5 text-2xl font-bold text-slate-100 outline-none text-center caret-slate-400 cursor-pointer"
                            />
                            <span className="text-sm text-slate-400 tracking-tight">
                                out of 10
                            </span>
                        </div>
                    </div>
                </div>

                {/* REVIEW */}
                <div>
                    <textarea
                        name="review"
                        id="review"
                        rows="6"
                        placeholder="Add a review..."
                        value={review}
                        onFocus={toggleEnlarge}
                        onBlur={toggleEnlarge}
                        onChange={handleChange}
                        className={"text-slate-600 bg-slate-300 text-base p-2 my-2 outline-none rounded tracking-tight leading-tight w-full relative z-10 resize-none" + (enlarge ? " h-60 " : " h-24 ")} />
                </div>

                {/* SAVE BUTTON */}
                <div className="flex justify-end">
                    <button
                        className="bg-green-600 text-white py-0.5 px-4 rounded-sm text-base font-semibold hover:bg-green-700 transition outline-none "
                    >
                        SAVE
                    </button>
                </div>
            </section>

            {/* RIGHT COLUMN (X BUTTON) */}
            <section>
                <BiX
                    onClick={toggleModal}
                    className="text-4xl text-slate-400" />
            </section>

        </ModalContainer>
    )
}