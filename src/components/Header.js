import logo from '../images/Vector.png';

export default function Header() {

  return (
    <>
      <div className="header">
        <header className="header__logo">
          <img className="header__image " src={logo} alt="logo" />
        </header>
      </div>
    </>
  )
}