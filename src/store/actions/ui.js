import {
  SHOW_LOADER,
  HIDE_LOADER,
  TOGGLE_ISNAV,
  CLOSE_ISNAV,
} from '../constants/actionTypes';

export const toggleIsNav = () => {
  return { type: TOGGLE_ISNAV };
};

export const closeIsNav = () => {
  return { type: CLOSE_ISNAV };
};

export const showLoader = () => {
  return { type: SHOW_LOADER };
};

export const hideLoader = () => {
  return { type: HIDE_LOADER };
};
