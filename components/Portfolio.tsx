import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import Modal from './Modal';
import useResetUI from '../hooks/useResetUI';
import { selectCategories, selectProjects } from '../store/slices/portfolio';

const Portfolio = () => {
  const projectsData = useSelector(selectProjects);
  const categories = useSelector(selectCategories);

  const [projects, setProjects] = useState(projectsData);
  const [currProjectIndex, setCurrProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState('All');

  useResetUI();

  const handleFilter = (category: string) => {
    const filteredProjects = projectsData.filter(
      (p) => category === 'all' || p.categoryList.includes(category)
    );
    const currCategory = categories.find((c) => c.name === category);

    setProjects(filteredProjects);
    setFilterTitle(category === 'all' ? 'All' : currCategory!.title);
  };

  return (
    <>
      <Head>
        <title>Portfolio | React Front-end Dev & HTML-Dev | Gilbert L.</title>
      </Head>
      <section className="portfolio" id="portfolio">
        <div className="container portfolio__container">
          <h2 className="section-heading">Recent Works</h2>

          <ul className="flex justify-center filter flex-wrap">
            <li>
              <button
                onClick={() => handleFilter('all')}
                className={`btn btn--secondary${
                  filterTitle === 'All' ? ' btn btn--secondary--active' : ''
                }`}
                title="Show All"
              >
                All
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.name}>
                <button
                  onClick={() => handleFilter(c.name)}
                  className={`btn btn--secondary${
                    filterTitle === c.title ? ' btn btn--secondary--active' : ''
                  }`}
                  title={`Filter By ${c.title}`}
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
                data-category={p.categoryList.join()}
                className="portfolio-item"
                key={index}
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
                    <button className="btn btn--primary">More Info</button>
                  </div>
                </div>
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
