import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getWatchlist } from "../services/watchlist";
import { useAuth } from "../hooks";
import Card from "../components/Shared/Card";
import Background from "../components/Shared/Layout/Background";
import Navbar from "../components/Shared/Layout/Navbar";
import Container from "../components/Shared/Layout/Container";


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
        document.title = `Watchlist • TCDb`;
    }, [profile.name])    

    return (
        <Background>
            <Navbar />
            <Container>
                <h1 className="text-3xl text-gray-300 pb-8 flex items-center justify-between xs:space-x-10 2xs:py-8 sm:pt-0 2xs:space-x-2">
                    <span className="drop-shadow-white-text">WATCHLIST</span>
                    <span className="2xs:text-lg xs:text-xl text-gray-400">
                        ({entireWatchlist.length} Items)
                    </span>
                </h1>
                <div className="grid-container">
                    {entireWatchlist.length !== 0 && entireWatchlist.map((item, index) => (
                        <Link key={index} to={`/${item.movieType}/${item.movieId}`}>
                            <Card
                                id={item.movieId}
                                title={item.movieName}
                                imageUrl={`https://image.tmdb.org/t/p/w342${item.imgPath}`}
                                displayOptions={{"showTitleOnHover": true}}
                            />
                        </Link>
                    ))}
                </div>
            </Container>
        </Background>
    )
}