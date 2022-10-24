export default function SortSelection(props) {

    const {sortItems, selected, selectedValue, sortValue, value} = props

    return (
        <span
            onClick={() => sortItems(selectedValue, sortValue)}
            className={"hover:text-gray-200" + (selected === selectedValue ? " text-white drop-shadow-white-text " : " ")}
    >
        {value}
    </span>
    )
}