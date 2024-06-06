export default function SortSelection(props) {
    const {sortItems, selected, selectedValue, sortValue, value} = props

    return (
        <div
            onClick={() => sortItems(selectedValue, sortValue)}
            className={"px-3 py-2 text-sm hover:text-gray-200 cursor-pointer" + (selected === selectedValue ? " text-white drop-shadow-white-text " : " ")}
        >
            {value}
        </div>
    )
}