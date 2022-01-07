import { HYDRATE } from 'next-redux-wrapper';
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

const initialState = {
  isTogglerEnabled: true,
  isNavOpen: false,
  isOverlayActive: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      let nextState = {
        ...state,
        ...action.payload.ui,
      };

      for (const [key, value] of Object.entries(state)) {
        if (initialState[key] !== value) nextState[key] = value;
      }

      return nextState;
    }
    case SHOW_TOGGLER:
      return { ...state, isTogglerEnabled: true };
    case HIDE_TOGGLER:
      return { ...state, isTogglerEnabled: false };
    case TOGGLE_NAV:
      return { ...state, isNavOpen: !state.isNavOpen };
    case CLOSE_NAV:
      return { ...state, isNavOpen: false };
    case TOGGLE_OVERLAY:
      return { ...state, isOverlayActive: !state.isOverlayActive };
    case SHOW_OVERLAY:
      return { ...state, isOverlayActive: true };
    case HIDE_OVERLAY:
      return { ...state, isOverlayActive: false };
    case SHOW_LOADER:
      return { ...state, isLoading: true };
    case HIDE_LOADER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
