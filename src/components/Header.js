import { Link, useLocation } from 'react-router-dom';
import { closeOverlayEffect, openOverlayEffect } from './overlayEffect';
import {
  closeNavbar,
  hideBodyScroll,
  openNavbar,
  showBodyScroll,
} from './helper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeIsNav, toggleIsNav } from '../store/actions';

const Header = (props) => {
  const location = useLocation();
  const isNavOpen = useSelector((state) => state.isNavOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isNavOpen) {
      openNavbar();
      hideBodyScroll();
    } else {
      closeNavbar();
      showBodyScroll();
    }

    if (props.isOverlayActive) {
      openOverlayEffect();
      hideBodyScroll();
    } else {
      closeOverlayEffect();
      showBodyScroll();
    }
  }, [isNavOpen, props.isOverlayActive]);

  const handleToggler = () => {
    dispatch(toggleIsNav());
    props.setIsOverlayActive(!props.isOverlayActive);
  };

  const handleNavLink = (e) => {
    if (location.pathname === e.target.getAttribute('href')) {
      closeNavbar();
      closeOverlayEffect();
      dispatch(closeIsNav());
      props.setIsOverlayActive(false);
    }
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
              <Link
                to="/"
                className="navbar__link text-bold"
                onClick={handleNavLink}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="navbar__link text-bold"
                onClick={handleNavLink}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="navbar__link text-bold"
                onClick={handleNavLink}
              >
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
