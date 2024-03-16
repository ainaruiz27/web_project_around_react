import Popup from "./Popup";

export default function PopupWithForm({children, open, title, onClose}) {
    return (
        <>
        <Popup open={open}>
        <form className="form  " noValidate>
                <button className="popup__close-icon"   
                onClick={onClose}             
                type="button"></button>
                <h2 className="form__title">{title}</h2>
                {children}
                <button className="form__button"  type="submit">Guardar</button>
            </form>
        </Popup>
        </>
    )
}