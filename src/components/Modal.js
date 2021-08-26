import { useEffect, useRef, useState } from "react";
import { carousel } from "../utils";

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
  const [direction, setDirection] = useState("");

  const modalOverlayRef = useRef();
  const imagesRef = useRef([]);

  const [isNextActive, setIsNextActive] = useState(false);
  const [isPrevActive, setIsPrevActive] = useState(false);

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
      document.body.classList.remove("overflow-y-hidden");

      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } else {
      document.body.classList.add("overflow-y-hidden");

      didMount.current = true;
    }
  }, [isModalTransition]);

  const handleNextPrev = (direction) => {
    setWillTransition(false);
    setDirection(direction);

    if (direction === "next") {
      setCurrProjectIndex(currProjectIndex + 1);
    } else if (direction === "prev") {
      setCurrProjectIndex(currProjectIndex - 1);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setDirection("");
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

  const timer = useRef(0);

  const slideNext = () => {
    setIsNextActive(true);
    setWillTransition(true);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setIsNextActive(false);
    }, 1200);

    setCounter((prevCounter) => {
      return prevCounter === currProject.screenshots.length - 1
        ? 0
        : prevCounter + 1;
    });
  };

  const intervalTimer = useRef(0);

  const resetTimer = () => {
    clearInterval(intervalTimer.current);

    if (currProject.screenshots.length > 1) {
      intervalTimer.current = setInterval(slideNext, 5000);
    }
  };

  const handleNextSlide = () => {
    resetTimer();
    slideNext();
  };

  useEffect(() => {
    resetTimer(); // starts interval change of project
  }, [currProject]);

  const handlePrevSlide = () => {
    resetTimer();
    setIsPrevActive(true);
    setWillTransition(true);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setIsPrevActive(false);
    }, 1200);

    setCounter((prevCounter) => {
      return prevCounter === 0
        ? currProject.screenshots.length - 1
        : prevCounter - 1;
    });
  };

  // clear all timers and intervals on close
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      clearInterval(intervalTimer.current);
    };
  }, []);

  const handleDotIndicator = (index) => {
    resetTimer();
    setCounter(index);
    setWillTransition(true);
  };

  useEffect(() => {
    setSize(imagesRef.current[counter].clientWidth);
  }, [counter]);

  return (
    <div
      className={`modal${isModalTransition ? " modal--open" : ""}`}
      onClick={(e) => {
        if (!e.target.closest(".modal__content")) {
          setIsModalTransition(false);
        }
      }}
    >
      <div
        className={`modal__transition${
          direction ? ` modal__transition--${direction}` : ""
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

            <div className="modal__thumbnails-wrapper">
              <div
                className={`modal__thumbnails flex${
                  willTransition ? " modal__thumbnails--transition" : ""
                }`}
                style={{ transform: `translateX(${-size * counter}px)` }}
              >
                {currProject.screenshots.map((s, index) => (
                  <img
                    src={s}
                    alt="thumbnail"
                    key={s}
                    ref={(el) => (imagesRef.current[index] = el)}
                  />
                ))}
              </div>
              <div
                className={`flex justify-between modal__carousel-btn-wrapper${
                  currProject.screenshots.length === 1 ? " hidden" : ""
                }`}
              >
                <button
                  className="modal__carousel-prev-btn"
                  onClick={handlePrevSlide}
                >
                  <span
                    className={`chevron-left${
                      isPrevActive ? " chevron-left--active" : ""
                    }`}
                  ></span>
                </button>
                <button
                  className="modal__carousel-next-btn"
                  onClick={handleNextSlide}
                >
                  <span
                    className={`chevron-right${
                      isNextActive ? " chevron-right--active" : ""
                    }`}
                  ></span>
                </button>
              </div>
            </div>

            <ul
              className={`dot-indicators flex justify-center${
                currProject.screenshots.length === 1 ? " hidden" : ""
              }`}
            >
              {currProject.screenshots.map((s, index) => (
                <li>
                  <button
                    className={`dot-indicators__item${
                      counter === index ? " dot-indicators__item--active" : ""
                    }`}
                    onClick={() => handleDotIndicator(index)}
                  ></button>
                </li>
              ))}
            </ul>

            <h1 className="modal__heading">{currProject.title}</h1>
          </div>
          <div className="modal__body">
            <p
              className="portfolio-item__desc"
              dangerouslySetInnerHTML={{ __html: currProject.description }}
            ></p>
            <ul>
              <li className="mb-10">
                <span className="text-bold mr-5">Created -</span>{" "}
                {currProject.created}
              </li>
              <li className="mb-10">
                <span className="text-bold mr-5">Technologies Used -</span>
                {currProject.technologies.join(", ")}
              </li>
              <li className="mb-10">
                <span className="text-bold mr-5">Role -</span>
                {currProject.roles.join(", ")}
              </li>
              {currProject.live_preview && (
                <li className="mb-10">
                  <span className="text-bold mr-5">Live Preview -</span>
                  <a
                    href={currProject.live_preview}
                    target="_blank"
                    className="text-primary"
                  >
                    {currProject.live_preview}
                  </a>
                </li>
              )}
              {currProject.source_code && (
                <li className="mb-10">
                  <span className="text-bold mr-5">Source Code -</span>
                  <a
                    href={currProject.source_code}
                    target="_blank"
                    className="text-primary"
                  >
                    {currProject.source_code}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="modal__footer flex justify-between">
            <div
              className={`modal__prev-work ${
                !Object.keys(prevWork).length ? "invisible" : ""
              }`}
            >
              <button
                className="btn btn-primary modal__prev-work-btn"
                onClick={() => handleNextPrev("prev")}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <h2 className="mt-30 mb-15 modal__prev-work-title">
                {prevWork.title}
              </h2>
              <img
                src={prevWork.thumbnail}
                alt=""
                className="modal__small-img"
              />
            </div>
            <div
              className={`modal__next-work flex ${
                !Object.keys(nextWork).length ? "invisible" : ""
              }`}
            >
              <button
                className="btn btn-primary modal__next-work-btn"
                onClick={() => handleNextPrev("next")}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
              <h2 className="mt-30 mb-15 modal__next-work-title">
                {nextWork.title}
              </h2>
              <img
                src={nextWork.thumbnail}
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
