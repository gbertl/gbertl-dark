import img from "../assets/img";
import data from "../data/items";
import usePortfolio from "./usePortfolio";
import Modal from "./Modal";

const Portfolio = () => {
  usePortfolio();

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
                class="filter__button"
              >
                Front-End
              </button>
            </li>
            <li>
              <button
                title="Filter by Back-End"
                data-filter="back-end"
                class="filter__button"
              >
                Back-End
              </button>
            </li>
            <li>
              <button
                title="Filter by Personal"
                data-filter="personal"
                class="filter__button"
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
              >
                <div className="portfolio-item__thumbnail">
                  <img
                    src={d.thumbnail}
                    alt=""
                    className="portfolio-item__img"
                  />
                  <div className="hidden portfolio-item__screenshots">
                    {d.screenshots.map((sc) => (
                      <img src={sc} alt="" />
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
