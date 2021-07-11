import img from "../assets/img";
import data from "../data/items";
import usePortfolio from "./usePortfolio";
import Modal from "./Modal";
import {useState, useEffect, useRef} from "react";
import {closeNavbar, showToggler} from "./helper";
import {closeOverlayEffect} from "./overlayEffect";

const Portfolio = (props) => {
  const [imgLen, setImgLen] = useState(null);
  const [counter, setCounter] = useState(0);
  const refCounter = useRef(0);

  usePortfolio(props);

  useEffect(() => {
    showToggler();

    if (props.isNavOpen) {
      closeNavbar();
      props.setIsNavOpen(false);
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
                title="Show All Works"
                data-filter="all"
                className="filter__button filter__button--active"
              >
                All
              </button>
            </li>
            <li>
              <button
                title="Filter by Front-End"
                data-filter="front-end"
                className="filter__button"
              >
                Front-End
              </button>
            </li>
            <li>
              <button
                title="Filter by With Back-End"
                data-filter="back-end"
                className="filter__button"
              >
                With Back-End
              </button>
            </li>
            <li>
              <button
                title="Filter by Personal"
                data-filter="personal"
                className="filter__button"
              >
                Personal
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
                    dangerouslySetInnerHTML={{__html: d.description}}
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
                    {d.url && (
                      <li className="mb-10">
                        <span className="text-bold mr-5">Url -</span>
                        <a
                          href={d.url}
                          target="_blank"
                          className="text-primary"
                        >
                          {d.url}
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
