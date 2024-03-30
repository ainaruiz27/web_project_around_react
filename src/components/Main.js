import editIcon from '../images/Vector1.png';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function Main({ handleAddPlaceClick,
  handleEditProfileClick,
  handleEditAvatarClick,
  handleImageClick,
  handleImageRemove,
  handleImageAddLike,
  handleImageRemoveLike,
  cards }) {

  const user = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container" onClick={handleEditAvatarClick}>
          <img className="profile__avatar " src={user.avatar} alt="Avatar" />
          <div className="profile__overlay">
            <img className="profile__overlay-button" src={editIcon} alt="Botón" />
          </div>
        </div>
        <div className="profile__info-div">
          <div className="profile__info">
            <h2 className="profile__info-name">
              {user.name}
            </h2>
            <button onClick={handleEditProfileClick} className="profile__info-editbutton"></button>
          </div>

          <h3 className="profile__info-work">
            {user.about}
          </h3>
        </div>
        <button className="profile__addbutton" onClick={handleAddPlaceClick}></button>
      </section>
      <div className="elements">
        {
          cards.map((item, index) => {
            return <Card
              key={index}
              handleClick={handleImageClick}
              handleAddLike={handleImageAddLike}
              handleRemoveLike={handleImageRemoveLike}
              handleRemove={handleImageRemove}
              card={item}
              name={item.name}
              likes={item.likes}
              link={item.link} />
          })
        }
      </div>
    </>
  )
}