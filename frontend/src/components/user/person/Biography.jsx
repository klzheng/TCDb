export default function Biography(props) {
    return (
        <>
            {props.bio &&
                <div>
                    <p className="text-xl text-gray-200 my-2">Biography</p>
                    <div>
                        {props.bio.split(/\r?\n/)
                            .map((item, index) => (
                                <p key={index}>{item}<br /></p>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}