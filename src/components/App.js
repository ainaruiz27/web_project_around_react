import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Popup from './Popup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';

function App() {

  const [openModalProfile, setOpenModalProfile] = React.useState(false);
  const [openModalAddCard, setopenModalAddCard] = React.useState(false);
  const [openModalAvatar, setopenModalAvatar] = React.useState(false);
  const [openModalConfirmation, setopenModalConfirmation] = React.useState(false);
  const [openModalImage, setopenModalImage] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentuser, setcurrentuser] = React.useState({});

  const handleEditAvatarClick = () => {
    setopenModalAvatar(true)
  }

  const handleEditProfileClick = () => {
    setOpenModalProfile(true);
  }

  const handleAddPlaceClick = () => {
    setopenModalAddCard(true);
  }

  const handleImageClick = (name, link) => {
    setopenModalImage(true);
    setSelectedCard({
      name, link
    })
  }

  React.useEffect(() => {
    api.getCards().then(cards => {
      setCards(cards)
    })
    api.getUserInfo().then(user => {
      setcurrentuser(user);
    })
  }, [])

  return (
    <>
      <div className='page'>
        <Header />
        <Main
          handleEditProfileClick={handleEditProfileClick}
          handleEditAvatarClick={handleEditAvatarClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleImageClick={handleImageClick}
          cards={cards}
          user={currentuser}
        />
        <Footer />

        <PopupWithForm open={openModalProfile} title="Editar perfil" onClose={() => { setOpenModalProfile(false) }}>
          <>
            <input type="text" id="name" name="name" className="form__input"
              defaultValue="Jacques Costeau" required minLength="5" maxLength="40" />
            <span className="name-error error-message"></span>
            <input type="text" id="profession" name="about" className="form__input"
              defaultValue="Explorer" required minLength="5" maxLength="200" />
            <span className="profession-error error-message"></span>

          </>
        </PopupWithForm>

        <PopupWithForm open={openModalAddCard} title="Nuevo lugar" onClose={() => { setopenModalAddCard(false) }}>
          <>
            <input type="text" id="title" name="title" className="form__input "
              placeholder="Título" required minLength="5" maxLength="40" />
            <span className="title-error error-message"></span>
            <input type="url" id="link" name="link" className="form__input "
              placeholder="Enlace de la imagen" required />
            <span className="link-error error-message"></span>
          </>
        </PopupWithForm>

        <ImagePopup selectedCard={selectedCard} open={openModalImage} onClose={() => {setopenModalImage(false)}}/>

        <div id="confirmation-popup" className="popup overlay">
          <div className="form">
            <button type="button" className="popup__close-icon"></button>
            <h2 className="popup__title">¿Estás seguro/a?</h2>
            <button type="button" className="popup__confirm-button">Sí</button>
          </div>
        </div>

        <PopupWithForm open={openModalAvatar} title="Cambiar foto de perfil" onClose={() => { setopenModalAvatar(false) }}>
          <>
            <label htmlFor="new-avatar-link" className="form__label"></label>
            <input type="url" id="new-avatar-link" name="newAvatarLink" className="form__input"
              placeholder="Ingrese el nuevo enlace" required />
            <span className="new-avatar-link-error error-message"></span>
          </>
        </PopupWithForm>
      </div>
    </>
  );
}

export default App;
