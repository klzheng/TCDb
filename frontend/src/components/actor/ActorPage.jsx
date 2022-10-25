import { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../../context/MovieContext";
import Cast from "../film/Cast";
import ActorOther from "./ActorOther";
import Biography from "./Biography";
import Background from "../Background";
import Container from "../Container";
import Navbar from "../Navbar";
import ActorImage from "./ActorImage";

export default function ActorPage() {

    const [actorDetails, setActorDetails] = useState([])
    const [credits, setCredits] = useState([])
    const [dataTest, setDataTest] = useState({})
    const res = useParams()
    const { grabData } = useContext(MovieContext)
    const apiPerson = `https://api.themoviedb.org/3/person/${res.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=credits`


    useEffect(() => {
        // getting video key
        grabData(apiPerson)
            .then(data => {
                setActorDetails(data)
                setCredits((data.credits.cast || data.credits.crew).sort((a, b) => (b.popularity - a.popularity)).slice(0, 10))
                setDataTest({
                    "known": data.known_for_department,
                    "gender": data.gender,
                    "birthDay": data.birthday,
                    "birthLocation": data.place_of_birth,
                    "aliases": data.also_known_as,
                })
            })
    }, [apiPerson, grabData])


    useEffect(() => {
        document.title = `${actorDetails.name} • TCDb`;
    }, [actorDetails]);


    return (
        <Background>
            <Navbar />
            <Container>
                {Object.keys(dataTest).length !== 0 &&
                    <div className="flex space-x-10 2xs:py-10 sm:py-0 2xs:pr-5">

                        {/* LEFT COLUMN */}
                        <div className="2xs:hidden sm:flex sm:w-2/5 xl:w-1/5  flex-col gap-5">
                            <ActorImage
                                imgPath={actorDetails.profile_path} />
                            <ActorOther
                                info={dataTest} />
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="2xs:w-full 2xs:pr-10 sm:pr-0 sm:w-3/5 xl:w-4/5 flex flex-col gap-10">

                            <h1 className="xs:text-5xl 2xs:text-3xl text-white font-semibold">
                                {actorDetails.name}
                            </h1>
                            <Biography
                                bio={actorDetails.biography}
                                imgPath={actorDetails.profile_path} />
                            <Cast
                                title="Known For"
                                cast={credits}
                                people={false} />
                            <div className="sm:hidden pt-5 text-center">
                                <ActorOther
                                    info={dataTest} />
                            </div>
                        </div>


                    </div>
                }
            </Container>
        </Background>
    )
}