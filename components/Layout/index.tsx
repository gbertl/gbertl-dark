import useAppSelector from '../../hooks/useAppSelector';

import Header from '../Header';
import useLayout from './useLayout';
import Loader from '../Loader';
import { selectIsLoading, selectIsOverlayActive } from '../../store/slices/ui';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const isLoading = useAppSelector(selectIsLoading);
  const isOverlayActive = useAppSelector(selectIsOverlayActive);

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
