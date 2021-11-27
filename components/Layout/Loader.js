import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader } from '../../store/actions/ui';
import { toggleBodyScroll } from '../../utils';

const Loader = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchHideLoader = () => dispatch(hideLoader());

    if (document.readyState !== 'complete') {
      window.addEventListener('load', dispatchHideLoader);
    } else {
      dispatchHideLoader();
    }
  }, []);

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
