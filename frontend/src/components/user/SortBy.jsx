import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SortSelection from "./SortSelection";

export default function SortBy(props) {

    const {sortValue, changeSort, selected, sortItems, header} = props

    return (
        <div className="flex justify-between">
            <h2 className="text-4xl text-gray-300 drop-shadow-white-text pb-8">
                {header}
            </h2>

            <nav className="flex justify-end items-center space-x-2 pb-5">

            {sortValue === -1
                ? <IoIosArrowDown
                    className="text-white drop-shadow-white-text text-lg"
                    onClick={() => changeSort()} />
                : <IoIosArrowUp
                    className="text-white drop-shadow-white-text text-lg"
                    onClick={() => changeSort()} />}
            <SortSelection 
                sortItems={sortItems}
                selected={selected}
                selectedValue="rating"
                sortValue={-1}
                value="RATING"/>
            <SortSelection
                sortItems={sortItems}
                selected={selected}
                selectedValue="movieName"
                sortValue={1}
                value="TITLE" />
            <SortSelection
                sortItems={sortItems}
                selected={selected}
                selectedValue="movieRelease"
                sortValue={-1}
                value="RELEASE DATE" />
                </nav>
        </div>
    )
}