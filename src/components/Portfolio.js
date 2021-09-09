import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal';
import { closeNavbar, showToggler } from './helper';
import { closeOverlayEffect } from './overlayEffect';
import useDocumentTitle from '../useDocumentTitle';
import { closeIsNav } from '../store/actions';

import { fetchCategories, fetchProjects } from '../store/actions/portfolio';
import useAnalytics from './useAnalytics';

const Portfolio = (props) => {
  const imgLen = useRef(0);
  const counterRef = useRef(0);
  const dispatch = useDispatch();

  const isNavOpen = useSelector((state) => state.ui.isNavOpen);
  const data = useSelector((state) => state.portfolio.projects);
  const categories = useSelector((state) => state.portfolio.categories);

  const [counter, setCounter] = useState(0);
  const [projects, setProjects] = useState([]);
  const [currProjectIndex, setCurrProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState('All');

  const pageTitle = 'Portfolio';
  useDocumentTitle(pageTitle);
  useAnalytics(pageTitle);

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

    !data.length && dispatch(fetchProjects());
    !categories.length && dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    setProjects(data); // for showing

    if (data.length) {
      data.forEach((d) => {
        !!d.screenshots[0] && imgLen.current++;
      });
    }

    // only wait for half total of first screenshots
    imgLen.current = Math.round(imgLen.current / 2);

    if (imgLen.current) {
      setTimeout(() => {
        imgLen.current > counterRef.current && props.setIsLoading(true);
      }, 3000);
    }
  }, [data]);

  useEffect(() => {
    counterRef.current = counter;

    if (imgLen.current && imgLen.current <= counter) {
      props.setIsLoading(false);
    }
  }, [counter]);

  const handleFilter = (category) => {
    const filteredProjects = data.filter(
      (p) => category === 'all' || p.categories.includes(category)
    );
    const currCategory = categories.find((c) => c.name === category);

    setProjects(filteredProjects);
    setFilterTitle(category === 'all' ? 'All' : currCategory.title);
  };

  return (
    <>
      <section className="portfolio" id="portfolio">
        <div className="container portfolio__container">
          <h2 className="section-heading">Recent Works</h2>

          <ul className="flex justify-center filter flex-wrap">
            <li>
              <button
                onClick={() => handleFilter('all')}
                className={`filter__button${
                  filterTitle === 'All' ? ' filter__button--active' : ''
                }`}
              >
                All
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.name}>
                <button
                  onClick={() => handleFilter(c.name)}
                  className={`filter__button${
                    filterTitle === c.title ? ' filter__button--active' : ''
                  }`}
                >
                  {c.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="portfolio__filter-status center">
            <p></p>
          </div>

          <div className="portfolio-item-wrapper">
            {projects.map((p, index) => (
              <div
                data-category={p.categories.join()}
                className="portfolio-item"
                key={p.id}
                onClick={() => {
                  setIsModalOpen(true);
                  setCurrProjectIndex(index);
                }}
              >
                <div className="portfolio-item__thumbnail">
                  <img
                    src={p.thumbnail}
                    alt=""
                    className="portfolio-item__img"
                  />
                  <div className="hidden portfolio-item__screenshots">
                    {p.screenshots.map((sc, i) => (
                      <img
                        src={sc}
                        alt=""
                        key={i}
                        onLoad={() => {
                          if (i === 0) {
                            setCounter((prevCounter) => prevCounter + 1);
                          }
                        }}
                      />
                    ))}
                  </div>
                  <div className="portfolio-item__btn center">
                    <button className="btn btn-primary">More Info</button>
                  </div>
                </div>
                <h3 className="portfolio-item__heading">{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal
          currProjectIndex={currProjectIndex}
          setCurrProjectIndex={setCurrProjectIndex}
          projects={projects}
          filterTitle={filterTitle}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default Portfolio;
