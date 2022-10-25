export default function SectionHeader(props) {
    return (
        <h1 className=" font-semibold my-5 2xs:text-xl xs:text-2xl sm:text-3xl 2xs:text-center sm:text-left">
            {props.value}
        </h1>
    )
}