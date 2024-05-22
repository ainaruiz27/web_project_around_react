import { Link } from "react-router-dom";
import React from "react";

export default function Login({ handleSubmit }) {

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
                <h1 className="form__login-title">Inicia Sesión</h1>
                <fieldset className="form__set">
                    <label>
                        <input name="email" placeholder="Correo electrónico" className="form__login-input" />
                    </label>
                    <label>
                        <input type="password" name="password" placeholder="Contraseña" className="form__login-password" />
                    </label>
                </fieldset>
                <fieldset className="form__set">
                    <button type="submit" className="form__login-button">Inicia sesión</button>
                    <Link to={'/register'} >¿Aún no eres miembro? Regístrate aquí</Link>
                </fieldset>
            </form>
        </>
    )
}

