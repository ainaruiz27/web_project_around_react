import { Link } from "react-router-dom";
import React from 'react';


export default function Register({ handleSubmit }) {

    const formRef = React.useRef();

    const getInputValues = () => {
        const inputValues = {};
        const inputList = Array.from(formRef.current.querySelectorAll('input'))
        inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    const handlePrepareSubmit = (event => {
        event.preventDefault();
        handleSubmit(getInputValues()).finally(() => { })
    })

    return (
        <>
            <form onSubmit={handlePrepareSubmit} ref={formRef} className="form__login">
                <h1 className="form__login-title">Regístrate</h1>
                <fieldset>
                    <label>
                        <input name="email" placeholder="Correo electrónico" className="form__login-input" />
                    </label>
                    <label>
                        <input type="password" name="password" placeholder="Contraseña" className="form__login-password" />
                    </label>
                </fieldset>
                <fieldset>
                    <button type="submit" className="form__login-button">Regístrate</button>
                    <Link to={'/login'}>¿Ya eres miembro? Inicia sesión aquí</Link>
                </fieldset>
            </form>
        </>
    )
}
