/*import React from 'react';
import Popup from './Popup';
import successImage from '../images/verificacion.jpg';
import errorImage from '../images/error.jpg';

export default function InfoTooltip({ open, message, type, onClose }) {
    const successMessage = "¡Correcto! Ya estás registrado.";
    const errorMessage = "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

    return (
        <Popup open={open}>
            <div className='popop__content'>
            <button className="popup__close-icon"
            onClick={onClose}
            type="button"></button>
                {type === 'success' ? (
                    <>
                        <img src={successImage} alt="Éxito" />
                        <p>{message}</p>
                    </>
                ) : (
                    <>
                        <img src={errorImage} alt="Error" />
                        <p>{message}</p>
                    </>
                )}
            </div>
        </Popup>
    );
}*/
import React from 'react';
import Popup from './Popup';
import successImage from '../images/verificacion.jpg';
import errorImage from '../images/error.jpg';

export default function InfoTooltip({ open, message, type, onClose }) {
    const successMessage = "¡Correcto! Ya estás registrado.";
    const errorMessage = "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

    return (
        <Popup open={open}>
            <div className='popup__content-login'> {/* Corregir 'popop__content' a 'popup__content' */}
                <button className="popup__close-icon" onClick={onClose} type="button"></button>
                {type === 'success' ? (
                    <>
                        <img src={successImage} alt="Éxito" />
                        <p>{successMessage}</p> {/* Utiliza successMessage */}
                    </>
                ) : (
                    <>
                        <img src={errorImage} alt="Error" />
                        <p>{errorMessage}</p> {/* Utiliza errorMessage */}
                    </>
                )}
            </div>
        </Popup>
    );
}
