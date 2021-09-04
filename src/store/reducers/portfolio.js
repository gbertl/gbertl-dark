import { FETCH_PROJECTS, FETCH_CATEGORIES } from '../constants/actionTypes';

const initialState = { projects: [], categories: [] };

const reducer = (state = initialState, action) => {
  if (action.type === FETCH_PROJECTS) {
    return {
      ...state,
      projects: action.payload,
    };
  }

  if (action.type === FETCH_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }

  return state;
};

export default reducer;
