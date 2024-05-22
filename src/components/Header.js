import logo from '../images/Vector.png';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Header({ onLogout }) {

  const user = React.useContext(CurrentUserContext);

  return (
    <>
      <div className="header">
        <header className="header__logo">
          <img className="header__image " src={logo} alt="logo" />
          {user && user._id && <a onClick={onLogout} className='header__logout'>Cerrar sesión</a>}
        </header>
      </div>
    </>
  )
}