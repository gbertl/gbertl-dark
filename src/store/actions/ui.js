import {
  SHOW_LOADER,
  HIDE_LOADER,
  TOGGLE_ISNAV,
  CLOSE_ISNAV,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  TOGGLE_OVERLAY,
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

export const toggleOverlay = () => {
  return { type: TOGGLE_OVERLAY };
};

export const showOverlay = () => {
  return { type: SHOW_OVERLAY };
};

export const hideOverlay = () => {
  return { type: HIDE_OVERLAY };
};
