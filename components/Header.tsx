import { useRouter } from 'next/router';
import Link from 'next/link';
import { hideBodyScroll, showBodyScroll } from '../utils';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeNav,
  toggleNav,
  hideOverlay,
  toggleOverlay,
  showLoader,
  selectIsNavOpen,
  selectIsOverlayActive,
  selectIsTogglerEnabled,
  hideToggler,
} from '../store/slices/ui';
import { selectProjects } from '../store/slices/portfolio';

const Header = () => {
  const router = useRouter();
  const isNavOpen = useSelector(selectIsNavOpen);
  const dispatch = useDispatch();
  const isInitial = useRef(true);
  const isOverlayActive = useSelector(selectIsOverlayActive);
  const isTogglerEnabled = useSelector(selectIsTogglerEnabled);
  const areProjectsFetched = useSelector(selectProjects).length;
  const areProjectsFetchedRef = useRef(0);

  useEffect(() => {
    areProjectsFetchedRef.current = areProjectsFetched;
  }, [areProjectsFetched]);

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

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;

    if (target.getAttribute('href') === router.pathname) {
      dispatch(closeNav());
      dispatch(hideOverlay());
    } else if (target.getAttribute('href') === '/portfolio') {
      if (areProjectsFetchedRef.current) return;

      setTimeout(() => {
        if (areProjectsFetchedRef.current) return;
        dispatch(hideToggler());
        dispatch(closeNav());
        dispatch(showLoader());
      }, 3000);
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
