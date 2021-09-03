import { TOGGLE_ISNAV, CLOSE_ISNAV } from '../constants/actionTypes';

const reducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ISNAV:
      return !state;
    case CLOSE_ISNAV:
      return false;
    default:
      return state;
  }
};

export default reducer;
