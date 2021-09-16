import {
  TOGGLE_NAV,
  CLOSE_NAV,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  TOGGLE_OVERLAY,
} from '../constants/actionTypes';

const reducer = (
  state = { isNavOpen: false, isLoading: true, isOverlayActive: false },
  action
) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return { ...state, isNavOpen: !state.isNavOpen };
    case CLOSE_NAV:
      return { ...state, isNavOpen: false };
    case SHOW_LOADER:
      return { ...state, isLoading: true };
    case HIDE_LOADER:
      return { ...state, isLoading: false };
    case TOGGLE_OVERLAY:
      return { ...state, isOverlayActive: !state.isOverlayActive };
    case SHOW_OVERLAY:
      return { ...state, isOverlayActive: true };
    case HIDE_OVERLAY:
      return { ...state, isOverlayActive: false };
    default:
      return state;
  }
};

export default reducer;
