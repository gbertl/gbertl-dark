import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  closeNav,
  hideOverlay,
  selectUI,
  showToggler,
} from '../store/slices/ui';

const useResetUI = () => {
  const dispatch = useDispatch();
  const { isTogglerEnabled, isNavOpen, isOverlayActive } =
    useSelector(selectUI);

  useEffect(() => {
    if (!isTogglerEnabled) dispatch(showToggler());
    if (isNavOpen) dispatch(closeNav());
    if (isOverlayActive) dispatch(hideOverlay());
  }, []);
};

export default useResetUI;
