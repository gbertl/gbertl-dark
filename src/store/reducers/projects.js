import { FETCH_PROJECTS } from '../constants/actionTypes';

const reducer = (state = [], action) => {
  if (action.type === FETCH_PROJECTS) {
    return action.payload;
  }

  return state;
};

export default reducer;
