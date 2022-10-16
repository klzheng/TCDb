

export default function ActorHeader(props) {
    return (
        <div className="flex space-x-10">
            <div className="w-1/3">
                <img
                    src={`https://image.tmdb.org/t/p/original${props.imgPath}`}
                    className="object-cover rounded-lg"
                    alt="Actor" />
            </div>
            <div className="w-2/3">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl text-white font-semibold">{props.name}</h1>

                    {props.bio &&
                        <Biography bio={props.bio} />
                    }
                </div>
            </div>
        </div>
    )
}

const Biography = (props) => {
    return (
        <div>
            <p className="text-xl drop-shadow-white-text text-gray-200 my-2">Biography</p>
            <div>
                {props.bio.split(/\r?\n/)
                    .map((item) => (
                        <p >{item}<br/></p>
                ))}
            </div>
        </div>
    )
}