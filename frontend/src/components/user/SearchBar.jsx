import { useRef, useState, useEffect, useCallback } from "react";

const SearchBar = ({ onSearch, inactiveElement }) => {
    const inputRef = useRef(null);
    const [searchInputValue, setSearchInputValue] = useState("")
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchInputValue(query);
        onSearch(query);
    };

    const handleClearSearch = () => {
        setSearchInputValue('');
    }

    const handleSearchActivation = useCallback((event) => {
        const hasQuery = searchInputValue !== "";
        const isValidChar = event.key.match(/^[a-zA-Z0-9]$/);
        const isDeleteKey = event.key === "Backspace" || event.key === "Delete";
        const isModifierKey = event.metaKey || event.ctrlKey || event.shiftKey;
        const isFocusable = document.activeElement === document.body;
        const shouldActivateSearchBar = (isValidChar || isDeleteKey) && !isModifierKey && (hasQuery || isValidChar);

        if (isFocusable && shouldActivateSearchBar) {
            setIsSearchActive(true);
            inputRef?.current?.focus();  
        } 
    }, [searchInputValue]);

    useEffect(() => {
        if (searchInputValue === "") {
            setIsSearchActive(false);
        }
    }, [searchInputValue]);

    useEffect(() => {
        if (isSearchActive) {
            inputRef.current.focus();
        }
    }, [isSearchActive]);

    useEffect(() => {
        document.addEventListener("keydown", handleSearchActivation);
        return () => {
            document.removeEventListener("keydown", handleSearchActivation);
        };
    }, [handleSearchActivation]);

    return (
        <div className="relative">
            {isSearchActive 
                ? <input
                    ref={inputRef}
                    type="text"
                    value={searchInputValue}
                    onChange={handleSearch}
                    className="w-30 h-8 rounded-lg bg-gray-600 outline-none focus:bg-gray-300 focus:text-gray-600 pl-8 pr-8 py-1" 
                    />
                : inactiveElement}
            {isSearchActive && (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-2" // adjust size
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer" // adjust size
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={handleClearSearch}
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </>
            )}
        </div>
    );
};

export default SearchBar;