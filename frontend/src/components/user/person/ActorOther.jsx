import moment from "moment"

export default function ActorOther(props) {
    return (
        <>
            {console.log(props.aliases)}
            <div className="flex-col space-y-4">
                <h1 className="text-2xl text-white font-semibold drop-shadow-white-text">Personal Info</h1>
                <div>
                    <h2 className="text-white">Known For</h2>
                    <p>{props.known}</p>
                </div>
                <div>
                    <h2 className="text-white">Gender</h2>
                    <p>{props.gender === 1 ? "Female" : "Male"}</p>
                </div>
                <div>
                    <h2 className="text-white">Birthday</h2>
                    <p>{props.birthDay} • ({moment().diff(moment(props.birthDay, "YYYY-MM-DD"), 'years')} years old)</p>
                </div>
                <div>
                    <h2 className="text-white">Place of Birth</h2>
                    <p>{props.birthLocation}</p>
                </div>
                <div>
                    <h2 className="text-white">Also Known As</h2>
                    <p>{props.aliases.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}</p>
                </div>
            </div>
        </>
    )
}