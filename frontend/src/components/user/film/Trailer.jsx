import ReactPlayer from "react-player"

export default function Trailer(props) {
    return (
        <>
            {props.trailerKey && <div className="player-wrapper border-2 border-gray-500 my-10 mx-auto">
                {props.trailerKey}
                <ReactPlayer
                    url={`youtube.com/watch?v=${props.trailerKey}`}
                    controls={true}
                    volume={.05}
                    width="100%"
                    height="100%"
                    className="react-player" />
            </div>}
        </>
    )
}