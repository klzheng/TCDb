export default function Cast(props) {
    return (
        <div>
            <p className="text-2xl text-gray-200 drop-shadow-white-text">
                {props.title}
            </p>
            <div className="flex space-x-4 overflow-auto">
                {props.cast.map((person, index) => (
                    <div key={index} className="text-center mt-1 mb-4 w-40">

                        <img
                            src={
                                (person.profile_path && `https://image.tmdb.org/t/p/h632${person.profile_path}`) 
                                || (person.poster_path && `https://image.tmdb.org/t/p/h632${person.poster_path}`) 
                                || ("default_profile.png")
                            }
                            alt="Casting Pictures"
                            className="object-cover rounded" />
                        <p 
                            className={"text-gray-200 pt-1 " + (person.name ? " font-bold text-lg w-40 " : " text-sm w-32 ")}>
                            {person.title || person.character }
                        </p>
                        <p className={"line-clamp-1 max-w-40"}>
                            {person.name}
                        </p>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}