import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SortSelection from "./SortSelection";

export default function SortBy(props) {

    const {sortValue, changeSort, selected, sortItems, header} = props

    return (
        <div className="flex 2xs:justify-center 2xs:mt-20 sm:justify-between sm:mt-0">
            <h2 className="text-4xl text-gray-300 drop-shadow-white-text 2xs:absolute 2xs:top-24 2xs:left-1/2 2xs:-translate-x-1/2 2xs:pb-0  sm:static sm:top-0 sm:left-0 sm:translate-x-0 sm:pb-6 2xs:w-40 ">
                {header}
            </h2>

            <nav className="flex justify-end items-center space-x-2 2xs:pb-6 sm:pb-4 transition-all ">

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
            <p>({props.numItems})</p>
                </nav>
        </div>
    )
}