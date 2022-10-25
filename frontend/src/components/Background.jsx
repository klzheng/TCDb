export default function Background({children}) {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-bg-start to-black -z-10 overflow-y-auto overflow-x-hidden">
            {children}
        </div>
    )
}