export default function Container({children}) {
    return (
        <div className="xl:mx-32 text-gray-400 flex-auto md:px-0 md:mx-12 sm:mx-6 2xs:mx-4 sm:my-10 lg:my-16 pb-6">
            {children}
        </div>
    )
}