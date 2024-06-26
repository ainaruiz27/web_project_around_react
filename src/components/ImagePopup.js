import Popup from "./Popup";

export default function ImagePopup({ open, onClose, selectedCard }) {
  return (
    <>
      <Popup open={open}>
        <div className="popup__image-container">
          <img className="_image"
            src={selectedCard.link}
            alt={selectedCard.name} />
          <button
            onClick={onClose}
            className="popup__close-icon " id="close-image" type="button"></button>
          <h3 className="popup__image-title">{selectedCard.name}</h3>
        </div>
      </Popup>
    </>
  )
}