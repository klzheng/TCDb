
export default function PosterBackground(props) {
    return (
        <>
            {props.imgPath &&
                <img
                    src={`https://image.tmdb.org/t/p/original${props.imgPath}`}
                    alt="Poster Background"
                    className="backdrop-image my-16 min-w-full" />
            }
        </>
    )
}