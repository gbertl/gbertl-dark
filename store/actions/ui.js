import {
  TOGGLE_NAV,
  CLOSE_NAV,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  TOGGLE_OVERLAY,
  SHOW_TOGGLER,
  HIDE_TOGGLER,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../constants/actionTypes';

export const toggleNav = () => ({ type: TOGGLE_NAV });
export const closeNav = () => ({ type: CLOSE_NAV });
export const toggleOverlay = () => ({ type: TOGGLE_OVERLAY });
export const showOverlay = () => ({ type: SHOW_OVERLAY });
export const hideOverlay = () => ({ type: HIDE_OVERLAY });
export const showToggler = () => ({ type: SHOW_TOGGLER });
export const hideToggler = () => ({ type: HIDE_TOGGLER });
export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });
