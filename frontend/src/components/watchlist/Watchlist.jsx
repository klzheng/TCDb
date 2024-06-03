import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getWatchlist } from "../../api/watchlist";
import { useAuth } from "../../hooks";
import Background from "../Background";
import Container from "../Container";
import Navbar from "../Navbar";
import LoadingImage from "../utils/LoadingImage";


export default function Watchlist() {
    const { authInfo } = useAuth()
    const { profile } = authInfo
    const [entireWatchlist, setEntireWatchlist] = useState([])
    const [imageLoading, setImageLoading] = useState({})

    useEffect(() => {
        const getEntireWatchlist = async () => {
            const response = await getWatchlist()
            setEntireWatchlist(response)
        }
        getEntireWatchlist()
        document.title = `Watchlist • TCDb`;
    }, [profile.name])

    useEffect(() => {
        entireWatchlist.forEach((item) => {
          const img = new Image();
          img.src = `https://image.tmdb.org/t/p/w342${item.imgPath}`;
          img.onload = () => {
            setImageLoading((prevImageLoaded) => ({ ...prevImageLoaded, [item.movieId]: true }));
          };
        });
      }, [entireWatchlist]);      

    return (
        <Background>
            <Navbar />
            <Container>
                <h1 className="text-4xl text-gray-300 pb-8 flex items-center justify-between xs:space-x-10 2xs:py-8 sm:pt-0 2xs:space-x-2">
                    <span className="drop-shadow-white-text">WATCHLIST</span>
                    <span className="2xs:text-lg xs:text-xl text-gray-400 ">
                        ({entireWatchlist.length} Items)
                    </span>
                </h1>
                <div className="grid gap-1 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 2xs:grid-cols-2 ">
                    {entireWatchlist.length !== 0 && entireWatchlist.map((item, index) => (
                        <Link
                            key={index}
                            to={`/${item.movieType}/${item.movieId}`}
                        >
                            <div className="flex justify-center w-40 group relative">
                                <p className="absolute left-1/2 -translate-x-1/2 bg-gray-500 text-gray-200 px-1 rounded group-hover:opacity-100 whitespace-nowrap space-x-1 opacity-0 transition-all duration-400 text-xl border-2 border-gray-300 2xs:text-base 2xs:-top-8 lg:text-lg lg:-top-10">
                                    <span>{item.movieName}</span>
                                    <span>({item.movieRelease.slice(0, 4)})</span>
                                </p>
                                {!imageLoading[item.movieId] 
                                    ? <LoadingImage/>
                                    : <img
                                        src={`https://image.tmdb.org/t/p/w342${item.imgPath}`}
                                        alt="Poster"
                                        className="box-content h-60 w-40 rounded-lg border-4 border-slate-400 border-opacity-0 hover:border-opacity-100 transition-all">
                                    </img>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </Background>
    )
}