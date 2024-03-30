import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ open, handleClose, handleSubmit }) {
    const currentuser = React.useContext(CurrentUserContext);
    return (
        <PopupWithForm open={open} title="Editar perfil" onClose={handleClose} handleSubmit={handleSubmit}>
            <>
                <input type="text" id="name" name="name" className="form__input"
                    defaultValue={currentuser.name} required minLength="5" maxLength="40" />
                <span className="name-error error-message"></span>
                <input type="text" id="profession" name="about" className="form__input"
                    defaultValue={currentuser.about} required minLength="5" maxLength="200" />
                <span className="profession-error error-message"></span>

            </>
        </PopupWithForm>)
}