export default function ModalContainer(props) {
    return (
        <div className="fixed top-0 left-0 w-full h-full  backdrop-blur-lg bg-black bg-opacity-75 flex justify-center items-center z-20">
            <div className={"bg-slate-600 w-192 flex rounded space-x-2 p-2 justify-between " + (props.enlarge ? " h-120 " : "  ")}>
                {props.children}
            </div>
        </div>
    )
}