import img from '../assets/img';
import Modal from './Modal';
import { useState, useEffect, useRef } from 'react';
import { closeNavbar, showToggler } from './helper';
import { closeOverlayEffect } from './overlayEffect';
import useDocumentTitle from '../useDocumentTitle';
import { useDispatch, useSelector, connect } from 'react-redux';
import { closeIsNav, fetchProjects } from '../store/actions';

import * as api from '../api/index';

const Portfolio = ({ projects: data, ...props }) => {
  const imgLen = useRef(0);
  const counterRef = useRef(0);
  const isDataReady = useRef(false);
  const dispatch = useDispatch();

  const isNavOpen = useSelector((state) => state.isNavOpen);

  const [counter, setCounter] = useState(0);
  const [projects, setProjects] = useState([]);
  const [currProjectIndex, setCurrProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState('All');
  const [categories, setCategories] = useState([]);

  useDocumentTitle('Portfolio');

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

    const fetchProjects = async () => {
      isDataReady.current = false;

      let rdata;

      if (!data.length) {
        ({ data: rdata } = await api.getProjects());
      } else {
        rdata = data;
      }

      isDataReady.current = true;

      setProjects(rdata); // for showing
      props.fetchProjects(rdata);
    };

    const fetchCategories = async () => {
      isDataReady.current = false;
      const { data: rdata } = await api.getCategories();
      isDataReady.current = true;

      setCategories(rdata);
    };

    setTimeout(() => {
      !isDataReady.current && props.setIsLoading(true);
    }, 3000);

    fetchProjects();
    fetchCategories();
  }, []);

  useEffect(() => {
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

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: (payload) => dispatch(fetchProjects(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
