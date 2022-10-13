export default function Welcome(props) {
    return (
        <div className="my-16 text-center">
            <h1 className="text-5xl">Welcome back, </h1>
            <br />
            <span className="text-7xl text-white font-semibold drop-shadow-white">{props.user}</span>
        </div>
    )
}