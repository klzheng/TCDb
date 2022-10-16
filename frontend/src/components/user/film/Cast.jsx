export default function Cast(props) {
    return (
        <div>
            <p className="text-2xl text-gray-200 drop-shadow-white-text">
                Cast
            </p>
            <div className="flex space-x-4 overflow-auto">
                {props.cast.map((person, index) => (
                    <div key={index} className="text-center mt-1 mb-4">
                        <img
                            src={ 
                                person.profile_path 
                                ? `https://image.tmdb.org/t/p/h632${person.profile_path}` 
                                : ("default_profile.png")}
                            alt="Cast Member"
                            className="w-40 h-60 object-cover rounded" />
                        <p className="font-bold text-gray-200 line-clamp-1 text-lg w-40">{person.character}</p>
                        <p className="line-clamp-1 max-w-40">{person.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}