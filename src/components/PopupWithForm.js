import React from "react";
import Popup from "./Popup";
import FormValidator from "./FormValidator";

const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__input_type_error",
  errorClass: "error-message",
  submitButtonState: {
    disabledClass: "your-submit-button-disabled-class",
  },
};

export default function PopupWithForm({ children, open, title, onClose, handleSubmit }) {

  const formRef = React.useRef();

  const [submitContent, setSubmitContent] = React.useState('Guardar');

  React.useEffect(() => {
    const formValidator = new FormValidator(formConfig, formRef.current);
    formValidator.enableValidation();
  }, [])

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
          <button disabled className="form__button" type="submit">{submitContent}</button>
        </form>
      </Popup>
    </>
  )
}