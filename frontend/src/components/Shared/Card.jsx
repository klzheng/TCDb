import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingImage from "./LoadingImage";

const Card = ({
    title = "Unknown",
    imageUrl = "/default.jpg",
    overview = "",
    rating = "N/A",
    liked = false,
    onClick,
    displayOptions,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setImageLoading(false);
        };
  }, [imageUrl]);

    return (
        <div
            className={`w-40 relative group ${onClick ? "cursor-pointer" : ""}`}
            onClick={onClick}
        >
            {imageLoading 
                ? <LoadingImage />
                : <img
                    src={imageUrl}
                    alt="Poster IMG"
                    className={`h-60 rounded-lg border-gray-700 border-1 ${displayOptions.showDescriptionOnHover && "group-hover:brightness-20"}`}
                />}
            {displayOptions.showTitleOnHover && (
                <CardTitle title={title} />
            )}
            {displayOptions.showRatingInside && (
                <CardRating rating={rating} />
            )}
            {displayOptions.showDescriptionOnHover && (
                <CardDescription overview={overview} />
            )}
            {displayOptions.showUserRating && (
                <CardRatingBelow rating={rating} liked={liked} />
            )}
        </div>
    );
};

const CardTitle = ({ title }) => {
    return (
        <div className="truncate">
            <p className="absolute pointer-events-none left-1/2 -translate-x-1/2 bg-gray-500 text-gray-200 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap space-x-1 transition-all duration-400 text-xl border-2 border-gray-300 2xs:text-base 2xs:-top-8 lg:text-lg lg:-top-10">
                <span className="">
                    {title}
                </span>
            </p>
        </div>
    );
};

const CardRating = ({ rating }) => {
    return (
        <span className="absolute top-0 right-0 m-2 text-white bg-gray-900 opacity-100 group-hover:brightness-30 rounded border-black border-1 px-1">
            {rating.toFixed(1)}
        </span>
    );
};

const CardDescription = ({ overview }) => {
    return (
        <p className="text-center absolute -translate-y-52 text-white px-2.5 line-clamp-8 opacity-0 group-hover:opacity-100 leading-snug">
            {overview}
        </p>
    );
};

const CardRatingBelow = ({ rating, liked }) => {
    return (
        <p className="flex items-center justify-center space-x-2 md:space-x-1 sm:space-x-1 lg:space-x-2">
            <span>
                Rating:
                <span className="bg-slate-600 rounded mx-0.5 px-1 bg-opacity-60 text-white">
                    {rating}
                </span>
            </span>
            {liked !== undefined && (
                <span>{liked ? <FaHeart className="text-red-400" /> : <FaRegHeart />}</span>
            )}
        </p>
    );
};

export default Card;