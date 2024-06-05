import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SortSelection from "./SortSelection";

export default function SortBy(props) {
    const {sortValue, changeSort, selected, sortItems} = props

    return (
        <nav className="flex justify-end items-center space-x-2">
            {sortValue === -1
                ? <IoIosArrowDown
                    className="text-white drop-shadow-white-text"
                    onClick={() => changeSort()} />
                : <IoIosArrowUp
                    className="text-white drop-shadow-white-text"
                    onClick={() => changeSort()} />}
            <SortSelection 
                sortItems={sortItems}
                selected={selected}
                selectedValue="rating"
                sortValue={sortValue}
                value="RATING"
            />
            <SortSelection
                sortItems={sortItems}
                selected={selected}
                selectedValue="movieName"
                sortValue={sortValue}
                value="TITLE" 
            />
            <SortSelection
                sortItems={sortItems}
                selected={selected}
                selectedValue="movieRelease"
                sortValue={sortValue}
                value="RELEASE DATE" 
            />
            <p>
                ({props.numItems})
            </p>
        </nav>
    )
}