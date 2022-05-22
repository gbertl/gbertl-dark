import { useSelector } from 'react-redux';

import Header from '../Header';
import useLayout from './hooks/useLayout';
import Loader from '../Loader';
import { selectIsLoading, selectIsOverlayActive } from '../../store/slices/ui';

const Layout = (props) => {
  const isLoading = useSelector(selectIsLoading);
  const isOverlayActive = useSelector(selectIsOverlayActive);

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
