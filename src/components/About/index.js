import { useEffect } from 'react';
import {
  closeNavbar,
  hideToggler,
  showToggler,
  openOverlayEffect,
  closeOverlayEffect,
} from '../../utils';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeIsNav,
  hideLoader,
  hideOverlay,
  showOverlay,
} from '../../store/actions/ui';
import useAnalytics from '../../hooks/useAnalytics';

const About = (props) => {
  const isNavOpen = useSelector((state) => state.ui.isNavOpen);
  const isOverlayActive = useSelector((state) => state.ui.isOverlayActive);
  const dispatch = useDispatch();

  useAnalytics('About');

  useEffect(() => {
    window.addEventListener('load', () => {
      dispatch(hideLoader());
    });

    showToggler();

    if (isNavOpen) {
      closeNavbar();
      dispatch(closeIsNav());
    }

    if (isOverlayActive) {
      closeOverlayEffect();
      dispatch(hideOverlay());
    }
  }, []);

  const handleAboutLink = (path) => {
    hideToggler();

    openOverlayEffect();
    dispatch(showOverlay());

    setTimeout(() => {
      props.history.push(path);
    }, 950);
  };

  return (
    <section className="about" id="about">
      <div className="container about__container">
        <div className="px-15 about__details">
          <img
            src="https://avatars.githubusercontent.com/u/25029583?v=4"
            alt=""
            className="about__img"
          />
          <h1 className="about__heading">Hi, my name is Gilbert.</h1>
          <p>
            I'm a <span className="text-bold">Full-Stack Web Developer</span>{' '}
            based in the Philippines. Feel free to take a look at my latest
            works on the{' '}
            <button
              className="text-bold text-primary about__link"
              onClick={() => handleAboutLink('/portfolio')}
            >
              portfolio page
            </button>
            . Want to talk about a project? You can get in touch with me{' '}
            <button
              className="text-bold text-primary about__link"
              onClick={() => handleAboutLink('/contact')}
            >
              here
            </button>
            .
          </p>

          <div className="mt-30 flex gap-15 align-center justify-center">
            <a href="https://github.com/gilbertlc" target="_blank">
              <i className="fab fa-github"></i> Github
            </a>
            <a
              href="https://www.linkedin.com/in/gilbertlcsndle"
              target="_blank"
            >
              <i className="fab fa-linkedin"></i> Linkedin
            </a>
            <a href="mailto:gilbertlctest@gmail.com" target="_blank">
              <i className="fas fa-envelope"></i> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(About);
