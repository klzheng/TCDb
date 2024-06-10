export default function Container({children}) {
    return (
        <div className="text-gray-400 flex-auto m-10 pb-6">
            {children}
        </div>
    )
}