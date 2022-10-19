export default function ActorImage(props) {
    return (
        <img
            src={props.imgPath
                ? `https://image.tmdb.org/t/p/original${props.imgPath}`
                : "/default_profile.png"
            }
            className="object-cover rounded-lg"
            alt="Actor" />
    )
}