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
                            src={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
                            alt="Cast Member"
                            className="max-w-xs h-60 object-cover rounded" />
                        <p className="font-bold text-gray-200 line-clamp-1 text-lg">{person.character}</p>
                        <p className="line-clamp-1">{person.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}