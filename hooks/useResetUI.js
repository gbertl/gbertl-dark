import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeNav, hideOverlay, showToggler } from '../store/actions/ui';

const useResetUI = () => {
  const dispatch = useDispatch();
  const { isTogglerEnabled, isNavOpen, isOverlayActive } = useSelector(
    (state) => state.ui
  );

  useEffect(() => {
    if (!isTogglerEnabled) dispatch(showToggler());
    if (isNavOpen) dispatch(closeNav());
    if (isOverlayActive) dispatch(hideOverlay());
  }, []);
};

export default useResetUI;
