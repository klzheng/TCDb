import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getWatchlist } from "../../api/watchlist";
import { useAuth } from "../../hooks";
import Background from "../Background";
import Container from "../Container";
import Navbar from "../Navbar";

export default function Watchlist() {


    const { authInfo } = useAuth()
    const { profile } = authInfo
    const [entireWatchlist, setEntireWatchlist] = useState([])


    useEffect(() => {
        const getEntireWatchlist = async () => {
            const response = await getWatchlist()
            setEntireWatchlist(response)
        }
        getEntireWatchlist()

        document.title = `${profile.name}'s Watchlist • TCDb`;

    }, [profile.name])

    return (
        <Background>
            <Navbar />
            <Container>
                <h1 className="text-4xl text-gray-300  pb-8 flex items-center justify-between space-x-10">
                    <span className="drop-shadow-white-text">WATCHLIST</span> 
                    <span className="text-xl text-gray-400">
                        ({entireWatchlist.length} Items)
                    </span>
                </h1>
                <div className="grid grid-cols-5 gap-1">
                    {entireWatchlist.length !== 0 && entireWatchlist.map((item, index) => (
                        <Link to={`/${item.movieType}/${item.movieId}`}>
                            <div
                                key={index}
                                className="flex flex-col group relative"
                            >
                                <p
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-500 text-gray-200 px-1 rounded group-hover:opacity-100 whitespace-nowrap space-x-1 opacity-0 transition-all duration-400 text-xl border-2 border-gray-300">
                                    <span>
                                        {item.movieName}
                                    </span>
                                    <span>
                                        ({item.movieRelease.slice(0, 4)})
                                    </span>
                                </p>
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${item.imgPath}`}
                                    alt="Poster"
                                    className="rounded-lg border-4 border-slate-400 border-opacity-0 hover:border-opacity-100 transition-all ">
                                </img>
                            </div>
                        </Link>
                    ))}
                </div>

            </Container>
        </Background>
    )
}