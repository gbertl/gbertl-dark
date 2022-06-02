import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import Thumbnails from './Thumbnails';
import { Project } from '../../store/slices/portfolio';
import { gql, useLazyQuery } from '@apollo/client';

interface Props {
  currProjectIndex: number;
  setCurrProjectIndex: Dispatch<SetStateAction<number>>;
  projects: Project[];
  filterTitle: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({
  currProjectIndex,
  setCurrProjectIndex,
  projects,
  filterTitle,
  setIsModalOpen,
}: Props) => {
  const GET_PROJECT = gql`
    query {
      project(id: ${projects[currProjectIndex].id}) {
        title
        livePreview
        sourceCode
        description
        technologyList
        screenshotList
      }
    }
  `;

  const [getProject, { loading, data }] = useLazyQuery(GET_PROJECT);
  const [currProject, setCurrProject] = useState<Project | null>(null);
  const [prevWork, setPrevWork] = useState<Project | null>(null);
  const [nextWork, setNextWork] = useState<Project | null>(null);
  const [direction, setDirection] = useState('');

  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(0);
  const [willTransition, setWillTransition] = useState(false);

  const [isModalTransition, setIsModalTransition] = useState(false);

  const didMount = useRef(false);

  const [covering, setCovering] = useState(false);
  const [counterText, setCounterText] = useState(
    `${currProjectIndex + 1} of ${projects.length}`
  );

  const updateModal = () => {
    getProject();
    currProjectIndex !== 0
      ? setPrevWork(projects[currProjectIndex - 1])
      : setPrevWork(null);

    currProjectIndex !== projects.length - 1
      ? setNextWork(projects[currProjectIndex + 1])
      : setNextWork(null);

    setCounter(0);
    setSize(0);
  };

  useEffect(() => {
    updateModal();

    setIsModalTransition(true);
  }, []);

  useEffect(() => {
    if (!covering)
      setCounterText(`${currProjectIndex + 1} of ${projects.length}`);
  }, [covering]);

  useEffect(() => {
    if (data?.project && !covering) setCurrProject(data.project);
  }, [data, covering]);

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

  const handleNextPrev = (direction: 'prev' | 'next') => {
    setCovering(true);
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
      if (!modalOverlayRef.current) return;

      updateModal();
      setCovering(false);
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
        if (!(e.target as Element).closest('.modal__content')) {
          setIsModalTransition(false);
        }
      }}
    >
      <div
        className={`modal__transition${
          direction ? ` modal__transition--${direction}` : ''
        }`}
      ></div>
      <div className="modal__overlay" ref={modalOverlayRef}>
        <div className="modal__content">
          <div className="modal__header">
            <div className="modal__counter-wrapper flex align-center flex-wrap">
              <h2 className="modal__counter">{counterText}</h2>
              <p className="modal__filter-title">( {filterTitle} )</p>
            </div>

            <button
              className="modal__close close-btn"
              onClick={() => setIsModalTransition(false)}
            ></button>

            {currProject?.screenshotList && (
              <Thumbnails
                screenshotList={currProject?.screenshotList}
                size={size}
                setSize={setSize}
                counter={counter}
                setCounter={setCounter}
                willTransition={willTransition}
                setWillTransition={setWillTransition}
              />
            )}

            <h1 className="modal__heading">
              {currProject?.title}

              {currProject?.livePreview || currProject?.sourceCode ? (
                <div className="modal__btns-wrapper">
                  {currProject?.livePreview && (
                    <a
                      rel="noreferrer"
                      href={currProject?.livePreview}
                      target="_blank"
                    >
                      <i className="fa-solid fa-link"></i>
                    </a>
                  )}
                  {currProject?.sourceCode && (
                    <a
                      rel="noreferrer"
                      href={currProject?.sourceCode}
                      target="_blank"
                    >
                      <i className="fa-brands fa-github"></i>
                    </a>
                  )}
                </div>
              ) : (
                ''
              )}
            </h1>
          </div>
          <p
            className="portfolio-item__desc"
            dangerouslySetInnerHTML={{
              __html: currProject ? currProject.description : '',
            }}
          ></p>

          <div className="modal__item">
            <div className="modal__techs-wrapper">
              {currProject?.technologyList.map((technology, idx) => (
                <span className="modal__tech" key={idx}>
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="modal__footer flex justify-between">
            <div className={`modal__prev-work ${!prevWork ? 'invisible' : ''}`}>
              <button
                className="btn btn--primary modal__prev-work-btn"
                onClick={() => handleNextPrev('prev')}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <h2 className="mt-30 mb-15 modal__prev-work-title">
                {prevWork?.title}
              </h2>
              <img
                src={prevWork?.thumbnail}
                alt=""
                className="modal__small-img"
              />
            </div>
            <div
              className={`modal__next-work flex ${
                !nextWork ? 'invisible' : ''
              }`}
            >
              <button
                className="btn btn--primary modal__next-work-btn"
                onClick={() => handleNextPrev('next')}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
              <h2 className="mt-30 mb-15 modal__next-work-title">
                {nextWork?.title}
              </h2>
              <img
                src={nextWork?.thumbnail}
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
