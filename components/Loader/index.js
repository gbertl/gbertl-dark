import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideLoader } from '../../store/actions/ui';

const Loader = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [sec, setSec] = useState(10);
  const countDownRef = useRef();

  const areProjectsFetched = useSelector(
    (state) => state.portfolio.projects
  ).length;
  const dispatch = useDispatch();

  useEffect(() => {
    countDownRef.current = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          clearInterval(countDownRef.current);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countDownRef.current);
    };
  }, []);

  useEffect(() => {
    if (isLoading && areProjectsFetched) {
      clearInterval(countDownRef.current);
      dispatch(hideLoader());
    }
  }, [isLoading, areProjectsFetched]);

  return (
    <div className="loader">
      <div className="loader__container">
        <span className="loader__icon"></span>
        <h2>Waking up my API hosted on heroku&apos;s free tier.</h2>
        <p>
          Please allow up to {sec} second{sec > 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
};

export default Loader;
