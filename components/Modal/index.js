import { useEffect, useRef, useState } from 'react';

import Thumbnails from './Thumbnails';

const Modal = ({
  currProjectIndex,
  setCurrProjectIndex,
  projects,
  filterTitle,
  setIsModalOpen,
}) => {
  const [currProject, setCurrProject] = useState(projects[currProjectIndex]);
  const [prevWork, setPrevWork] = useState({});
  const [nextWork, setNextWork] = useState({});
  const [direction, setDirection] = useState('');

  const modalOverlayRef = useRef();

  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(0);
  const [willTransition, setWillTransition] = useState(false);

  const [isModalTransition, setIsModalTransition] = useState(false);

  const didMount = useRef(false);

  const updateModal = () => {
    setCurrProject(projects[currProjectIndex]);

    currProjectIndex !== 0
      ? setPrevWork(projects[currProjectIndex - 1])
      : setPrevWork({});

    currProjectIndex !== projects.length - 1
      ? setNextWork(projects[currProjectIndex + 1])
      : setNextWork({});

    setCounter(0);
    setSize(0);
  };

  useEffect(() => {
    updateModal();

    setIsModalTransition(true);
  }, []);

  useEffect(() => {
    if (didMount.current && !isModalTransition) {
      document.body.classList.remove('overflow-y-hidden');

      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } else {
      document.body.classList.add('overflow-y-hidden');

      didMount.current = true;
    }
  }, [isModalTransition]);

  const handleNextPrev = (direction) => {
    setWillTransition(false);
    setDirection(direction);

    if (direction === 'next') {
      setCurrProjectIndex(currProjectIndex + 1);
    } else if (direction === 'prev') {
      setCurrProjectIndex(currProjectIndex - 1);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setDirection('');
    }, 1000);

    return () => clearTimeout(time);
  }, [direction]);

  useEffect(() => {
    const time = setTimeout(() => {
      updateModal();
      modalOverlayRef.current.scrollTop = 0;
    }, 400);

    return () => {
      clearTimeout(time);
    };
  }, [currProjectIndex]);

  return (
    <div
      className={`modal${isModalTransition ? ' modal--open' : ''}`}
      onClick={(e) => {
        if (!e.target.closest('.modal__content')) {
          setIsModalTransition(false);
        }
      }}
    >
      <div
        className={`modal__transition${
          direction ? ` modal__transition--${direction}` : ''
        }`}
      ></div>
      <div className="modal__overlay px-15" ref={modalOverlayRef}>
        <div className="modal__content">
          <div className="modal__header">
            <div className="modal__counter-wrapper flex align-center flex-wrap">
              <h2 className="modal__counter">
                {currProjectIndex + 1} of {projects.length}
              </h2>
              <p className="modal__filter-title">( {filterTitle} )</p>
            </div>

            <button
              className="modal__close close-btn"
              onClick={() => setIsModalTransition(false)}
            ></button>

            <Thumbnails
              currProject={currProject}
              size={size}
              setSize={setSize}
              counter={counter}
              setCounter={setCounter}
              willTransition={willTransition}
              setWillTransition={setWillTransition}
            />

            <h1 className="modal__heading">{currProject.title}</h1>

            {currProject.live_preview || currProject.source_code ? (
              <div className="modal__btns-wrapper">
                {currProject.live_preview && (
                  <a
                    rel="noreferrer"
                    href={currProject.live_preview}
                    target="_blank"
                    className="outline-button"
                  >
                    <i className="fa-solid fa-globe"></i> Demo
                  </a>
                )}
                {currProject.source_code && (
                  <a
                    rel="noreferrer"
                    href={currProject.source_code}
                    target="_blank"
                    className="outline-button"
                  >
                    <i className="fa-brands fa-github"></i> Github
                  </a>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="modal__body">
            <p
              className="portfolio-item__desc"
              dangerouslySetInnerHTML={{ __html: currProject.description }}
            ></p>

            <div className="modal__item">
              <div className="modal__techs-wrapper">
                {currProject.technologies.map((technology, idx) => (
                  <span className="modal__tech" key={idx}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal__footer flex justify-between">
            <div
              className={`modal__prev-work ${
                !Object.keys(prevWork).length ? 'invisible' : ''
              }`}
            >
              <button
                className="btn btn-primary modal__prev-work-btn"
                onClick={() => handleNextPrev('prev')}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <h2 className="mt-30 mb-15 modal__prev-work-title">
                {prevWork.title}
              </h2>
              <img
                src={prevWork.screenshots?.[0]}
                alt=""
                className="modal__small-img"
              />
            </div>
            <div
              className={`modal__next-work flex ${
                !Object.keys(nextWork).length ? 'invisible' : ''
              }`}
            >
              <button
                className="btn btn-primary modal__next-work-btn"
                onClick={() => handleNextPrev('next')}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
              <h2 className="mt-30 mb-15 modal__next-work-title">
                {nextWork.title}
              </h2>
              <img
                src={nextWork.screenshots?.[0]}
                alt=""
                className="modal__small-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
