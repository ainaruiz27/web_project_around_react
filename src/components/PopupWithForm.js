import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({ children, open, title, onClose, handleSubmit }) {

  const formRef = React.useRef();

  const [submitContent, setSubmitContent] = React.useState('Guardar');

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
    setSubmitContent('Guardando...');
    handleSubmit(getInputValues()).finally(() => { setSubmitContent('Guardar') })
  })

  return (
    <>
      <Popup open={open}>
        <form ref={formRef} className="form  " noValidate onSubmit={handlePrepareSubmit}>
          <button className="popup__close-icon"
            onClick={onClose}
            type="button"></button>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__button" type="submit">{submitContent}</button>
        </form>
      </Popup>
    </>
  )
}