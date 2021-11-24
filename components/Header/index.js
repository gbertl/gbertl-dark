import { useRouter } from 'next/router';
import Link from 'next/link';
import { hideBodyScroll, showBodyScroll } from '../../utils';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeNav,
  toggleNav,
  hideOverlay,
  toggleOverlay,
} from '../../store/actions/ui';

const Header = () => {
  const router = useRouter();
  const isNavOpen = useSelector((state) => state.ui.isNavOpen);
  const dispatch = useDispatch();
  const isInitial = useRef(true);
  const isOverlayActive = useSelector((state) => state.ui.isOverlayActive);
  const isTogglerEnabled = useSelector((state) => state.ui.isTogglerEnabled);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (isNavOpen) {
      hideBodyScroll();
    } else {
      showBodyScroll();
    }

    if (isOverlayActive) {
      hideBodyScroll();
    } else {
      showBodyScroll();
    }
  }, [isNavOpen, isOverlayActive]);

  const handleToggler = () => {
    dispatch(toggleNav());
    dispatch(toggleOverlay());
  };

  const handleNavLink = (e) => {
    if (router.pathname === e.target.getAttribute('href')) {
      dispatch(closeNav());
      dispatch(hideOverlay());
    }
  };

  let togglerClasses = 'navbar-toggler mr-15';

  if (isNavOpen) togglerClasses += ' navbar-toggler--active';
  if (!isTogglerEnabled) togglerClasses += ' navbar-toggler--hide';

  return (
    <header className="header">
      <div className="container flex justify-end">
        <button className={togglerClasses} onClick={handleToggler}>
          <span className="navbar-toggler__icon"></span>
        </button>

        <nav className={`navbar${isNavOpen ? ' navbar--open' : ''} center`}>
          <ul className="text-center">
            <li>
              <Link href="/">
                <a className="navbar__link text-bold" onClick={handleNavLink}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                <a className="navbar__link text-bold" onClick={handleNavLink}>
                  Portfolio
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className="navbar__link text-bold" onClick={handleNavLink}>
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
