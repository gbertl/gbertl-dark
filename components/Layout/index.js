import { useSelector } from 'react-redux';

import Header from '../Header';
import useLayout from './hooks/useLayout';
import Loader from '../Loader';

const Layout = (props) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const isOverlayActive = useSelector((state) => state.ui.isOverlayActive);

  useLayout();

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-animation-effect"></div>
      <div
        className={`overlay-effect${
          isOverlayActive ? ' overlay-effect--active' : ''
        }`}
      ></div>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
