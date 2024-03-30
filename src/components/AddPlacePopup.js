import PopupWithForm from "./PopupWithForm"
export default function AddPlacePopup({ open, handleClose, handleSubmit }) {
    return (
        <PopupWithForm open={open} title="Nuevo lugar" onClose={handleClose} handleSubmit={handleSubmit}>
            <>
                <input type="text" id="title" name="title" className="form__input "
                    placeholder="Título" required minLength="5" maxLength="40" />
                <span className="title-error error-message"></span>
                <input type="url" id="link" name="link" className="form__input "
                    placeholder="Enlace de la imagen" required />
                <span className="link-error error-message"></span>
            </>
        </PopupWithForm>

    )
}