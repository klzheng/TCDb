export default function SearchBar() {

    const resetForm = () => {}

    return (
        <>
            <form onSubmit={resetForm} /*{action="./search.html" method="POST"}*/ target="_self" className="text-center my-10">
                <input 
                    id="main-search" 
                    type="text" 
                    placeholder="Search for something specific" 
                    className="w-9/12 h-10 rounded-full border-none px-4 text-xl bg-gray-300 outline-none" />
                <button type="submit" className="p-1 mx-2 rounded-full border-none w-10 h-10 bg-gray-300 text-black">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </>
    )
}
