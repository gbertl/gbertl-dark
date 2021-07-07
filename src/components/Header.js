import {Link} from "react-router-dom";
import {toggleOverlayEffect} from "./overlayEffect";
import {toggleNavbar} from "./helper";

const Header = () => {
  const handleToggler = () => {
    toggleNavbar();
    toggleOverlayEffect();
  };

  return (
    <header className="header">
      <div className="container flex justify-end">
        <button className="navbar-toggler mr-15" onClick={handleToggler}>
          <span className="navbar-toggler__icon"></span>
        </button>

        <nav className="navbar center">
          <ul className="text-center">
            <li>
              <Link to="/" className="navbar__link text-bold">
                About
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="navbar__link text-bold">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="navbar__link text-bold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
