import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { api } from '../utils/api';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Popup from './Popup';

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

  const handleImageRemove = (card) => {
    setSelectedCard(card);
    setopenModalConfirmation(true);
  }

  const handleRemoveCard = () => {
    api.deleteCard(selectedCard._id).then(() => {
      setCards(cards.filter(item => item._id !== selectedCard._id));
      setopenModalConfirmation(false);
    });
  }

  const handleImageAddLike = (card) => {
    return api.addLike(card._id).then(cardResponse => {
      card.likes = cardResponse.likes;
      setCards([...cards]);
    })
  }

  const handleImageRemoveLike = (card) => {
    return api.removeLike(card._id).then(cardResponse => {
      card.likes = cardResponse.likes;
      setCards([...cards]);
    })
  }

  const handleSubmitEditProfile = ({ name, about }) => {
    return api.updateUser({ about, name }).then(user => {
      setcurrentuser(user);
    }).then(() => { setOpenModalProfile(false) })
  }

  const handleSubmitAddCard = ({ title, link }) => {
    return api.addCard(link, title).then(card => {
      setCards([card, ...cards])
    }).then(() => { setopenModalAddCard(false) })
  }

  const handleSubmitAvatar = ({ newAvatarLink }) => {
    return api.updateUser({ avatar: newAvatarLink }).then((user) => {
      setcurrentuser(user);
    }).then(() => { setopenModalAvatar(false) })
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
      <CurrentUserContext.Provider value={currentuser}>
        <div className='page'>
          <Header />
          <Main
            handleEditProfileClick={handleEditProfileClick}
            handleEditAvatarClick={handleEditAvatarClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleImageClick={handleImageClick}
            handleImageRemoveLike={handleImageRemoveLike}
            handleImageAddLike={handleImageAddLike}
            handleImageRemove={handleImageRemove}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            handleSubmit={handleSubmitEditProfile}
            handleClose={() => { setOpenModalProfile(false) }} open={openModalProfile} />
          <AddPlacePopup
            handleSubmit={handleSubmitAddCard}
            handleClose={() => { setopenModalAddCard(false) }} open={openModalAddCard} />
          <EditAvatarPopup
            handleSubmit={handleSubmitAvatar}
            handleClose={() => { setopenModalAvatar(false) }} open={openModalAvatar} />
          <ImagePopup selectedCard={selectedCard} open={openModalImage} onClose={() => { setopenModalImage(false) }} />

          <Popup open={openModalConfirmation}>
            <div className="form">
              <button type="button" className="popup__close-icon" onClick={() => { setopenModalConfirmation(false) }}></button>
              <h2 className="popup__title">¿Estás seguro/a?</h2>
              <button type="button" className="popup__confirm-button" onClick={handleRemoveCard}>Sí</button>
            </div>
          </Popup>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
