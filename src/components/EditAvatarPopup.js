import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({ open, handleClose, handleSubmit }) {
    return ( //openModalAvatar   () => { setopenModalAvatar(false) }
        <PopupWithForm open={open} title="Cambiar foto de perfil" onClose={handleClose} handleSubmit={handleSubmit}>
            <>
                <label htmlFor="new-avatar-link" className="form__label"></label>
                <input type="url" id="new-avatar-link" name="newAvatarLink" className="form__input"
                    placeholder="Ingrese el nuevo enlace" required />
                <span className="new-avatar-link-error error-message"></span>
            </>
        </PopupWithForm>)
}