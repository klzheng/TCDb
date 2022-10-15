export default function Other(props) {
    return (
        <>
            {/* DIRECTOR */}
            <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">Director</p>
                <span className="text-lg">{props.director}</span>
            </div>

            {/* WRITERS */}
            <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">Writers</p>
                <div className="flex-col space-x-5 text-lg">
                    {props.writers.map((writer, index) => (
                        <span key={index} className="">{writer}</span>
                    ))}
                </div>
            </div>

            {/* RELEASE DATE */}
            <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">Release Date</p>
                <span className="text-lg">{props.releaseDate}</span>
            </div>

            {/* LANGUAGES */}
            <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">Languages</p>
                <div className="flex-col space-x-5">
                    {props.languages.map((language, index) => (
                        <span key={index} className="text-lg">{language}</span>
                    ))}
                </div>
            </div>
        </>
    )
}