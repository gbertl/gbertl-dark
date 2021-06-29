import {useEffect} from "react";
import img from "../assets/img";
import data from "../data/items";

const Portfolio = () => {
  useEffect(() => {
    const toggleBodyScroll = () => {
      document.body.classList.toggle("overflow-y-hidden");
    };

    const filter = document.querySelector(".filter");
    const filterBtns = filter.querySelectorAll(".filter__button");

    filterBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (!e.target.classList.contains("filter__button--active")) {
          toggleBodyScroll();

          const filterStatus = document.querySelector(
            ".portfolio__filter-status"
          );

          filterStatus.classList.add("portfolio__filter-status--open");
          filterStatus.querySelector(
            "p"
          ).innerHTML = `Filtering <span class='text-bold'>${e.target.innerHTML}</span> Works`;

          filter
            .querySelector(".filter__button--active")
            .classList.remove("filter__button--active");
          e.target.classList.add("filter__button--active");

          setTimeout(() => {
            filterItems(e.target);
            filterStatus.classList.remove("portfolio__filter-status--open");
            toggleBodyScroll();
          }, 800);
        }
      });
    });

    let portfolioItems;

    const filterItems = (filterBtn) => {
      const selectedCategory = filterBtn.getAttribute("data-filter");
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(",");

        if (
          category.indexOf(selectedCategory) !== -1 ||
          selectedCategory === "all"
        ) {
          item.classList.add("portfolio-item--show");
        } else {
          item.classList.remove("portfolio-item--show");
        }
      });

      portfolioItems = document.querySelectorAll(".portfolio-item--show");
    };

    filterItems(document.querySelector(".filter__button--active"));
  }, []);

  return (
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
              title="Filter by HTML/CSS"
              data-filter="html-css"
              className="filter__button"
            >
              HTML/CSS
            </button>
          </li>
          <li>
            <button
              title="Filter by Full-Stack"
              data-filter="full-stack"
              className="filter__button"
            >
              Full-Stack
            </button>
          </li>
        </ul>

        <div className="portfolio__filter-status center">
          <p></p>
        </div>

        <div className="portfolio-item-wrapper">
          {data.map((d) => (
            <div data-category="html-css" className="portfolio-item">
              <div className="portfolio-item__thumbnail">
                <img src={d.thumbnail} alt="" className="portfolio-item__img" />
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
                <p className="portfolio-item__desc">{d.description}</p>
                <ul>
                  <li className="mb-10">
                    <span className="text-bold mr-5">Created -</span>{" "}
                    {d.created}
                  </li>
                  <li className="mb-10">
                    <span className="text-bold mr-5">Technologies Used -</span>
                    {d.technologies.join(", ")}
                  </li>
                  <li className="mb-10">
                    <span className="text-bold mr-5">Role -</span>
                    {d.role.join(", ")}
                  </li>
                  {d.url && (
                    <li className="mb-10">
                      <span className="text-bold mr-5">Url -</span>
                      <a href={d.url} target="_blank" className="text-primary">
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
  );
};

export default Portfolio;
