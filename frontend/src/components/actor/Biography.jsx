import { useState } from "react"
import { HiArrowDown, HiArrowUp } from "react-icons/hi"

export default function Biography(props) {

    const [readMore, setReadMore] = useState(false)

    const toggleMore = () => {
        setReadMore(prevState => !prevState)
    }

    return (
        <>
            {props.bio &&
                <div>
                    <p className="text-xl text-gray-200 my-2">Biography</p>
                    <div>
                        {readMore
                            ? props.bio.split(/\r?\n/)
                                .map((item, index) => (
                                    <p key={index}>
                                        {item}
                                        <br />
                                    </p>
                                ))
                            : props.bio.split(/\r?\n/)[0] 
                            }
                            
                        {props.bio.split(/\r?\n/).length > 1 && 
                        <button 
                            onClick={toggleMore} 
                            className=" rounded text-gray-200 flex items-center mx-auto mt-4 px-1 bg-gray-700"
                        >
                            {readMore ? "Read Less" : "Read More"}
                            {readMore 
                                ? <HiArrowUp className="ml-1"/> 
                                : <HiArrowDown className="ml-1"/>  }   
                        </button>}
                    </div>
                </div>
            }
        </>
    )
}