import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal';

// import useAnalytics from '../../hooks/useAnalytics';
import { closeNav, hideOverlay, showToggler } from '../../store/actions/ui';
import Head from 'next/head';

const Portfolio = () => {
  const dispatch = useDispatch();

  const projectsData = useSelector((state) => state.portfolio.projects);
  const categories = useSelector((state) => state.portfolio.categories);

  const [projects, setProjects] = useState(projectsData);
  const [currProjectIndex, setCurrProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState('All');

  // useAnalytics(pageTitle);

  useEffect(() => {
    dispatch(showToggler());
    dispatch(closeNav());
    dispatch(hideOverlay());
  }, []);

  const handleFilter = (category) => {
    const filteredProjects = projectsData.filter(
      (p) => category === 'all' || p.categories.includes(category)
    );
    const currCategory = categories.find((c) => c.name === category);

    setProjects(filteredProjects);
    setFilterTitle(category === 'all' ? 'All' : currCategory.title);
  };

  return (
    <>
      <Head>
        <title>Portfolio | Full-Stack Web Developer | Gilbert L.</title>
      </Head>
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
                  <Image
                    src={p.thumbnail}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="portfolio-item__img"
                  />
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
