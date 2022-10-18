import moment from "moment"

export default function ActorOther(props) {

    const { known, gender, birthDay, birthLocation, aliases } = props.info

    return (
        <>
            {/* {console.log(Object.keys(props.info))} */}
            <div className="flex-col space-y-4">
                <h1 className="text-2xl text-white font-semibold drop-shadow-white-text">Personal Info</h1>

                {known &&
                    <div>
                        <h2 className="text-white">Known For</h2>
                        <p>{known}</p>
                    </div>
                }

                {gender !== 0 &&
                    <div>
                        <h2 className="text-white">Gender</h2>
                        <p>{gender === 1 ? "Female" : "Male"}</p>
                    </div>
                }

                {birthDay &&
                    <div>
                        <h2 className="text-white">Birthday</h2>
                        <p>{birthDay} • ({moment().diff(moment(birthDay, "YYYY-MM-DD"), 'years')} years old)</p>
                    </div>
                }

                {birthLocation &&
                    <div>
                        <h2 className="text-white">Place of Birth</h2>
                        <p>{birthLocation}</p>
                    </div>
                }

                {aliases.length !== 0 &&
                    <div>
                        <h2 className="text-white">Also Known As</h2>
                        <div>
                            {aliases.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}