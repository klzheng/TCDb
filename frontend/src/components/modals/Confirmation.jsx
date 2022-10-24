export default function Confirmation(props) {

    const {confirmState, rightAction, rightLabel, leftAction, leftLabel, title, prompt} = props

    return (
        <>
        {confirmState &&
            <div className="fixed w-full z-50 h-full left-0 top-0 backdrop-blur-sm backdrop-brightness-50">
                <div 
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg bg-gray-700  text-gray-300 flex flex-col items-center p-2 pb-5 w-80 h-44 border-4 border-gray-400 drop-shadow-xl">
                    <h1 className="text-2xl font-semibold ">
                        {title}
                    </h1>
                    <p className="px-4 my-3 mt-5 text-center text-base">
                        {prompt}
                    </p>
                    <div className="flex flex-row space-x-5 my-1 text-base">
                        <button 
                            onClick={leftAction}
                            className="bg-red-500 text-white py-0.5 px-4 rounded-sm text-base font-semibold hover:bg-red-600 transition">{leftLabel}</button>
                        <button 
                            onClick={rightAction}
                            className="bg-green-600 text-white py-0.5 px-4 rounded-sm text-base font-semibold hover:bg-green-700 transition">{rightLabel}</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}