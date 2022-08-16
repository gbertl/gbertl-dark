import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { showOverlay, hideToggler, showLoader } from '../store/slices/ui';
import useResetUI from '../hooks/useResetUI';

enum Paths {
  Portfolio = '/portfolio',
  Contact = '/contact',
}

const About = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useResetUI();

  const handleAboutLink = (path: Paths) => {
    dispatch(hideToggler());

    dispatch(showOverlay());

    setTimeout(() => {
      router.push(path);
    }, 950);

    if (path === Paths.Portfolio)
      setTimeout(() => dispatch(showLoader()), 3000);
  };

  return (
    <section className="about" id="about">
      <div className="container about__container">
        <div className="px-15 about__details">
          <div className="mb-15">
            <Image
              src="https://avatars.githubusercontent.com/u/25029583?v=4"
              width={150}
              height={150}
              alt=""
              className="about__img"
            />
          </div>
          <h1 className="about__heading">Hi 👋 , my name is Gilbert.</h1>
          <p>
            A freelance front-end developer based in the Philippines. Interested
            in working together? Let's have talk. You can check out my past
            works{' '}
            <button
              className="text-link"
              onClick={() => handleAboutLink(Paths.Portfolio)}
            >
              here
            </button>{' '}
            or you can leave a message{' '}
            <button
              className="text-link"
              onClick={() => handleAboutLink(Paths.Contact)}
            >
              here
            </button>
            .
          </p>

          <div className="about__social-wrapper mt-30 flex align-center justify-center">
            <a
              rel="noreferrer"
              href="https://github.com/gbertl"
              target="_blank"
              className="btn btn--secondary"
            >
              <i className="fab fa-github"></i> Github
            </a>
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/gilbertlcsndle"
              target="_blank"
              className="btn btn--secondary"
            >
              <i className="fab fa-linkedin"></i> Linkedin
            </a>
            <a
              rel="noreferrer"
              href="mailto:gilbertlctest@gmail.com"
              target="_blank"
              className="btn btn--secondary"
            >
              <i className="fas fa-envelope"></i> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
