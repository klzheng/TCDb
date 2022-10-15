export default function Overview(props) {
    return (
        <div>
            <p className="drop-shadow-white-text text-gray-200 text-2xl">Overview</p>
            <p>{props.details.overview}</p>
        </div>
    )
}