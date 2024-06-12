export default function Welcome(props) {
    return (
        <div className="my-16 text-center">
            <h1 className="md:text-5xl 2xs:text-3xl">Welcome back, </h1>
            <br />
            <span className="md:text-7xl 2xs:text-5xl text-white font-semibold drop-shadow-white">{props.user}</span>
        </div>
    )
}