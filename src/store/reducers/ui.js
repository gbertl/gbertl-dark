import { TOGGLE_ISNAV, CLOSE_ISNAV } from '../constants/actionTypes';

const reducer = (state = { isNavOpen: false }, action) => {
  switch (action.type) {
    case TOGGLE_ISNAV:
      return { ...state, isNavOpen: !state.isNavOpen };
    case CLOSE_ISNAV:
      return { ...state, isNavOpen: false };
    default:
      return state;
  }
};

export default reducer;
