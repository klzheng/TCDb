export default function ModalContainer(props) {
    return (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-black bg-opacity-75 flex justify-center items-center z-20">
            <div className={"bg-slate-600 2xs:w-min xs:w-192 flex rounded space-x-2 px-2 2xs:justify-center mx-10 relative xs:py-2 " + (props.enlarge ? " h-120 " : "  ")}>
                {props.children}
            </div>
        </div>
    )
}