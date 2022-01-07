import Header from '../Header';
import useLayout from './hooks/useLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { hideLoader } from '../../store/actions/ui';

const Layout = (props) => {
  const isOverlayActive = useSelector((state) => state.ui.isOverlayActive);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const areProjectsFetched = useSelector(
    (state) => state.portfolio.projects
  ).length;
  const dispatch = useDispatch();

  useLayout();

  useEffect(() => {
    if (isLoading && areProjectsFetched) dispatch(hideLoader());
  }, [isLoading, areProjectsFetched]);

  return (
    <>
      <div className="bg-animation-effect"></div>
      <div
        className={`overlay-effect${
          isOverlayActive ? ' overlay-effect--active' : ''
        }`}
      >
        {isLoading && (
          <div className="loader">
            <span className="loader__icon"></span>
            <p>Please wait</p>
          </div>
        )}
      </div>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
