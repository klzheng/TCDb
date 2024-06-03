import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingImage from "../utils/LoadingImage";


export default function Card(props) {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = props.image_path;
        img.onload = () => {
            setImageLoading(false);
            setImage(img.src);
        }
    }, [props.image_path])

    return (
        <div className="w-40 relative group">
            <div className="group-hover:shadow-whitexl rounded-lg group-hover:transition-all duration-500">
                <Link to={`/${props.type}/${props.id}`}>
                    {imageLoading 
                        ? (<div className="flex items-center justify-center animate-pulse h-60 bg-gray-300 rounded-lg dark:bg-gray-700">
                            <LoadingImage />
                        </div>) 
                        : (<img 
                            src={image} 
                            alt="Poster IMG" 
                            className="border-2 border-slate-700 object-cover h-60 rounded-lg group-hover:brightness-20 group-hover:transition duration-500"  
                        />)} 
                    <p className="text-center absolute -translate-y-52 text-white px-2.5 line-clamp-8 opacity-0 group-hover:opacity-100 ease-in-out duration-500 leading-snug">
                        {props.overview}
                    </p>
                    <span className="absolute -translate-y-60 translate-x-32 my-2 -mx-1 text-white bg-black bg-opacity-70 group-hover:brightness-20 transition-all rounded px-1">
                        {(props.rating) ? props.rating.toFixed(1) : ""}
                    </span>
                </Link>
            </div>
            <div className="text-center pt-4 font-semibold text-lg">
                {props.name}
            </div>
        </div>
    )
}