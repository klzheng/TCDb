import ReactPlayer from "react-player"

export default function Trailer(props) {
    return (
        <div className="player-wrapper border-2 border-gray-500 my-10 mx-auto   ">
            <ReactPlayer url={`youtube.com/watch?v=${props.trailerKey}`} controls={true} width="100%" height="100%" className="react-player" />
        </div>
    )
}