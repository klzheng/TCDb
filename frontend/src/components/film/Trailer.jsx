import ReactPlayer from "react-player"

export default function Trailer(props) {
    return (
        <>
            {props.trailerKey && 
            <div className="player-wrapper mt-10 mx-auto  ">
                <ReactPlayer
                    url={`youtube.com/watch?v=${props.trailerKey}`}
                    controls={true}
                    volume={.05}
                    width="80%"
                    height="80%"
                    className="react-player md:w-max-content" />
            </div>}
        </>
    )
}