import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAppSelector from '../hooks/useAppSelector';

import { hideLoader, selectIsLoading } from '../store/slices/ui';
import { selectProjects } from '../store/slices/portfolio';

const Loader = () => {
  const isLoading = useAppSelector(selectIsLoading);

  const areProjectsFetched = useAppSelector(selectProjects).length;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && areProjectsFetched) {
      dispatch(hideLoader());
    }
  }, [isLoading, areProjectsFetched]);

  return (
    <div className="loader">
      <div className="loader__container">
        <span className="spinner"></span>
        <h2>Please wait for my API to boot up.</h2>
        <p>
          I only use free web hosting for my API so it sleeps after 30 minutes
          of inactivity.
        </p>
      </div>
    </div>
  );
};

export default Loader;
