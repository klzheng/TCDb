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
                    "known" : data.known_for_department,
                    "gender" : data.gender,
                    "birthDay" : data.birthday,
                    "birthLocation" : data.place_of_birth,
                    "aliases" : data.also_known_as, 
                })
            })
    }, [apiPerson, grabData])

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">
            <div className="mx-32 my-28 text-gray-400 flex-auto ">
                {Object.keys(dataTest).length !== 0 &&
                    <div className="flex space-x-10">

                        <div className="w-1/4 flex flex-col gap-5">
                            <img
                                src={actorDetails.profile_path 
                                    ? `https://image.tmdb.org/t/p/original${actorDetails.profile_path}`
                                    : "/default_profile.png"
                                }
                                className="object-cover rounded-lg"
                                alt="Actor" />

                            <ActorOther
                                info={dataTest} />
                        </div>

                        <div className="w-3/4 flex flex-col gap-10">
                            <h1 className="text-5xl text-white font-semibold"> 
                                {actorDetails.name}
                            </h1>

                            <Biography bio={actorDetails.biography} />
                            
                            <Cast 
                                title="Known For" 
                                cast={credits} 
                                people={false}/>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}