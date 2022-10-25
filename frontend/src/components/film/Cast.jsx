import { Link } from "react-router-dom";

export default function Cast(props) {
    return (
        <>
            {props.cast.length !== 0 &&
                <div>
                    <p className="text-2xl text-gray-200 drop-shadow-white-text">
                        {props.title}
                    </p>
                    <div className="flex space-x-4 overflow-auto">
                        {props.cast.map((person, index) => (
                            <div key={index} className={"text-center mt-1 mb-4 w-40" + (props.people ? " w-40 " : " w-32 ")}>

                                <Link to={props.people ? `/person/${person.id}` : ""}>
                                    <img
                                        src={
                                            (person.profile_path && `https://image.tmdb.org/t/p/h632${person.profile_path}`)
                                            || (person.poster_path && `https://image.tmdb.org/t/p/w342${person.poster_path}`)
                                            || (props.people ? "default_profile.png" : "default.jpg")
                                        }
                                        alt="Casting Pictures"
                                        className={"object-cover rounded" +
                                            (props.people ? " h-60 " : " h-48 ")} />
                                    <p
                                        className={"text-gray-200 pt-1 " +
                                            (props.people ? " font-bold text-lg w-40 " : " text-sm w-32 ")}>
                                        {props.people ? person.character : person.title}
                                    </p>
                                    <p className={"line-clamp-1 max-w-40"}>
                                        {props.people ? person.name : null}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>}
        </>
    )
}