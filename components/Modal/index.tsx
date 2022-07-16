import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import Thumbnails from './Thumbnails';
import useMounted from '../../hooks/useMounted';
import * as api from '../../api';
import { Project } from '../../typings';

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
  const { data } = useQuery(
    ['project', projects[currProjectIndex]._id],
    async () =>
      (
        await api.getProject(projects[currProjectIndex]._id, [
          'technologies',
          'screenshots',
        ])
      ).data,
    { enabled: !!projects[currProjectIndex]._id }
  );

  const [currProject, setCurrProject] = useState<Project | null>(null);
  const [prevWork, setPrevWork] = useState<Project | null>(null);
  const [nextWork, setNextWork] = useState<Project | null>(null);
  const [direction, setDirection] = useState('');

  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(0);
  const [willTransition, setWillTransition] = useState(false);

  const [isModalTransition, setIsModalTransition] = useState(false);

  const mounted = useMounted();

  const [counterText, setCounterText] = useState('');

  const modalTransitionRef = useRef<HTMLDivElement>(null);

  const [covered, setCovered] = useState(false);

  const updateModal = () => {
    setCounterText(`${currProjectIndex + 1} of ${projects.length}`);

    currProjectIndex !== 0
      ? setPrevWork(projects[currProjectIndex - 1])
      : setPrevWork(null);

    currProjectIndex !== projects.length - 1
      ? setNextWork(projects[currProjectIndex + 1])
      : setNextWork(null);

    setCounter(0);
    setSize(0);
  };

  const handleNextPrev = (direction: 'prev' | 'next') => {
    setWillTransition(false);
    setDirection(direction);

    direction === 'next'
      ? setCurrProjectIndex(currProjectIndex + 1)
      : direction === 'prev'
      ? setCurrProjectIndex(currProjectIndex - 1)
      : null;
  };

  useEffect(() => {
    updateModal();
    setIsModalTransition(true);
  }, []);

  useEffect(() => {
    if (data) {
      if (direction && !covered) return;

      setCurrProject(data);

      if (direction)
        modalTransitionRef.current?.style.setProperty(
          '--tr-origin',
          `${direction === 'next' ? 'right' : 'left'}`
        );

      setDirection('');
      setCovered(false);
    }
  }, [data, covered, direction]);

  useEffect(() => {
    if (!mounted) return;

    if (!isModalTransition) {
      document.body.classList.remove('overflow-y-hidden');
      setTimeout(() => setIsModalOpen(false), 1000);
    } else {
      document.body.classList.add('overflow-y-hidden');
    }
  }, [isModalTransition]);

  useEffect(() => {
    if (!mounted) return;

    const time = setTimeout(() => {
      updateModal();

      if (!modalOverlayRef.current) return;
      modalOverlayRef.current.scrollTop = 0;
    }, 500);

    return () => clearTimeout(time);
  }, [currProjectIndex]);

  useEffect(() => {
    if (!direction) return;
    let timeout = setTimeout(() => setCovered(true), 500);
    return () => clearTimeout(timeout);
  }, [direction]);

  const modalTransitionClasses = direction
    ? `modal__transition--${direction}`
    : '';

  const modalClasses = isModalTransition ? 'modal--open' : '';

  return (
    <div
      className={`modal ${modalClasses}`}
      onClick={(e) => {
        if (!(e.target as Element).closest('.modal__content')) {
          setIsModalTransition(false);
        }
      }}
    >
      <div
        className={`modal__transition ${modalTransitionClasses}`}
        ref={modalTransitionRef}
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

            {currProject?.screenshots && (
              <Thumbnails
                screenshots={currProject?.screenshots}
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
              {currProject?.technologies.map((technology) => (
                <span className="modal__tech" key={technology._id}>
                  {technology.name}
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
                src={prevWork?.screenshots[0].image}
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
                src={nextWork?.screenshots[0].image}
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
