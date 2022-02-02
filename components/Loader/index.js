import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideLoader } from '../../store/actions/ui';

const Loader = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const areProjectsFetched = useSelector(
    (state) => state.portfolio.projects
  ).length;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && areProjectsFetched) dispatch(hideLoader());
  }, [isLoading, areProjectsFetched]);

  return (
    <div className="loader">
      <span className="loader__icon"></span>
      <p>Please wait</p>
    </div>
  );
};

export default Loader;
