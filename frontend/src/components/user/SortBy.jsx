import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect, useRef } from 'react';
import SortSelection from "./SortSelection";

export default function SortBy(props) {
    let {onSort, onChangeSortOrder, sortValue, selected, numItems} = props
    const [openMenu, setOpenMenu] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    if (selected === "movieRelease") {
        selected = "Release Date";
    } else if (selected === "movieName") {
        selected = "Title";
    } else {
        selected = "Rating";
    }

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex items-center space-x-1">
                <button 
                    type="button" 
                    className="text-gray-400" 
                    id="menu-button" 
                    aria-expanded="true" 
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    Sort By: <span className="text-white">{selected}</span>
                </button>
                {sortValue === -1
                    ? <IoIosArrowDown
                        className="text-white drop-shadow-white-text cursor-pointer"
                        onClick={() => onChangeSortOrder()} />
                    : <IoIosArrowUp
                        className="text-white drop-shadow-white-text cursor-pointer"
                        onClick={() => onChangeSortOrder()} />}
                <span className="text-gray-400">({numItems})</span>
            </div>
            {openMenu && (
                <div 
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-primary shadow-lg ring-1 ring-gray-600 focus:outline-none border border-gray-600" 
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="menu-button" 
                    tabIndex="-1"
                >
                    <div role="none">
                        <SortSelection 
                            sortItems={onSort}
                            selected={selected}
                            selectedValue="rating"
                            sortValue={sortValue}
                            value="Rating"
                        />
                    </div>
                    <div role="none">
                        <SortSelection
                            sortItems={onSort}
                            selected={selected}
                            selectedValue="movieName"
                            sortValue={sortValue}
                            value="Title" 
                        />
                    </div>
                    <div role="none">
                        <SortSelection
                            sortItems={onSort}
                            selected={selected}
                            selectedValue="movieRelease"
                            sortValue={sortValue}
                            value="Release Date" 
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
