import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideLoader, selectIsLoading } from '../store/slices/ui';
import { selectProjects } from '../store/slices/portfolio';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  const [sec, setSec] = useState(8);
  const countDownRef = useRef(0);

  const areProjectsFetched = useSelector(selectProjects).length;
  const dispatch = useDispatch();

  useEffect(() => {
    countDownRef.current = window.setInterval(() => {
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
        <span className="spinner"></span>
        <h2>Waking up my API from Heroku&apos;s free tier.</h2>
        <p>
          Please allow up to {sec} second{sec > 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
};

export default Loader;
