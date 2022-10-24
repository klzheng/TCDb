import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SortSelection from "./SortSelection";

export default function SortBy(props) {

    const {sortValue, changeSort, selected, sortItems} = props

    return (
        <nav className="flex justify-end items-center pb-10 space-x-2 ">
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
    )
}