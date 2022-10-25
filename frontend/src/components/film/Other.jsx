export default function Other(props) {
    return (
        <>
            {/* DIRECTOR */}
            {props.director.length !== 0 && <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">
                    Director
                </p>
                <span className="text-lg">{props.director}</span>
            </div>}

            {/* WRITERS */}
            {props.writers.length !== 0 && <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">
                    Writers
                </p>
                <div className="flex-col text-lg">
                    {props.writers.map((writer, index, array) => (
                        index !== array.length - 1
                            ? <span key={index}>{writer}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</span>
                            : <span key={index}>{writer}</span>
                    ))}
                </div>
            </div>}

            {/* RELEASE DATE */}
            {props.releaseDate && <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl">
                    Release Date
                </p>
                <span className="text-lg">{props.releaseDate}</span>
            </div>}

            {/* LANGUAGES */}
            {props.languages.length !== 0 && <div>
                <p className="drop-shadow-white-text text-gray-200 text-2xl ">
                    Languages
                </p>
                <div className="flex-col text-lg">
                    {props.languages.map((language, index, array) => (
                        index !== array.length - 1
                            ? <span key={index}>{language}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</span>
                            : <span key={index}>{language}</span>
                    ))}
                </div>
            </div>}
        </>
    )
}