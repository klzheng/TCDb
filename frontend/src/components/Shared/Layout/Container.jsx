export default function Container({children}) {
    return (
        <div className="flex justify-center">
            <div className="text-gray-400 flex-auto max-w-4xl mx-4 py-6">
                {children}
            </div>
        </div>
    )
}