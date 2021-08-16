import { useEffect, useRef, useState } from "react";
import { carousel } from "../utils";

const Modal = ({
  currProjectIndex,
  setCurrProjectIndex,
  projects,
  filterBtnRefs,
}) => {
  const [activeFilterTitle, setActiveFilterTitle] = useState("");
  const [currProject, setCurrProject] = useState(projects[currProjectIndex]);
  const [prevWork, setPrevWork] = useState({});
  const [nextWork, setNextWork] = useState({});
  const [direction, setDirection] = useState("");
  const modalOverlayRef = useRef();

  const updateModal = () => {
    setCurrProject(projects[currProjectIndex]);

    currProjectIndex !== 0
      ? setPrevWork(projects[currProjectIndex - 1])
      : setPrevWork({});

    currProjectIndex !== projects.length - 1
      ? setNextWork(projects[currProjectIndex + 1])
      : setNextWork({});

    carousel();
  };

  useEffect(() => {
    setActiveFilterTitle(
      filterBtnRefs.current.find((el) =>
        el.classList.contains("filter__button--active")
      ).innerHTML
    );

    updateModal();
  }, []);

  const handleNextPrev = (direction) => {
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

    return () => clearTimeout(time);
  }, [currProjectIndex]);

  return (
    <div className="modal modal--open">
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
              <p className="modal__filter-title">( {activeFilterTitle} )</p>
            </div>

            <button className="modal__close close-btn"></button>

            <div className="modal__thumbnails-wrapper">
              <div className="modal__thumbnails flex">
                {currProject.screenshots.map((s) => (
                  <img src={s} alt="thumbnail" key={s} />
                ))}
              </div>
              <div className="flex justify-between modal__carousel-btn-wrapper hidden">
                <button className="modal__carousel-prev-btn">
                  <span className="chevron-left"></span>
                </button>
                <button className="modal__carousel-next-btn">
                  <span className="chevron-right"></span>
                </button>
              </div>
            </div>

            <ul className="dot-indicators flex justify-center hidden"></ul>

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
                {currProject.role.join(", ")}
              </li>
              {currProject.livePreview && (
                <li className="mb-10">
                  <span className="text-bold mr-5">Live Preview -</span>
                  <a
                    href={currProject.livePreview}
                    target="_blank"
                    className="text-primary"
                  >
                    {currProject.livePreview}
                  </a>
                </li>
              )}
              {currProject.sourceCode && (
                <li className="mb-10">
                  <span className="text-bold mr-5">Source Code -</span>
                  <a
                    href={currProject.sourceCode}
                    target="_blank"
                    className="text-primary"
                  >
                    {currProject.sourceCode}
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
