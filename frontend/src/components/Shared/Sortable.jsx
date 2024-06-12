import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect, useRef } from 'react';

const Sortable = (props) => {
    let { onSort, sortOptions, data, dataCount } = props
    const menuRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [sortValue, setSortValue] = useState(sortOptions[0].value);
    const [sortOrder, setSortOrder] = useState(-1);
    
    const handleSortOrder = () => {
        setSortOrder(sortOrder * -1);
    };

    const handleCloseMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleCloseMenu);
        return () => {
            document.removeEventListener("mousedown", handleCloseMenu);
        };
    }, [menuRef]);

    useEffect(() => {
        const sortedData = [...data];
        sortedData.sort((a, b) => {
            const valA = a[sortValue];
            const valB = b[sortValue];
    
            if (!isNaN(new Date(valA)) && !isNaN(new Date(valB))) { // date
                return (new Date(valA) - new Date(valB)) * sortOrder;
            } else if (typeof valA === 'string' && typeof valB === 'string') { // string
                return valA.localeCompare(valB) * sortOrder;
            } else if (typeof aVavalAlue === 'number' && typeof valB === 'number') { // number
                return (valA - valB) * sortOrder;
            } else {
                return 0;
            }
        });
    
        if (JSON.stringify(sortedData) !== JSON.stringify(data)) {
            onSort(sortedData);
        }
    }, [sortValue, sortOrder, data, onSort]);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div className="flex items-center space-x-1">
                <button 
                    type="button" 
                    id="menu-button" 
                    className="text-gray-400" 
                    aria-expanded="true" 
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    Sort By: <span className="text-white">{sortOptions.find(option => option.value === sortValue).label}</span>
                </button>
                {sortOrder === -1
                    ? <IoIosArrowDown
                        className="text-white drop-shadow-white-text cursor-pointer"
                        onClick={() => handleSortOrder()} />
                    : <IoIosArrowUp
                        className="text-white drop-shadow-white-text cursor-pointer"
                        onClick={() => handleSortOrder()} />}
                <span className="text-gray-400">({dataCount})</span>
            </div>
            {openMenu && (
                <div 
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-primary shadow-lg ring-1 ring-gray-600 focus:outline-none border border-gray-600" 
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="menu-button" 
                    tabIndex="-1"
                >
                    {sortOptions.map((option) => (
                        <div 
                            role="none"
                            key={option.value}
                            onClick={() => setSortValue(option.value)}
                        >
                            <div className={"px-3 py-2 text-sm hover:text-gray-200 cursor-pointer" + (sortValue === option.value ? " text-white drop-shadow-white-text " : " ")}>
                                {option.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Sortable;
