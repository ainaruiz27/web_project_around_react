import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Card({ card, name, link, likes, handleClick, handleRemoveLike, handleAddLike, handleRemove }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const hasOwnerLike = likes.some(like => like._id === currentUser._id)

  const handleLike = () => {
    if (hasOwnerLike) {
      handleRemoveLike(card)
    } else {
      handleAddLike(card)
    }
  }

  return (
    <>
      <div className="card">
        {isOwn && <div onClick={() => { handleRemove(card) }} className="card__trash-icon"></div>}
        <div className="card__image-container">
          <img
            onClick={() => {
              handleClick(name, link)
            }}
            className="card__image" src={link} alt={name} />
        </div>
        <div className="card__description">
          <h3 className="card__text">{name}</h3>
          <button
            onClick={handleLike}
            className={`card__like ${hasOwnerLike ? 'card__like_active' : ''}`} id="like-button"></button>
          <span className="card__counter">{likes.length}</span>
        </div>
      </div>
    </>
  )
}