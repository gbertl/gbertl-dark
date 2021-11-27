import { HYDRATE } from 'next-redux-wrapper';
import { REPLACE_PROJECTS, REPLACE_CATEGORIES } from '../constants/actionTypes';

const initialState = { projects: [], categories: [] };

const reducer = (state = initialState, action) => {
  if (action.type === HYDRATE) {
    let nextState = {
      ...state,
      ...action.payload.portfolio,
    };

    for (const [key, value] of Object.entries(state)) {
      if (initialState[key] !== value) nextState[key] = value;
    }

    return nextState;
  }

  if (action.type === REPLACE_PROJECTS) {
    return {
      ...state,
      projects: action.payload,
    };
  }

  if (action.type === REPLACE_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }

  return state;
};

export default reducer;
