export default function Background({children}) {
    return (
        <div 
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity:0}} 
            transition={{duration: .5, delay:.3}}
            className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-y-scroll scrollbar-default overflow-x-hidden"
        >
            {children}
        </div>
    )
}