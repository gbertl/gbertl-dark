import {
  TOGGLE_ISNAV,
  CLOSE_ISNAV,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../constants/actionTypes';

const reducer = (state = { isNavOpen: false, isLoading: true }, action) => {
  switch (action.type) {
    case TOGGLE_ISNAV:
      return { ...state, isNavOpen: !state.isNavOpen };
    case CLOSE_ISNAV:
      return { ...state, isNavOpen: false };
    case SHOW_LOADER:
      return { ...state, isLoading: true };
    case HIDE_LOADER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
