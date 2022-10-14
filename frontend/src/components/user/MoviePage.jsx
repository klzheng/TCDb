import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"


export default function MoviePage() {

    const [pageDetails, setPageDetails] = useState([])

    const res = useParams()
    // console.log(res)



    const grabData = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.results.filter((item) => item.type === "Trailer"))
        setPageDetails(data)
    }

    useEffect(() => {
        // grabData(`https://api.themoviedb.org/3/${res.mediaType}/${res.id}?api_key=5b7ff1ca08f2367f1d77090c6730231d&append_to_response=videos`)
        grabData(`https://api.themoviedb.org/3/${res.mediaType}/${res.id}/videos?api_key=5b7ff1ca08f2367f1d77090c6730231d`)
    }, [res.id, res.mediaType])



    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-auto">
            <div className="mx-32 my-28 text-gray-400 flex-auto ">
                <div>
                    {/* {pageDetails.name} */}
                    {/* {pageDetails} */}
                </div>
            </div>
        </div>
    )
}