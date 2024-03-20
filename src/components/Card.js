export default function Card({ name, link, likes, handleClick }) {
  return (
    <>
      <div className="card">
        <div className="card__trash-icon"></div>
        <div className="card__image-container">
          <img
            onClick={() => {
              handleClick(name, link)
            }}
            className="card__image" src={link} alt={name} />
        </div>
        <div className="card__description">
          <h3 className="card__text">{name}</h3>
          <button className="card__like" id="like-button"></button>
          <span className="card__counter">{likes.length}</span>
        </div>
      </div>
    </>
  )
}