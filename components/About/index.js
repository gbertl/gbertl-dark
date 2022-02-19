import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';

import { showOverlay, hideToggler, showLoader } from '../../store/actions/ui';
import useResetUI from '../../hooks/useResetUI';

const About = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useResetUI();

  const handleAboutLink = (path) => {
    dispatch(hideToggler());

    dispatch(showOverlay());

    setTimeout(() => {
      router.push(path);
    }, 950);

    if (path === '/portfolio') setTimeout(() => dispatch(showLoader()), 3000);
  };

  return (
    <>
      <Head>
        <title>Full-Stack Web Developer Portfolio | Gilbert L.</title>
      </Head>
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
            <h1 className="about__heading">Hi, my name is Gilbert.</h1>
            <p>
              I&apos;m a{' '}
              <span className="text-bold">Full-Stack Web Developer</span> based
              in the Philippines. Feel free to take a look at my latest works on
              the{' '}
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

            <div className="about__social-wrapper mt-30 flex align-center justify-center">
              <a
                rel="noreferrer"
                href="https://github.com/gilbertlc"
                target="_blank"
                className="btn-secondary"
              >
                <i className="fab fa-github"></i> Github
              </a>
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/in/gilbertlcsndle"
                target="_blank"
                className="btn-secondary"
              >
                <i className="fab fa-linkedin"></i> Linkedin
              </a>
              <a
                rel="noreferrer"
                href="mailto:gilbertlctest@gmail.com"
                target="_blank"
                className="btn-secondary"
              >
                <i className="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
