import img from "../assets/img";
import data from "../data/items";
import usePortfolio from "./usePortfolio";
import Modal from "./Modal";
import {useState, useEffect} from "react";
import {closeNavbar, showToggler} from "./helper";
import {closeOverlayEffect} from "./overlayEffect";

const Portfolio = (props) => {
  const [imgLen, setImgLen] = useState(null);
  const [counter, setCounter] = useState(0);

  usePortfolio(props);

  useEffect(() => {
    setImgLen(
      document.querySelectorAll(".portfolio-item__img").length +
        document.querySelectorAll(".portfolio-item__screenshots img").length
    );
  }, []);

  useEffect(() => {
    if (imgLen === counter) {
      showToggler();

      if (props.isNavOpen) {
        closeNavbar();
        props.setIsNavOpen(false);
      }

      if (props.isOverlayActive) {
        closeOverlayEffect();
        props.setIsOverlayActive(false);
      }
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
                title="Filter by Back-End"
                data-filter="back-end"
                className="filter__button"
              >
                Back-End
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
                    onLoad={() => setCounter(counter + 1)}
                  />
                  <div className="hidden portfolio-item__screenshots">
                    {d.screenshots.map((sc) => (
                      <img
                        src={sc}
                        alt=""
                        key={sc}
                        onLoad={() => setCounter(counter + 1)}
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
