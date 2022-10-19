export default function Container({children}) {
    return (
        <div className="mx-32 my-16 text-gray-400 flex-auto">
            {children}
        </div>
    )
}