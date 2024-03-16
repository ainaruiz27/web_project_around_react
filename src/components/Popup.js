export default function Popup({children, open}) {
    return (
        <>
        <div className={`popup overlay ${open ? 'visible' : ''}`}>
            {children}
        </div>
        </>
    )
}