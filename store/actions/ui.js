import {
  SHOW_LOADER,
  HIDE_LOADER,
  TOGGLE_NAV,
  CLOSE_NAV,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  TOGGLE_OVERLAY,
  SHOW_TOGGLER,
  HIDE_TOGGLER,
} from '../constants/actionTypes';

export const toggleNav = () => {
  return { type: TOGGLE_NAV };
};

export const closeNav = () => {
  return { type: CLOSE_NAV };
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

export const showToggler = () => {
  return { type: SHOW_TOGGLER };
};

export const hideToggler = () => {
  return { type: HIDE_TOGGLER };
};
