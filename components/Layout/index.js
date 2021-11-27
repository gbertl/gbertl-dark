import Header from '../Header';
import useLayout from './hooks/useLayout';
import Loader from './Loader';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const isOverlayActive = useSelector((state) => state.ui.isOverlayActive);

  useLayout();

  return (
    <>
      <Loader />
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
