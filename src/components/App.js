import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Popup from './Popup';
import FormValidator from './FormValidator';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [openModalProfile, setOpenModalProfile] = React.useState(false);
  const [openModalAddCard, setopenModalAddCard] = React.useState(false);
  const [openModalAvatar, setopenModalAvatar] = React.useState(false);
  const [openModalConfirmation, setopenModalConfirmation] = React.useState(false);
  const [openModalImage, setopenModalImage] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentuser, setcurrentuser] = React.useState({});

  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [tootltipMessage, setTootltipMessage] = React.useState('');
  const [tooltipType, setTooltipType] = React.useState('success');

  const history = useHistory();

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
    const token = localStorage.getItem('token');
    if (token) {
      getUserInfo(token);
    }

    /*
    api.getCards().then(cards => {
      setCards(cards)
    })
    api.getUserInfo().then(user => {
      setcurrentuser(user);
    })*/
  }, [])

  const handleLogin = ({ email, password }) => {
    return auth.login(email, password).then(({ token, message }) => {
      if (!!token) {
        localStorage.setItem('token', token);
        getUserInfo();
      } else {
        setOpenTooltip(true);
        setTootltipMessage(message);
        setTooltipType('error');
      }

    }).catch(error => {
      console.error(error)
    });
  }

  const handleRegister = ({ email, password }) => {
    return auth.register(email, password).then(({ error }) => {
      if (!!error) {
        setTootltipMessage(error);
        setTooltipType('error');
      } else {
        setTootltipMessage('Registrado con éxito, ahora puedes iniciar sesión');
        setTooltipType('success');
        history.push('/login');
      }
      setOpenTooltip(true);
    }).catch(error => {
      console.error(error)
    });
  }

  const getUserInfo = (token) => {
    auth.me(token).then(user => {
      history.push('/home');
      api.getCards().then(cards => {
        setCards(cards)
      })
      api.getUserInfo().then(user => {
        setcurrentuser(user);
      })
    })
  }

  const onLogout = () => {
    localStorage.clear();
    setcurrentuser({});
    history.push('/login')
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentuser}>
        <div className='page'>
          <Header onLogout={onLogout} />
          <Switch>
            <Route path="/login">
              <Login handleSubmit={handleLogin} />
            </Route>
            <ProtectedRoute path="/home" loggedIn={currentuser && !!currentuser._id}>
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
            </ProtectedRoute>
            <Route path="/register">
              <Register handleSubmit={handleRegister} />
            </Route>
          </Switch>
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

          <InfoTooltip open={openTooltip}
            onClose={() => { setOpenTooltip(false) }}
            message={tootltipMessage} type={tooltipType} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
