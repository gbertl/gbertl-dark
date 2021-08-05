import img from "../assets/img";
import data from "../data/items";
import usePortfolio from "./usePortfolio";
import Modal from "./Modal";
import { useState, useEffect, useRef } from "react";
import { closeNavbar, showToggler } from "./helper";
import { closeOverlayEffect } from "./overlayEffect";
import useDocumentTitle from "../useDocumentTitle";
import { useDispatch, useSelector } from "react-redux";
import { closeIsNav } from "../state/actions";

const Portfolio = (props) => {
  const [imgLen, setImgLen] = useState(null);
  const [counter, setCounter] = useState(0);
  const refCounter = useRef(0);
  const isNavOpen = useSelector((state) => state.isNavOpen);
  const dispatch = useDispatch();

  useDocumentTitle("Portfolio");
  usePortfolio(props);

  useEffect(() => {
    showToggler();

    if (isNavOpen) {
      closeNavbar();
      dispatch(closeIsNav());
    }

    if (props.isOverlayActive) {
      closeOverlayEffect();
      props.setIsOverlayActive(false);
    }

    setImgLen(document.querySelectorAll(".portfolio-item__screenshots").length);
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (imgLen !== refCounter.current) {
        props.setIsLoading(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [imgLen]);

  useEffect(() => {
    refCounter.current = counter;

    if (imgLen === refCounter.current) {
      props.setIsLoading(false);
    }
  }, [counter]);

  return (
    <>
      <section className="portfolio" id="portfolio">
        <div className="container portfolio__container">
          <h2 className="section-heading">Recent Works</h2>

          <ul className="flex justify-center filter flex-wrap">
            <li>
              <button
                data-filter="all"
                className="filter__button filter__button--active"
              >
                All
              </button>
            </li>
            <li>
              <button data-filter="react" className="filter__button">
                React
              </button>
            </li>
            <li>
              <button data-filter="html-css" className="filter__button">
                HTML/CSS
              </button>
            </li>
            <li>
              <button data-filter="bootstrap" className="filter__button">
                Bootstrap
              </button>
            </li>
            <li>
              <button data-filter="full-stack" className="filter__button">
                Full-Stack
              </button>
            </li>
          </ul>

          <div className="portfolio__filter-status center">
            <p></p>
          </div>

          <div className="portfolio-item-wrapper">
            {data.map((d) => (
              <div
                data-category={d.categories.join()}
                className="portfolio-item"
                key={d.id}
              >
                <div className="portfolio-item__thumbnail">
                  <img
                    src={d.thumbnail}
                    alt=""
                    className="portfolio-item__img"
                  />
                  <div className="hidden portfolio-item__screenshots">
                    {d.screenshots.map((sc) => (
                      <img
                        src={sc}
                        alt=""
                        key={sc}
                        onLoad={() => {
                          if (d.screenshots[0] === sc) {
                            setCounter(counter + 1);
                          }
                        }}
                      />
                    ))}
                  </div>
                  <div className="portfolio-item__btn center">
                    <button className="btn btn-primary">More Info</button>
                  </div>
                </div>
                <h3 className="portfolio-item__heading">{d.title}</h3>
                <div className="portfolio-item__details hidden">
                  <p
                    className="portfolio-item__desc"
                    dangerouslySetInnerHTML={{ __html: d.description }}
                  ></p>
                  <ul>
                    <li className="mb-10">
                      <span className="text-bold mr-5">Created -</span>{" "}
                      {d.created}
                    </li>
                    <li className="mb-10">
                      <span className="text-bold mr-5">
                        Technologies Used -
                      </span>
                      {d.technologies.join(", ")}
                    </li>
                    <li className="mb-10">
                      <span className="text-bold mr-5">Role -</span>
                      {d.role.join(", ")}
                    </li>
                    {d.livePreview && (
                      <li className="mb-10">
                        <span className="text-bold mr-5">Live Preview -</span>
                        <a
                          href={d.livePreview}
                          target="_blank"
                          className="text-primary"
                        >
                          {d.livePreview}
                        </a>
                      </li>
                    )}
                    {d.sourceCode && (
                      <li className="mb-10">
                        <span className="text-bold mr-5">Source Code -</span>
                        <a
                          href={d.sourceCode}
                          target="_blank"
                          className="text-primary"
                        >
                          {d.sourceCode}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal />
    </>
  );
};

export default Portfolio;
