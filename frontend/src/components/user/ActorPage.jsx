import { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../../context/MovieContext";
import Cast from "./film/Cast";
import ActorOther from "./person/ActorOther";
import Biography from "./person/Biography";

export default function ActorPage() {

    const [actorDetails, setActorDetails] = useState([])
    const [credits, setCredits] = useState([])
    const res = useParams()
    const { grabData } = useContext(MovieContext)
    const apiPerson = `https://api.themoviedb.org/3/person/${res.id}?api_key=5b7ff1ca08f2367f1d77090c6730231d&append_to_response=credits`


    useEffect(() => {
        // getting video key
        grabData(apiPerson)
            .then(data => {
                console.log(data)
                setActorDetails(data)
                setCredits((data.credits.cast || data.credits.crew).sort((a, b) => (b.popularity - a.popularity)).slice(0, 10))
            })
    }, [apiPerson, grabData])

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">
            <div className="mx-32 my-28 text-gray-400 flex-auto ">

                {actorDetails.length !== 0 &&
                    <div className="flex space-x-10">
                        <div className="w-1/3 flex flex-col gap-5">
                            <img
                                src={`https://image.tmdb.org/t/p/original${actorDetails.profile_path}`}
                                className="object-cover rounded-lg"
                                alt="Actor" />

                            <ActorOther
                                known={actorDetails.known_for_department}
                                gender={actorDetails.gender}
                                birthDay={actorDetails.birthday}
                                birthLocation={actorDetails.place_of_birth}
                                aliases={actorDetails.also_known_as} />
                        </div>

                        <div className="w-2/3 flex flex-col gap-10">
                            <h1 className="text-5xl text-white font-semibold">{actorDetails.name}</h1>

                            <Biography bio={actorDetails.biography} />

                            <Cast title="Known For" cast={credits} />
                        </div>
                    </div>
                }
            </div>
            {/* <ActorHeader
                imgPath={pageDetails.profile_path}
                name={pageDetails.name}
                bio={pageDetails.biography} />
            
            <Cast cast={cast}/> */}
            {/* <Acting />
            <ActorOther />  */}
        </div>
    )
}