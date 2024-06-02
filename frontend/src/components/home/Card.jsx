import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
                        ? (<div class="flex items-center justify-center animate-pulse h-60 bg-gray-300 rounded-lg dark:bg-gray-700">
                            <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
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