import { useEffect } from 'react';
import { toggleBodyScroll } from '../../utils';

const Loader = ({ isLoading }) => {
  useEffect(() => {
    let timeout;

    if (isLoading) {
      toggleBodyScroll();
      document.querySelector('.loader').classList.remove('loader--hide');
    } else {
      timeout = setTimeout(() => {
        toggleBodyScroll();
        document.querySelector('.loader').classList.add('loader--hide');
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  return (
    <div className="loader center">
      <div className="loader__body flex align-center">
        <div className="loader__icon"></div>
        <p>Loading</p>
      </div>
    </div>
  );
};

export default Loader;
